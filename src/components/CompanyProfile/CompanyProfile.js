import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfileInputs,
  getPaymentMethodInputs,
  getUploadInputs,
} from "./inputs";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Input } from "../../UI/Input/Input";
import { setCompanyDetails } from "../../store/userReducer ";
import { Button } from "../../UI/Button/Button";
import { AddSquareIcon, DeleteIcon, EditIcon } from "../../assets/svgs";
import { useUpload } from "../../hooks/useUpload";
import { Switches } from "../../UI/Switches/Switches";
import { useTranslation } from "react-i18next";

import styles from "./Profile.module.css";

const CompanyProfile = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const { uploadToIPFS } = useUpload();
  const company = useSelector((state) => state.user.company);

  const [edit, setEdit] = useState(true);
  const [formData, setFormData] = useState({
    _id: company._id,
    name: company.name,
    email: company.email,
    phone_number: company.phone_number,
    registration_id: company.registration_id,
    address: company.address,
    payment_methods: company.payment_methods || [],
    companyLogo: company.companyLogo,
    ringLogo: company.ringLogo,
    invoiceLogo: company.invoiceLogo,
    sections: {
      customers: company?.sections?.customers,
      orders: company?.sections?.orders,
      invoices: company?.sections?.invoices,
      services: company?.sections?.services,
      expenses: company?.sections?.expenses,
      statistics: company?.sections?.statistics,
    },
  });

  const [newBankDetails, setNewBankDetails] = useState({
    bank_name: "",
    account_number: "",
  });

  const handleAddPaymentMethod = () => {
    if (newBankDetails.bank_name && newBankDetails.account_number) {
      setFormData((prev) => ({
        ...prev,
        payment_methods: [...prev.payment_methods, newBankDetails],
      }));
      setNewBankDetails({ bank_name: "", account_number: "" });
    } else {
      toast.error(t("companyProfile.pleaseFillInBoth"));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData };

    if (formData.companyLogo instanceof File) {
      const companyLogoUrl = await uploadToIPFS(formData.companyLogo);
      if (companyLogoUrl) {
        updatedFormData.companyLogo = companyLogoUrl;
      } else {
        toast.error(t("companyProfile.errorUploadingLogo"));
      }
    }

    if (formData.ringLogo instanceof File) {
      const ringLogoUrl = await uploadToIPFS(formData.ringLogo);
      if (ringLogoUrl) {
        updatedFormData.ringLogo = ringLogoUrl;
      } else {
        toast.error(t("companyProfile.errorUploadingLogo"));
      }
    }

    if (formData.invoiceLogo instanceof File) {
      const invoiceLogoUrl = await uploadToIPFS(formData.invoiceLogo);
      if (invoiceLogoUrl) {
        updatedFormData.invoiceLogo = invoiceLogoUrl;
      } else {
        toast.error(t("companyProfile.errorUploadingLogo"));
      }
    }

    try {
      const response = await axios.put(
        "/company/edit-company",
        updatedFormData
      );
      dispatch(setCompanyDetails(response.data.company));
      toast.success(t("companyProfile.successSavingProfile"));
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error(t("companyProfile.errorSavingProfile"));
    }
  };

  const profileInputs = getProfileInputs(formData, setFormData, t);
  const paymentMethodInputs = getPaymentMethodInputs(
    newBankDetails,
    setNewBankDetails,
    t
  );
  const uploadInputs = getUploadInputs(formData, setFormData, company, t);

  const handleToggleSection = (section) => {
    setFormData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section],
      },
    }));
  };

  const handleDeletePaymentMethod = (index) => {
    const updatedPaymentMethods = formData.payment_methods.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      payment_methods: updatedPaymentMethods,
    }));
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{company.name}</h1>
        <p className={styles.status}>
          <strong>{t("companyProfile.status")}:</strong>
          <span
            className={
              company.status === "active" ? styles.active : styles.inactive
            }
          >
            {company.status === "active"
              ? t("companyProfile.active")
              : t("companyProfile.inactive")}
          </span>
        </p>

        <form onSubmit={handleSave}>
          <div className={styles.companyInfo}>
            <div className={`${styles.infoBlock} ${styles.sectionWrapper}`}>
              {profileInputs.map((input, index) => (
                <Input
                  key={index}
                  type={input.type}
                  inputType={input.inputType}
                  label={input.title}
                  value={input.value}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={input.onChange}
                  autoComplete={input.autoComplete}
                  editable={edit}
                  uploadContent={input?.uploadContent}
                  elementIndex={index}
                />
              ))}
            </div>

            <div className={styles.sectionWrapper}>
              <h2>{t("companyProfile.uploadLogos")}</h2>
              <div className={styles.uploadLayout}>
                {uploadInputs.map((input, index) => (
                  <Input
                    key={index}
                    type={input.type}
                    inputType={input.inputType}
                    label={input.title}
                    value={input.value}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={input.onChange}
                    inputClassName={styles.formControl}
                    uploadContent={input.uploadContent}
                    elementIndex={index}
                  />
                ))}
              </div>
            </div>

            <div className={styles.sectionWrapper}>
              <h2>{t("companyProfile.addPaymentMethod")}</h2>
              <div className={styles.paymentMethodsLayout}>
                <div className={styles.paymentMethodInputs}>
                  {paymentMethodInputs.map((input, index) => (
                    <Input
                      key={index}
                      type={input.type}
                      inputType={input.inputType}
                      label={input.title}
                      value={input.value}
                      name={input.name}
                      placeholder={input.placeholder}
                      onChange={input.onChange}
                      inputClassName={styles.formControl}
                      autoComplete={input.autoComplete}
                    />
                  ))}
                  <div className={styles.saveSection}>
                    <Button
                      label={t("companyProfile.addPaymentMethod")}
                      size={"btn-lg"}
                      type={"btn-primary"}
                      element={"button"}
                      disabled={!edit}
                      onClick={handleAddPaymentMethod}
                      svg={<AddSquareIcon />}
                    />
                  </div>
                </div>

                <div className={styles.paymentMethodsListContainer}>
                  <h3>{t("companyProfile.paymentMethods")}</h3>
                  <ul className={styles.paymentMethodsList}>
                    {formData.payment_methods.map((method, index) => (
                      <li key={index} className={styles.paymentMethodItem}>
                        {method.bank_name} - {method.account_number}
                        <DeleteIcon
                          onClick={() => handleDeletePaymentMethod(index)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.sectionWrapper}>
              <h2>{t("companyProfile.manageSections")}</h2>
              <div className={styles.sectionsControl}>
                {Object.keys(formData.sections).map((section) => (
                  <div key={section} className={styles.sectionItem}>
                    <label htmlFor={section}>{section}</label>
                    <Switches
                      value={formData.sections[section] || false}
                      onChange={() => handleToggleSection(section)}
                      size="medium"
                      type="primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.saveSection}>
            <Button
              label={t("companyProfile.saveChanges")}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              svg={<EditIcon />}
              onClick={handleSave}
            />
          </div>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default CompanyProfile;

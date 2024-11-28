import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../UI/Button/Button";
import { Input } from "../../../UI/Input/Input";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { Popup } from "../../../UI/Popup/Popup";
import PdfFile from "../../PdfFolder/PdfFile";

import styles from "./InvoiceModal.module.css";
import { set } from "date-fns";

const InvoiceModal = ({ order, setPopupShow, bankAccounts, setPopUpData }) => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const [markedFields, setMarkedFields] = useState({});
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(bankAccounts?.[0].value);

  const handleCheckboxToggle = (serviceId) => {
    setMarkedFields((prevChecked) => ({
      ...prevChecked,
      [serviceId]: !prevChecked[serviceId],
    }));
  };

  const handleGenerateInvoice = async () => {
    const selectedServices = Object.keys(markedFields).filter(
      (serviceId) => markedFields[serviceId]
    );

    const invoiceData = {
      orderId: order?._id,
      companyId: order?.company_id,
      operatorId: order?.operator_id?._id,
      customerId: order?.customer_id?._id,
      status: order?.status,
      paymentMethod: paymentMethod,
      passengers: order?.passengers,
      services: selectedServices,
      discount: discount,
      totalPrice: totalPrice,
    };

    try {
      const response = await axios.post(
        "/invoice/add-new-invoice",
        invoiceData
      );

      if (response.status !== 200) {
        throw new Error("Failed to generate invoice");
      }
      toast(t("invoice.generated_successfully"));
      setPopUpData(response?.data?.invoice);
      setPopupShow("PDF");
    } catch (error) {
      console.error(t("invoice.error_generating_invoice"), error);
    }
  };

  const handleInputChange = (e, params) => {
    const { name, onChange } = params;

    let data;
    if (!e.target) {
      data = {
        target: {
          value: e,
          name,
        },
      };
      return onChange(data);
    }

    onChange(e);
  };

  const inputs = [
    {
      title: t("inputTitles.bank_account_number"),
      name: "bank_account_numbr",
      type: "lable-input-select",
      options: bankAccounts,
      defaultAny: t("inputTitles.select"),
      required: true,
      onChange: (e) => {
        setPaymentMethod(e.target.value);
      },
    },
    {
      title: t("invoice.discount"),
      name: "discount",
      type: "number",
      placeholder: t("invoice.discount_placeholder"),
      value: discount,
      onChange: (e) => setDiscount(e.target.value),
    },
    {
      title: t("invoice.total_price"),
      name: "totalPrice",
      type: "number",
      placeholder: t("invoice.total_price_placeholder"),
      value: totalPrice,
      onChange: (e) => setTotalPrice(e.target.value),
      required: true,
    },
  ];

  return (
    <>
      <div className="pdf-inputs">
        <div className={styles.orderDetails}>
          <p>
            <strong>{t("invoice.operator_id")}:</strong>{" "}
            {order?.operator_id?.username}
          </p>
          <p>
            <strong>{t("invoice.customer_name")}:</strong>{" "}
            {order?.customer_id?.full_name}
          </p>
          <p>
            <strong>{t("invoice.customer_phone")}:</strong>{" "}
            {order?.customer_id?.phone_number?.number}
          </p>
          {/* <p>
            <strong>{t("invoice.payment_method")}:</strong>{" "}
            {order?.payment_method?.bank_name}
          </p> */}
        </div>
        <div className={styles.fields}>
          <h4>{t("invoice.mark_services")}</h4>
          <ul className={styles.servicesList}>
            {order?.services?.map((service, index) => (
              <li className={styles.serviceContainer} key={index}>
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={!!markedFields[service?.service_item_id?._id]}
                    onChange={() =>
                      handleCheckboxToggle(service?.service_item_id?._id)
                    }
                  />
                  <span className={styles.checkmark}></span>
                </label>
                <span className={styles.serviceItem}>
                  {service?.service_item_id?.service_type_id?.name ||
                    t("invoice.unnamed_service")}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.inputGroup}>
            {inputs.map((params, index) => (
              <Input
                key={index}
                type={params.type}
                label={params.title}
                defaultData={params.options}
                value={params.value || ""}
                name={params.name}
                customStyles={{ width: "100%" }}
                selectHandler={(opt) => {
                  handleInputChange(opt, params);
                }}
                selectLabel={"select"}
                placeholder={params.placeholder}
                onChange={(e) => handleInputChange(e, params)}
                arrayTitle={params.arrayTitle}
                required={params.required}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <Button
          label={t("invoice.clear_form")}
          type={"btn-primary"}
          element={"button"}
          onClick={() => {
            setMarkedFields({});
            setDiscount("");
            setTotalPrice("");
          }}
          customStyles={{
            width: "100%",
            height: "50px",
            borderRadius: "0",
            backgroundColor: "rgba(100, 95, 95, 0.571)",
          }}
        />
        <Button
          label={t("invoice.generate_invoice")}
          type={"btn-primary"}
          element={"button"}
          onClick={handleGenerateInvoice}
          customStyles={{
            width: "100%",
            height: "50px",
            borderRadius: "0",
            backgroundColor: "rgba(50, 205, 50, 0.7)",
          }}
        />
      </div>
    </>
  );
};

export default InvoiceModal;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfileInputs } from "./inputs";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { EditIcon } from "../../assets/svgs";
import { useTranslation } from "react-i18next";

import styles from "./Profile.module.css";

const UserProfile = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const user_id = useSelector((state) => state.user.user);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    username: "",
    companyName: "",
    roles: "",
    verified: false,
    email: "",
    phone_number: {
      code: "+995",
      flag: "🇬🇪",
      number: "",
    },
    bank_name: "",
    account_number: "",
  });

  // Fetch user data
  async function getUser() {
    setIsLoading(true);
    setEdit(false);
    try {
      const res = await axios.post("/users/get-user", { user_id });
      const { user } = res.data;

      // Success message
      // toast.success("User profile fetched successfully!");

      setFormData({
        userId: user._id,
        username: user.username,
        companyName: user.company_id,
        roles: user.roles,
        verified: user.verified,
        email: user.email,
        phone_number: user.phone_number,
        bank_name: user.bank_name,
        account_number: user.account_number,
      });
    } catch (error) {
      toast.error(t("userProfile.errorFetchingProfile"));
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Update user profile
  const handleChangeUser = async () => {
    try {
      const res = await axios.post("/users/edit-user", {
        email: formData.email,
        username: formData.username,
        password: formData.confirmPassword,
        userId: user_id,
        company_id: formData.company_id,
      });

      // Display a success message
      toast.success(res.data.message);
      getUser(); // Refresh the data after update
    } catch (error) {
      toast.error(t("userProfile.errorUpdatingProfile"));
      console.error("Error updating user profile:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e, params) => {
    setEdit(true); // Enable edit mode
    const { name, onChange } = params;

    let data;
    if (!e.target) {
      data = { target: { value: e, name } };
      return onChange(data);
    }

    onChange(e);
  };

  const profileInputs = getProfileInputs(formData, setFormData, t);

  useEffect(() => {
    getUser(); // Fetch user data on component mount
  }, []);

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("userProfile.title")}</h1>
        <p className={styles.status}>
          <strong>{t("userProfile.verifyStatus")}:</strong>
          <span className={formData.verified ? styles.active : styles.inactive}>
            {formData.verified
              ? t("userProfile.verified")
              : t("userProfile.unverified")}
          </span>
        </p>

        <p className={styles.status}>
          <strong>{t("userProfile.userRole")}:</strong>
          <span className={styles.active}>{formData.roles[0]}</span>
        </p>

        <form>
          <div className={styles.companyInfo}>
            <div className={styles.infoBlock}>
              {profileInputs.map((params, index) => (
                <Input
                  key={index}
                  type={params?.type}
                  label={params?.title}
                  defaultData={params?.options}
                  value={formData[params.name] || ""}
                  name={params.name}
                  customStyles={{ width: "100%" }}
                  selectHandler={(opt) => handleInputChange(opt, params)}
                  placeholder={params?.placeholder}
                  onChange={(e) => handleInputChange(e, params)}
                  editable={!edit}
                />
              ))}
            </div>
          </div>

          <div className={styles.saveSection}>
            <Button
              label={t("userProfile.saveChanges")}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              disabled={!edit}
              svg={<EditIcon />}
              onClick={() => handleChangeUser()}
            />
          </div>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default UserProfile;

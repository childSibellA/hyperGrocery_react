import React, { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "../../UI/Input/Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/userReducer ";
import { useTranslation } from "react-i18next";
import { HelpText } from "../../UI/HelpText/HelpText";
import { useValidation } from "../../hooks/useValidation";
import { getRegistrationInputs } from "./inputs";
import { Button } from "../../UI/Button/Button";
import RegistrationSVg from "../../assets/svgs/Registration";

import styles from "./Registration.module.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: { code: "+995", flag: "🇬🇪", number: "" },
    username: "",
    password: "",
    confirm_password: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
    confirm_password: false,
  });

  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const helpTexts = {
    email: {
      validationType: "email",
      success: t("validations.emailValid"),
      failure: t("validations.emailInvalid"),
    },
    password: {
      validationType: "password",
      success: t("validations.passwordValid"),
      failure: t("validations.passwordInvalid"),
    },
  };

  const formErrors = useValidation(
    {
      email: formData.email,
      password: formData.password,
    },
    helpTexts
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error(t("validations.passwordMismatch"));
      return;
    }

    const hasErrors = Object.keys(formErrors).some(
      (key) => formErrors[key].failure
    );
    if (hasErrors) {
      toast.error(t("validations.emailInvalid"));
      return;
    }

    try {
      const response = await axios.post("/auth/company-registration", formData);
      toast.success(t("registrationSuccess")); // Success message

      const { email, access_token, user_id, roles, companyId, company } =
        response.data;

      dispatch(
        logIn({
          email,
          access_token,
          user: user_id,
          roles,
          companyId,
          company,
        })
      );

      navigate("/customers");
      toast.success(t("welcomeMessage")); // Welcome message
    } catch (error) {
      console.error("Error registering company and super admin:", error);
      toast.error(t("registrationError")); // Error message
    }
  };

  // Add validation logic for matching passwords
  const isPasswordMatch =
    formData.password &&
    formData.confirm_password &&
    formData.password === formData.confirm_password;

  const arePasswordsEmpty =
    formData.password === "" && formData.confirm_password === "";

  // Track when the fields are touched
  const handleFieldTouch = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  // Check if the form is valid
  const isFormValid = useMemo(() => {
    const hasNoErrors = !Object.keys(formErrors).some(
      (key) => formErrors[key].failure
    );
    return (
      hasNoErrors &&
      formData.password &&
      formData.confirm_password &&
      isPasswordMatch
    );
  }, [
    formErrors,
    formData.password,
    formData.confirm_password,
    isPasswordMatch,
  ]);

  // Map the input fields and include validation for email, password, and confirm_password
  const registrationInputs = getRegistrationInputs(formData, setFormData, t);

  return (
    <div className={styles.container}>
      <h2 className={styles.formHeader}>{t("register.registerCompany")}</h2>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        {registrationInputs.map((params, index) => (
          <div className={styles.inputField} key={index}>
            <Input
              type={params.type}
              inputType={params.inputType}
              label={params.title}
              value={params.value}
              name={params.name}
              required={params.required}
              placeholder={params.placeholder}
              onChange={(e) => {
                params.onChange(e);
                if (
                  params.name === "email" ||
                  params.name === "password" ||
                  params.name === "confirm_password"
                ) {
                  handleFieldTouch(params.name); // Mark as touched when typing starts
                }
              }}
              inputClassName={styles.formControl}
              autoComplete={params.autoComplete}
              // Unified HelpText to handle both validation and password match logic
              statusCard={
                (params.name === "email" ||
                  params.name === "password" ||
                  params.name === "confirm_password") && (
                  <HelpText
                    status={
                      params.name === "email" &&
                      touchedFields.email &&
                      formErrors.email?.failure
                        ? "error"
                        : params.name === "password" &&
                            formErrors.password?.failure
                          ? "error"
                          : params.name === "confirm_password" &&
                              touchedFields.confirm_password &&
                              !arePasswordsEmpty &&
                              !isPasswordMatch
                            ? "error"
                            : params.name === "confirm_password" &&
                                touchedFields.confirm_password &&
                                !arePasswordsEmpty &&
                                isPasswordMatch
                              ? "success"
                              : null
                    }
                    title={
                      params.name === "email" &&
                      touchedFields.email &&
                      formErrors.email?.failure
                        ? formErrors.email?.failure
                        : params.name === "password" &&
                            formErrors.password?.failure
                          ? formErrors.password?.failure
                          : params.name === "confirm_password" &&
                              touchedFields.confirm_password &&
                              !arePasswordsEmpty &&
                              !isPasswordMatch
                            ? t("validations.passwordMismatch")
                            : params.name === "confirm_password" &&
                                touchedFields.confirm_password &&
                                !arePasswordsEmpty &&
                                isPasswordMatch
                              ? t("validations.passwordMatch")
                              : ""
                    }
                    fontSize="font-12"
                    icon={true}
                  />
                )
              }
            />
          </div>
        ))}

        <div className={styles.buttonContainer}>
          <Button
            label={t("registration")}
            size={"btn-lg"}
            type={"btn-primary"}
            element={"button"}
            onClick={handleSubmit}
            disabled={!isFormValid} // Disable button if form is invalid
            ArrowDownSvg={<RegistrationSVg />}
          />
        </div>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Registration;

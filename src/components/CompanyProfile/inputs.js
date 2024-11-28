import { t } from "i18next";

export const getProfileInputs = (formData, setFormData, t) => [
  {
    title: t("registrationInputTitles.companyName"),
    name: "name",
    type: "default",
    placeholder: "Enter Company Name",
    value: formData.name || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("registrationInputTitles.email"),
    name: "email",
    type: "default",
    placeholder: "Enter Email",
    value: formData.email || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("registrationInputTitles.phoneNumber"),
    name: "phone_number",
    type: "label-input-phone-number",
    placeholder: "Phone Number",
    value: formData.phone_number || { code: "+995", flag: "🇬🇪", number: "" },
    onChange: (data) =>
      setFormData((prev) => ({
        ...prev,
        phone_number: data,
      })),
  },
  {
    title: t("registrationInputTitles.registrationId"),
    name: "registration_id",
    type: "default",
    placeholder: "Enter Company Name",
    value: formData.registration_id || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },

  {
    title: t("registrationInputTitles.companyAddress"),
    name: "address",
    type: "default",
    placeholder: "Enter Company Address",
    value: formData.address || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
];

export const getUploadInputs = (formData, setFormData, company, t) => [
  {
    title: t("registrationInputTitles.companyLogo"),
    name: "companyLogo",
    type: "label-input-upload",
    placeholder: "Upload Company Logo",
    value: company.main_logo || "", // Directly access companyLogo
    uploadContent: t("registrationInputTitles.companyLogo"),
    onChange: (file) => {
      // Store the file directly in formData
      setFormData((prev) => ({
        ...prev,
        companyLogo: file, // Set the file directly
      }));
    },
  },
  {
    title: t("registrationInputTitles.stampLogo"),
    name: "ringLogo",
    type: "label-input-upload",
    placeholder: "Upload Stamp Logo",
    value: company.ring_logo || "", // Directly access ringLogo
    uploadContent:  t("registrationInputTitles.stampLogo"),
    onChange: (file) => {
      setFormData((prev) => ({
        ...prev,
        ringLogo: file, // Set the file directly
      }));
    },
  },
  {
    title: t("registrationInputTitles.invoiceLogo"),
    name: "invoiceLogo",
    type: "label-input-upload",
    placeholder: "Upload Invoice Logo",
    value: company.invoice_logo || "", // Directly access invoiceLogo
    uploadContent: t("registrationInputTitles.invoiceLogo"),
    onChange: (file) => {
      setFormData((prev) => ({
        ...prev,
        invoiceLogo: file, // Set the file directly
      }));
    },
  },
];

//payment method
export const getPaymentMethodInputs = (newBankDetails, setNewBankDetails, t) => [
  {
    title: t("inputTitles.banck_name"),
    name: "bank_name",
    type: "default",
    placeholder: "Enter Company Name",
    value: newBankDetails.bank_name || "",
    onChange: (e) =>
      setNewBankDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("inputTitles.bank_account_number"),
    name: "account_number",
    type: "default",
    placeholder: "Enter Company Name",
    value: newBankDetails.account_number || "",
    onChange: (e) =>
      setNewBankDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
];

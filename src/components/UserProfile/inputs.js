export const getProfileInputs = (formData, setFormData, t) => [
  //image upload inputs
  {
    title: t("inputTitles.full_name"),
    name: "username",
    type: "default",
    placeholder: "Enter Username for Admin",
    autoComplete: "username",
    value: formData.username || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("users.Email"),
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
    title: t("inputTitles.phone_number"),
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
];

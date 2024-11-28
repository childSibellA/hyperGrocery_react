export const getRegistrationInputs = (formData, setFormData, t) => [
  {
    title: t("registrationInputTitles.companyName"),
    name: "name",
    type: "default",
    placeholder: t("registrationInputTitles.companyName"),
    value: formData.name || "",
    required: true,
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
    placeholder: t("registrationInputTitles.email"),
    value: formData.email || "",
    required: true,
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
    placeholder: t("registrationInputTitles.phoneNumber"),
    required: true,
    value: formData.phone_number || { code: "+995", flag: "🇬🇪", number: "" },
    onChange: (data) =>
      setFormData((prev) => ({
        ...prev,
        phone_number: data,
      })),
  },
  {
    title: t("registrationInputTitles.username"),
    name: "username",
    type: "default",
    placeholder: t("registrationInputTitles.username"),
    autoComplete: "username",
    value: formData.username || "",
    required: true,
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("registrationInputTitles.password"),
    name: "password",
    type: "default",
    inputType: "password",
    placeholder: t("registrationInputTitles.password"),
    autoComplete: "new-password",
    value: formData.password || "",
    required: true,
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("registrationInputTitles.confirmPassword"),
    name: "confirm_password",
    type: "default",
    inputType: "password",
    autoComplete: "new-password",
    placeholder: t("registrationInputTitles.confirmPassword"),
    required: true,
    value: formData.confirm_password || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
];

// customerInputs.js

let genderData = [
  {
    name: "Male",
    value: "male",
  },
  {
    name: "Female",
    value: "female",
  },
];

let WDYAHAUOptions = [
  {
    name: "fb",
    value: "fb",
  },
  {
    name: "instagram",
    value: "instagram",
  },
];

export const getCustomerInputs = (customerData, setCustomerData, operators, t) => [
  {
    title: t("customerInputTitles.operatorID"),
    name: "operator_id",
    type: "lable-input-select",
    options: operators,
    defaultAny: t("customerInputTitles.select"),
    required: true,
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("customerInputTitles.fullName"),
    name: "full_name",
    type: "default",
    placeholder: t("customerInputTitles.fullNamePlaceholder"),
    required: true,
    value: customerData.full_name,
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("customerInputTitles.emailAddress"),
    name: "email_address",
    type: "default",
    placeholder: t("customerInputTitles.emailAddressPlaceholder"),
    value: customerData.email_address,
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("customerInputTitles.nationalIDNumber"),
    name: "national_ID_number",
    type: "default",
    placeholder: t("customerInputTitles.nationalIDNumberPlaceholder"),
    value: customerData.national_ID_number,
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("customerInputTitles.gender"),
    name: "gender",
    type: "lable-input-select",
    options: genderData,
    defaultAny: t("customerInputTitles.select"),
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("customerInputTitles.WDYAHAU"),
    name: "WDYAHAU",
    type: "lable-input-select",
    options: WDYAHAUOptions,
    defaultAny: t("customerInputTitles.select"),
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("customerInputTitles.phoneNumber"),
    name: "phone_number",
    type: "label-input-phone-number",
    placeholder: t("customerInputTitles.phoneNumberPlaceholder"),
    value: customerData.phone_number,
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("customerInputTitles.note"),
    name: "note",
    type: "textarea",
    placeholder: t("customerInputTitles.notePlaceholder"),
    value: customerData.note,
    onChange: (e) =>
      setCustomerData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
];

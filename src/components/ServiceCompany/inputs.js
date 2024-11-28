export const serviceCompanyInputs = (popUpData, setPopUpData, exCategory) => [
  {
    title: "Service Type",
    name: "service_type_id",
    type: "lable-input-select",
    options: exCategory,
    defaultAny: "Select",
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: "Name",
    name: "name",
    type: "default",
    placeholder: "Name",
    value: popUpData.name,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: "Bank Name",
    name: "bank_name",
    type: "default",
    placeholder: "Bank Name",
    value: popUpData.bank_name,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: "Bank Account Number",
    name: "bank_account_numbr",
    type: "default",
    placeholder: "Bank Account Number",
    value: popUpData.bank_account_numbr,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: "Addition Information",
    name: "additional_information",
    type: "textarea",
    placeholder: "Addition Information",
    value: popUpData.additional_information,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
];

// Translation-adjusted `getInputs` function
export const getOrderInputs = (popUpData, setPopUpData, operators, t) => [
  {
    title: t("inputTitles.operator_id"),
    name: "operator_id",
    type: "lable-input-select",
    options: operators,
    defaultAny: t("inputTitles.select"),
    required: true,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        operator_id: e.target.value,
      }));
    },
  },
  {
    title: t("inputTitles.phone_number"),
    name: "phone_number",
    type: "label-input-phone-number",
    placeholder: t("inputTitles.phone_number_placeholder"),
    value: popUpData.phone_number,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("inputTitles.customer_name"),
    name: "full_name",
    type: "default",
    placeholder: t("inputTitles.full_name_placeholder"),
    value: popUpData.full_name,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        full_name: e.target.value,
      }));
    },
  },
  {
    title: t("inputTitles.national_id_number"),
    name: "national_ID_number",
    type: "default",
    placeholder: t("inputTitles.national_id_placeholder"),
    value: popUpData.national_ID_number,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        national_ID_number: e.target.value,
      }));
    },
  },
  {
    title: t("inputTitles.note"),
    name: "note",
    type: "textarea",
    placeholder: t("inputTitles.note_placeholder"),
    value: popUpData.note,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        note: e.target.value,
      }));
    },
  },
  {
    title: t("inputTitles.passenger"),
    name: "passenger",
    type: "input-with-button",
    arrayTitle: t("inputTitles.passenger_list"),
    placeholder: t("inputTitles.passenger_placeholder"),
    value: popUpData.passenger,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        passenger: e.target.value,
      }));
    },
  },
];

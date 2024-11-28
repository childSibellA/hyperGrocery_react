export const getInvoiceInputs = (
  popUpData,
  setPopUpData,
  operators,
  BANK_ACCOUNTS,
  t
) => [
  {
    title: t("inputTitles.operator_id"),
    name: "operator_id",
    type: "lable-input-select",
    options: operators,
    defaultAny: t("inputTitles.select"),
    required: true,
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
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        customer_id: {
          ...prev.customer_id,
          phone_number: {
            ...prev.customer_id.phone_number,
            number: e.target.value, // Ensure number is updated as a string
          },
        },
      }));
    },
  },
  {
    title: t("inputTitles.customer_name"),
    name: "full_name",
    type: "default",
    placeholder: t("inputTitles.full_name_placeholder"),
    value: popUpData.customer_id.full_name || "", // Update full name
    required: true,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        customer_id: {
          ...prev.customer_id,
          full_name: e.target.value,
        },
      }));
    },
  },
  {
    title: t("inputTitles.national_id_number"),
    name: "national_ID_number",
    type: "default",
    placeholder: t("inputTitles.national_id_placeholder"),
    value: popUpData.customer_id.national_ID_number || "", // Update national ID
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        customer_id: {
          ...prev.customer_id,
          national_ID_number: e.target.value,
        },
      }));
    },
  },
  {
    title: t("inputTitles.bank_account_number"),
    name: "bank_account_numbr",
    type: "lable-input-select",
    options: BANK_ACCOUNTS,
    required: true,
    defaultAny: t("inputTitles.select"),
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        payment_method: e.target.value,
      }));
    },
  },
  {
    title: t("invoice.Status"),
    name: "Status",
    type: "lable-input-select",
    options: [
      { name: "Paid", value: "paid" },
      { name: "Unpaid", value: "unpaid" },
      { name: "Canceled", value: "canceled" },
    ],
    defaultAny: "Select",
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        status: e.target.value,
      }));
    },
  },
  {
    title: t("invoice.Discount"),
    name: "discount",
    type: "number",
    placeholder: "Enter Discount",
    value: popUpData.discount,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        discount: e.target.value,
      })),
  },
  {
    title: t("invoice.total_price"),
    name: "total_price",
    type: "number",
    placeholder: "Enter Total Price",
    value: popUpData.total_price,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        total_price: e.target.value,
      })),
  },
  {},
];

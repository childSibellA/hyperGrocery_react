export const getServiceInputs = (
  popUpData,
  setPopUpData,
  serviceCompanies,
  serviceTypes,
  t
) => [
  {
    title: t("serviceItemInputTitles.serviceType"),
    name: "service_type_id",
    type: "lable-input-select",
    options: serviceTypes,
    defaultAny: t("serviceItemInputTitles.serviceTypePlaceholder"),
    required: true,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("serviceItemInputTitles.serviceCompany"),
    name: "service_company_id",
    type: "lable-input-select",
    options: serviceCompanies,
    defaultAny: t("serviceItemInputTitles.serviceCompanyPlaceholder"),
    required: true,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("serviceItemInputTitles.date"),
    name: "start_date",
    type: "date-picker-input",
    placeholder: t("serviceItemInputTitles.datePlaceholder"),
    value: popUpData.start_date,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("serviceItemInputTitles.dateOfEnd"),
    name: "end_date",
    type: "date-picker-input",
    placeholder: t("serviceItemInputTitles.dateOfEndPlaceholder"),
    value: popUpData.end_date,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("serviceItemInputTitles.location"),
    name: "location",
    type: "default",
    placeholder: t("serviceItemInputTitles.locationPlaceholder"),
    value: popUpData.location,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("serviceItemInputTitles.destination"),
    name: "destination",
    type: "default",
    placeholder: t("serviceItemInputTitles.destinationPlaceholder"),
    value: popUpData.destination,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("serviceItemInputTitles.document"),
    name: "document",
    type: "default",
    placeholder: t("serviceItemInputTitles.documentPlaceholder"),
    value: popUpData.document,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("serviceItemInputTitles.amount"),
    name: "amount",
    type: "number",
    placeholder: t("serviceItemInputTitles.amountPlaceholder"),
    value: popUpData.amount,
    required: true,
    onChange: (e) =>
      setPopUpData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
];

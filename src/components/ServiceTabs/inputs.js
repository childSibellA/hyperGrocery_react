// Main service input function
const getSharedDateInputs = (
  popUpData,
  setPopUpData,
  startDateLabel,
  endDateLabel
) => [
  {
    title: startDateLabel,
    name: "start_date",
    type: "date-picker-input",
    placeholder: startDateLabel,
    value: popUpData.start_date,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        start_date: e.target.value,
      }));
    },
  },
  {
    title: endDateLabel,
    name: "end_date",
    type: "date-picker-input",
    placeholder: endDateLabel,
    value: popUpData.end_date,
    onChange: (e) => {
      setPopUpData((prev) => ({
        ...prev,
        end_date: e.target.value,
      }));
    },
  },
];

export const getServiceInputs = (popUpData, setPopUpData, activeTab, t) => {
  switch (activeTab) {
    case "Ticket":
      return [
        {
          title: t("inputTitles.location"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.city_from_placeholder"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.destination"),
          name: "destination",
          type: "default",
          placeholder: t("inputTitles.city_to_placeholder"),
          value: popUpData.destination,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              destination: e.target.value,
            }));
          },
        },
        ...getSharedDateInputs(
          popUpData,
          setPopUpData,
          t("inputTitles.date_of_fly"),
          t("inputTitles.date_of_return")
        ),
      ];

    case "Visa":
      return [
        {
          title: t("inputTitles.country"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.country_placeholder"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.visa_type"),
          name: "visa_type",
          type: "default",
          placeholder: t("inputTitles.visa_type_placeholder"),
          value: popUpData.visa_type,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              visa_type: e.target.value,
            }));
          },
        },
        ...getSharedDateInputs(
          popUpData,
          setPopUpData,
          t("inputTitles.visa_issue_date"),
          t("inputTitles.visa_expiry_date")
        ),
      ];

    case "Hotel":
      return [
        {
          title: t("inputTitles.city"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.city"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.hotel_name"),
          name: "hotel_name",
          type: "default",
          placeholder: t("inputTitles.hotel_name_placeholder"),
          value: popUpData.hotel_name,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              hotel_name: e.target.value,
            }));
          },
        },
        ...getSharedDateInputs(
          popUpData,
          setPopUpData,
          t("inputTitles.check_in_date"),
          t("inputTitles.check_out_date")
        ),
      ];

    case "Invitation":
      return [
        {
          title: t("inputTitles.invitation_country"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.invitation_country_placeholder"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.invitation_type"),
          name: "invitation_type",
          type: "default",
          placeholder: t("inputTitles.invitation_type_placeholder"),
          value: popUpData.invitation_type,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              invitation_type: e.target.value,
            }));
          },
        },
        ...getSharedDateInputs(
          popUpData,
          setPopUpData,
          t("inputTitles.invitation_issue_date"),
          t("inputTitles.invitation_expiry_date")
        ),
      ];

    case "Returnable Ticket":
      return [
        {
          title: t("inputTitles.location"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.city_from_placeholder"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.destination"),
          name: "destination",
          type: "default",
          placeholder: t("inputTitles.city_to_placeholder"),
          value: popUpData.destination,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              destination: e.target.value,
            }));
          },
        },
        ...getSharedDateInputs(
          popUpData,
          setPopUpData,
          t("inputTitles.date_of_fly"),
          t("inputTitles.return_date")
        ),
      ];

    case "Transfer":
      return [
        {
          title: t("inputTitles.pickup_location"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.pickup_location_placeholder"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.dropoff_location"),
          name: "destination",
          type: "default",
          placeholder: t("inputTitles.dropoff_location_placeholder"),
          value: popUpData.destination,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              destination: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.transfer_date"),
          name: "start_date",
          type: "date-picker-input",
          placeholder: t("inputTitles.transfer_date_placeholder"),
          value: popUpData.start_date,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              start_date: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.transfer_return_date"),
          name: "end_date",
          type: "date-picker-input",
          placeholder: t("inputTitles.transfer_return_date_placeholder"),
          value: popUpData.end_date,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              end_date: e.target.value,
            }));
          },
        },
      ];

    case "Internal Transfer":
      return [
        {
          title: t("inputTitles.internal_pickup_location"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.internal_pickup_location_placeholder"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.internal_dropoff_location"),
          name: "destination",
          type: "default",
          placeholder: t("inputTitles.internal_dropoff_location_placeholder"),
          value: popUpData.destination,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              destination: e.target.value,
            }));
          },
        },
        ...getSharedDateInputs(
          popUpData,
          setPopUpData,
          t("inputTitles.internal_transfer_date"),
          t("inputTitles.internal_transfer_return_date")
        ),
      ];

    case "Check In":
      return [
        {
          title: t("inputTitles.check_in_date"),
          name: "start_date",
          type: "date-picker-input",
          placeholder: t("inputTitles.check_in_date_placeholder"),
          value: popUpData.start_date,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              start_date: e.target.value,
            }));
          },
        },
      ];

    case "Insurance":
      return [
        {
          title: t("inputTitles.insurance_provider"),
          name: "insurance_provider",
          type: "default",
          placeholder: t("inputTitles.insurance_provider_placeholder"),
          value: popUpData.insurance_provider,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              insurance_provider: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.zone"),
          name: "zone",
          type: "default",
          placeholder: t("inputTitles.zone_placeholder"),
          value: popUpData.zone,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              zone: e.target.value,
            }));
          },
        },
        ...getSharedDateInputs(
          popUpData,
          setPopUpData,
          t("inputTitles.insurance_start_date"),
          t("inputTitles.insurance_end_date")
        ),
      ];

    case "Baggage":
      return [
        {
          title: t("inputTitles.baggage_type"),
          name: "baggage_type",
          type: "default",
          placeholder: t("inputTitles.baggage_type_placeholder"),
          value: popUpData.baggage_type,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              baggage_type: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.weight"),
          name: "baggage_weight",
          type: "default",
          placeholder: t("inputTitles.weight_placeholder"),
          value: popUpData.baggage_weight,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              baggage_weight: e.target.value,
            }));
          },
        },
      ];

    case "Tour":
      return [
        {
          title: t("inputTitles.location"),
          name: "location",
          type: "default",
          placeholder: t("inputTitles.location"),
          value: popUpData.location,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              location: e.target.value,
            }));
          },
        },
        {
          title: t("inputTitles.direction"),
          name: "destination",
          type: "default",
          placeholder: t("inputTitles.direction"),
          value: popUpData.destination,
          onChange: (e) => {
            setPopUpData((prev) => ({
              ...prev,
              destination: e.target.value,
            }));
          },
        },
      ];

    default:
      return [];
  }
};

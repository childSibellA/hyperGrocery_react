import { useState } from "react";
import { Input } from "./Input/Input";

let metodData = [
  {
    name: "BOG",
    value: "BOG",
  },
  {
    name: "TBC",
    value: "TBC",
  },
];

let options = [
  {
    name: "Yes",
    value: "Yes",
  },
  {
    name: "No",
    value: "No",
  },
];

const CheckInputs = () => {
  const [edit, setEdit] = useState(false);
  const [popUpData, setPopUpData] = useState({
    number: "",
    invoice_number: "",
    phone_number: {
      code: "+995",
      flag: "🇬🇪",
      number: "",
    },
    national_ID_number: "",
    date_of_fly: "",
    date_of_return: "",
    city_from: "",
    city_to: "",
    method_of_payment: "",
    visa: "",
    invitation: "",
    hotel: "",
    ticket: "",
    baggage: "",
    insurance: "",
    return_ticket: "",
    transfer: "",
    internal_transfer: "",
    check_in: "",
    note: "",
    total_price: 0,
    discount: "",
    operator_id: "",
    _id: "",
  });
  const inputs = [
    {
      title: "number",
      name: "number",
      type: "number",
      placeholder: "number",
      value: popUpData.number,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Phone Number",
      name: "phone_number",
      type: "label-input-phone-number",
      placeholder: "Phone Number",
      value: popUpData.phone_number,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "lable-input-type1",
      name: "national_ID_number",
      type: "lable-input-type1",
      placeholder: "lable-input-type1",
      value: popUpData.national_ID_number,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "lable-input-type2",
      name: "national_ID_number",
      type: "lable-input-type2",
      placeholder: "lable-input-type2",
      value: popUpData.national_ID_number,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "lable-input-type2",
      name: "national_ID_number",
      type: "lable-input-select",
      placeholder: "lable-input-type2",
      value: popUpData.national_ID_number,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Date of Fly",
      name: "date_of_fly",
      type: "date-picker-input",
      placeholder: "Date of Fly",
      value: popUpData.date_of_fly,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Date of Return",
      name: "date_of_return",
      type: "date-picker-input",
      placeholder: "Date of Return",
      value: popUpData.date_of_return,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "City From",
      name: "city_from",
      type: "default",
      placeholder: "City From",
      value: popUpData.city_from,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "City To",
      name: "city_to",
      type: "default",
      placeholder: "City To",
      value: popUpData.city_to,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Method Of Payment",
      name: "method_of_payment",
      type: "lable-input-select",
      options: metodData,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Visa",
      name: "visa",
      type: "default",
      placeholder: "Visa",
      value: popUpData.visa,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Invitation",
      name: "invitation",
      type: "default",
      placeholder: "Invitation",
      value: popUpData.invitation,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Hotel",
      name: "hotel",
      type: "default",
      placeholder: "Hotel",
      value: popUpData.hotel,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Baggage",
      name: "baggage",
      type: "lable-input-select",
      options: options,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Ticket",
      name: "ticket",
      type: "lable-input-select",
      options: options,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Insurance",
      name: "insurance",
      type: "lable-input-select",
      options: options,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Return Ticket",
      name: "return_ticket",
      type: "lable-input-select",
      options: options,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Transfer",
      name: "transfer",
      type: "lable-input-select",
      options: options,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Internal Transfer",
      name: "internal_transfer",
      type: "lable-input-select",
      options: options,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Check In",
      name: "check_in",
      type: "lable-input-select",
      options: options,
      defaultAny: "Select",
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Discount",
      name: "discount",
      type: "default",
      placeholder: "Discount",
      value: popUpData.discount,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Total Price",
      name: "total_price",
      type: "number",
      placeholder: "Total Price",
      value: popUpData.total_price,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Note",
      name: "note",
      type: "textarea",
      placeholder: "Note",
      value: popUpData.note,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
  ];

  const handleInputChange = (e, params) => {
    const { name, onChange } = params;

    let data;
    if (!e.target) {
      data = {
        target: {
          value: e,
          name,
        },
      };
      return onChange(data);
    }

    onChange(e);
  };
  return (
    <div>
      {inputs?.map((params, index) => {
        return (
          <div className="exchange-input-wrapper" key={index}>
            <Input
              key={index}
              type={params?.type}
              label={params?.title}
              defaultData={params?.options}
              value={popUpData[params.name]}
              name={params.name}
              customStyles={{ width: "100%" }}
              selectHandler={(opt) => {
                handleInputChange(opt, params);
              }}
              selectLabel={"select"}
              placeholder={params?.placeholder}
              onChange={(e) => handleInputChange(e, params)}
              customInputStyles={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              editable={edit}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CheckInputs;

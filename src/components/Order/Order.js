import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFetchOperators from "../../hooks/useFetchOperators";
import { useTableParameters } from "../../hooks/useTableParameters";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { Popup } from "../../UI/Popup/Popup";
import { AddSquareIcon } from "../../assets/svgs";

import Table from "./Table";
import InvoiceModal from "./invoiceModal/InvoiceModal";
import { useTranslation } from "react-i18next";
import { getOrderInputs } from "./inputs";
import OrderDetails from "./orderDetails/OrderDetails";
import ServiceTabs from "../ServiceTabs/ServiceTabs";
import PdfFile from "../PdfFolder/PdfFile";

import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("orders");
  const company_id = useSelector((state) => state.user.companyId);
  const role = useSelector((state) => state.user.roles[0]);
  const user_id = useSelector((state) => state.user.user);

  const { operators } = useFetchOperators(company_id);

  const [activeTab, setActiveTab] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(5);
  const [edit, setEdit] = useState(false);
  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({
    selects: { statuses: "unpaid" },
  });
  const [popupShow, setPopupShow] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [markedServices, setMarkedServices] = useState("");

  const [popUpData, setPopUpData] = useState({
    _id: "",
    operator_id: user_id,
    full_name: "",
    phone_number: {
      code: "+995",
      flag: "🇬🇪",
      number: "",
    },
    national_ID_number: "",
    payment_method: "",

    // Consistent date fields
    start_date: "",
    end_date: "",

    // Location and Destination for different services
    location: "",
    destination: "",

    detales: "",
    note: "",
    total_price: 0,
    discount: "",
    passenger: "",
    services: [],
    passengers: [],

    // Specific fields for certain services
    hotel_name: "", // For hotel-related services
    visa_type: "", // For visa-related services
    invitation_type: "", // For invitation-related services
    insurance_provider: "", // For insurance-related services
    zone: "", // For insurance-specific field

    // Baggage-related fields
    baggage_type: "",
    baggage_weight: "",
  });

  const BANK_ACCOUNTS = bankAccounts.map((account) => ({
    name: account.bank_name,
    value: {
      bank_name: account.bank_name,
      bank_account_numbr: account.account_number,
    },
  }));

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

  const inputs = getOrderInputs(popUpData, setPopUpData, operators, t);

  const clearPopUpData = () => {
    setDisabledBtn(false);
    setPopUpData({
      _id: "",
      operator_id: "",
      full_name: "",
      phone_number: {
        code: "+995",
        flag: "🇬🇪",
        number: "",
      },
      national_ID_number: "",
      payment_method: "",

      // Consistent date fields
      start_date: "",
      end_date: "",

      // Location and Destination for different services
      location: "",
      destination: "",

      detales: "",
      note: "",
      total_price: 0,
      discount: "",
      passenger: "",
      services: [],
      passengers: [],

      // Specific fields for certain services
      hotel_name: "", // For hotel-related services
      visa_type: "", // For visa-related services
      invitation_type: "", // For invitation-related services
      insurance_provider: "", // For insurance-related services
      zone: "", // For insurance-specific field

      // Baggage-related fields
      baggage_type: "",
      baggage_weight: "",
    });

    setActiveTab("");
    setMarkedServices("");
    setEdit(false);
  };

  const getOrders = async () => {
    setIsLoading(true);
    if (role === "OPERATOR") {
      try {
        const res = await axios.post("/order/get-all-users-orders", {
          company_id,
          user_id,
          page: pageNow,
          tableFilterOutcomingData,
          limit: 10,
        });
        setOrdersData(res.data.orders);
        setPageAll(res.data.totalPages);
      } catch (err) {
        toast(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const res = await axios.post("/order/get-all-orders", {
          company_id,
          page: pageNow,
          tableFilterOutcomingData,
          limit: 10,
        });
        setOrdersData(res.data.orders);
        setPageAll(res.data.totalPages);
      } catch (err) {
        toast(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getCompanyBankAccounts = async () => {
    try {
      const res = await axios.post("/company/get-company-by-id", {
        company_id,
      });
      setBankAccounts(res.data.companies.payment_methods);
    } catch (err) {
      toast(err.response?.data?.message || err.message);
    }
  };

  const getServiceTypes = async () => {
    try {
      const res = await axios.post("/service-type/get-all-service-types", {
        company_id,
      });
      setServiceTypes(res.data.serviceTypes);
    } catch (err) {
      toast(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getOrders();
    getCompanyBankAccounts();
    getServiceTypes();
  }, [pageNow, tableFilterOutcomingData]);

  const editOrderHandler = (order) => {
    setEdit(true);

    const mappedServices = order.services.map((service) => ({
      serviceName: service.service_item_id?.service_type_id?.name || "",
      type: service.service_item_id?.service_type_id?._id || "",
      start_date: service.service_item_id?.start_date || "",
      end_date: service.service_item_id?.end_date || "",
      location: service.service_item_id?.location || "",
      destination: service.service_item_id?.destination || "",
      visa_type: service.service_item_id?.visa_type || "",
      hotel_name: service.service_item_id?.hotel_name || "",
      invitation_type: service.service_item_id?.invitation_type || "",
      insurance_provider: service.service_item_id?.insurance_provider || "",
      zone: service.service_item_id?.zone || "",
      baggage_type: service.service_item_id?.baggage_type || "",
      baggage_weight: service.service_item_id?.baggage_weight || "",
    }));

    setPopUpData({
      _id: order._id || "",
      operator_id: order.operator_id?._id || "",
      full_name: order.customer_id?.full_name || "Unknown Customer",
      phone_number: order.customer_id?.phone_number || {
        code: "+995",
        flag: "🇬🇪",
        number: "",
      },
      national_ID_number: order.customer_id?.national_ID_number || "",
      payment_method: {
        bank_name: order.payment_method?._id || "",
        bank_account_numbr: order.payment_method?.account_number || "",
      },
      start_date: order.start_date || "",
      end_date: order.end_date || "",
      location: order.location || "",
      destination: order.destination || "",
      detales: order.detales || "",
      note: order.note || "",
      total_price: order.total_price || 0,
      discount: order.discount || "",
      passengers: order.passengers || [],
      services: mappedServices, // Use standardized services structure
    });

    setPopupShow("Edit Order");
  };

  const submitHandler = async () => {
    setDisabledBtn(true);
    try {
      const services = popUpData.services.map((service) => {
        let mappedService = {
          service_type_id: service.type,
          location: service.location || "",
          destination: service.destination || "",
          start_date: service.start_date || "",
          end_date: service.end_date || "",
        };

        if (service.serviceName === "Visa") {
          mappedService = {
            ...mappedService,
            visa_type: service.visa_type || "",
          };
        } else if (service.serviceName === "Hotel") {
          mappedService = {
            ...mappedService,
            hotel_name: service.hotel_name || "",
          };
        } else if (service.serviceName === "Invitation") {
          mappedService = {
            ...mappedService,
            invitation_type: service.invitation_type || "",
          };
        } else if (service.serviceName === "Insurance") {
          mappedService = {
            ...mappedService,
            insurance_provider: service.insurance_provider || "",
            zone: service.zone || "",
          };
        } else if (service.serviceName === "Baggage") {
          mappedService = {
            ...mappedService,
            baggage_type: service.baggage_type || "",
            baggage_weight: service.baggage_weight || "",
          };
        }

        return mappedService;
      });

      const payload = {
        _id: popUpData._id,
        customer_id: popUpData.customer_id || undefined,
        newCustomer: popUpData.customer_id
          ? undefined
          : {
              full_name: popUpData.full_name,
              phone_number: popUpData.phone_number,
              national_ID_number: popUpData.national_ID_number,
            },
        note: popUpData.note,
        payment_method: {
          bank_name: popUpData.payment_method.bank_name,
          account_number: popUpData.payment_method.bank_account_numbr,
        },
        status: "unpaid",
        passengers: popUpData.passengers || ["Default Passenger"],
        services,
        operator_id: popUpData.operator_id,
        company_id: company_id,
      };

      const endpoint = edit ? "/order/edit-order" : "/order/add-new-order";
      const res = await axios.post(endpoint, payload);

      clearPopUpData();
      getOrders();
      toast(res.data.message);
      setPopupShow(null);
      setEdit(false);
      setDisabledBtn(false);
    } catch (err) {
      toast(err.response?.data?.message || err.message);
      setDisabledBtn(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const res = await axios.post(`/order/delete-order`, {
        _id: orderId,
      });
      toast(res.data.message);
      getOrders();
    } catch (err) {
      toast(err.response?.data?.message || err.message);
    }
  };

  const addPassenger = () => {
    setPopUpData((prev) => ({
      ...prev,
      passengers: [...prev.passengers, popUpData.passenger],
    }));

    setPopUpData((prev) => ({
      ...prev,
      passenger: "",
    }));
  };

  const removePassenger = (index) => {
    const newValuesArray = popUpData.passengers.filter((_, i) => i !== index);
    setPopUpData((prev) => ({
      ...prev,
      passengers: newValuesArray,
    }));
  };

  const changeOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.post("/order/change-order-pay-status", {
        _id: orderId,
        status,
      });
      getOrders();
      toast(res.data.message);
    } catch (error) {
      toast.error("Error changing order status");
    }
  };

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        tableData={
          <Table
            ordersData={ordersData}
            th={th}
            mobile={mobile}
            mobileExpand={mobileExpand}
            setPopupShow={setPopupShow}
            setSelectedOrder={setSelectedOrder}
            deleteOrder={deleteOrder}
            editOrderHandler={editOrderHandler}
            changeOrderStatus={changeOrderStatus}
          />
        }
        tableHead={th}
        pageLabel={t("order")}
        dataLoading={isLoading}
        tableEmulator={false}
        mobile={mobile}
        tableHeader={1}
        tableFilter={true}
        tableFilterData={tableFilterData}
        setTableFilterOutcomingData={setTableFilterOutcomingData}
        tableFilterOutcomingData={tableFilterOutcomingData}
        paginationCurrent={pageNow}
        paginationTotal={pageAll}
        paginationEvent={(page) => setPageNow(page)}
        tableHeaderButtons={
          <Button
            label={t("addOrder")}
            size={"btn-lg"}
            type={"btn-primary"}
            element={"button"}
            svg={<AddSquareIcon />}
            onClick={() => setPopupShow("Add Order")}
          />
        }
      />
      {(popupShow === "Add Order" || popupShow === "Edit Order") && (
        <Popup
          label={popupShow}
          inputs={inputs}
          handlePopUpClose={() => {
            clearPopUpData();
            setPopupShow(null);
          }}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          customStyles={{ maxWidth: "95%", minWidth: "70%" }}
          popUpElement={
            <div className="popupElementContent">
              <ServiceTabs
                setPopUpData={setPopUpData}
                edit={edit}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                markedServices={markedServices}
                setMarkedServices={setMarkedServices}
                handleInputChange={handleInputChange}
                disabledBtn={disabledBtn}
                popUpData={popUpData}
                serviceTypes={serviceTypes}
              />
              <div className="pdf-inputs">
                {inputs.map((params, index) => (
                  <Input
                    key={index}
                    type={params.type}
                    label={params.title}
                    defaultData={params.options}
                    value={params.value || ""}
                    name={params.name}
                    customStyles={{ width: "100%" }}
                    selectHandler={(opt) => {
                      handleInputChange(opt, params);
                    }}
                    selectLabel={"select"}
                    placeholder={params.placeholder}
                    onChange={(e) => handleInputChange(e, params)}
                    editable={edit}
                    arrayTitle={params.arrayTitle}
                    handleAddValue={addPassenger}
                    handleDeleteValue={removePassenger}
                    valueArray={popUpData.passengers}
                    required={params.required}
                  />
                ))}
              </div>
              <div className="popup-buttons-wrapper">
                <Button
                  label={t("clearForm")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={clearPopUpData}
                  customStyles={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "0",
                    backgroundColor: "rgba(100, 95, 95, 0.571)",
                  }}
                  disabled={disabledBtn}
                />
                <Button
                  label={t("addOrder")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={submitHandler}
                  customStyles={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "0",
                    backgroundColor: "rgba(50, 205, 50, 0.7)",
                  }}
                  disabled={disabledBtn}
                />
              </div>
            </div>
          }
        />
      )}
      {popupShow === "Generate Invoice" && (
        <Popup
          label={"Generate Invoice"}
          customStyles={{ minWidth: "60%" }}
          handlePopUpClose={() => setPopupShow(false)}
          popUpElement={
            <InvoiceModal
              order={selectedOrder}
              setPopupShow={setPopupShow}
              popupShow={popupShow}
              bankAccounts={BANK_ACCOUNTS}
              setPopUpData={setPopUpData}
            />
          }
        />
      )}
      {popupShow === "More Info" && selectedOrder && (
        <Popup
          label={"Order Details"}
          customStyles={{ minWidth: "80%" }}
          handlePopUpClose={() => setPopupShow(null)}
          popUpElement={
            <OrderDetails
              order={selectedOrder}
              onClose={() => setPopupShow(null)}
            />
          }
        />
      )}
      {popupShow === "PDF" && (
        <Popup
          label={"Invoice"}
          handlePopUpClose={() => setPopupShow(null)}
          customStyles={{ width: "auto" }}
          popUpElement={
            <div className="invoice-popup-wrapper">
              <PdfFile popUpData={popUpData} />
            </div>
          }
        />
      )}
      <ToastContainer theme="dark" />
    </>
  );
};

export default Order;

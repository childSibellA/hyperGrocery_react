import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { useTableParameters } from "../../hooks/useTableParameters";
import useFetchOperators from "../../hooks/useFetchOperators";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { Popup } from "../../UI/Popup/Popup";
import CustomersTable from "./Table";
import { getCustomerInputs } from "./inputs";
import { AddSquareIcon } from "../../assets/svgs";
import { getOrderInputs } from "../Order/inputs";
import ServiceTabs from "../ServiceTabs/ServiceTabs";
import { useTranslation } from "react-i18next";
import CustomerDetail from "./CustomerDetails";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Customer.module.css";

const Customers = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const company_id = useSelector((state) => state.user.companyId);
  const user = useSelector((state) => state.user.user);

  const role = useSelector((state) => state.user.roles[0]);
  const { tableFilterData, th, mobile, mobileExpand } =
    useTableParameters("customer");
  const { operators } = useFetchOperators(company_id);

  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [edit, setEdit] = useState(false);
  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({
    selects: { statuses: "pending" },
  });
  const [popupShow, setPopupShow] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [customerData, setCustomerData] = useState({
    full_name: "",
    gender: "",
    national_ID_number: "",
    email_address: "",
    phone_number: {
      code: "+995",
      flag: "🇬🇪",
      number: "",
    },
    WDYAHAU: "",
    connection_dates: "",
    template_tour: "",
    note: "",
    allocator_id: user,
    operator_id: user,
    company_id: company_id,
    _id: "",
  });

  const inputs = getCustomerInputs(customerData, setCustomerData, operators, t);
  const user_id = useSelector((state) => state.user.user);

  const [activeTab, setActiveTab] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [markedServices, setMarkedServices] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
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

  const clearPopUpData = () => {
    setEdit(false);
    setDisabledBtn(false);
    setCustomerData({
      full_name: "",
      gender: "",
      national_ID_number: "",
      email_address: "",
      phone_number: {
        code: "+995",
        flag: "🇬🇪",
        number: "",
      },
      WDYAHAU: "",
      connection_dates: "",
      template_tour: "",
      note: "",
      allocator_id: "",
      operator_id: "",
      company_id: company_id,
      _id: "",
    });
    setActiveTab("");
    setPopupShow(null);
  };

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

  const getCustomersList = async (page, limit = 10) => {
    setIsLoading(true);
    if (role === "OPERATOR") {
      try {
        const res = await axios.post("/customer/get-all-users-customer", {
          company_id,
          user_id: user,
          tableFilterOutcomingData,
          page: pageNow,
        });

        if (res.data) {
          console.log(res?.data);
          setCustomersData(res?.data?.customers);
          setPageAll(res?.data?.totalPages);
          toast(res?.data?.error);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const res = await axios.post("/customer/get-all-customer", {
          company_id,
          tableFilterOutcomingData,
          page: pageNow,
          limit,
        });

        if (res.data) {
          setPageAll(res.data.totalPages);
          setCustomersData(res.data.customers);
          console.log(res.data.customers, "res.data.customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changeCustomerStatus = async (id, status) => {
    await axios
      .post("/customer/change-customer-status", { customerId: id, status })
      .then((res) => {
        getCustomersList();
        toast(res.data.message);
      });
  };

  const deleteCustomer = async (id) => {
    setIsLoading(true);
    await axios.post("/customer/delete-customer", { _id: id }).then((res) => {
      getCustomersList();
      toast(res?.data?.message);
    });
  };

  const CustomerHandler = async () => {
    setDisabledBtn(true);
    await axios
      .post(
        `${edit ? "/customer/edit-customer" : "/customer/add-new-customer"}`,
        customerData
      )
      .then((res) => {
        clearPopUpData();
        toast(res.data.message);
        setPopupShow(null);
        getCustomersList();
        setEdit(false);
        setDisabledBtn(false);
      })
      .catch((err) => {
        err.response.data.message && toast(err.response.data.message);
        err.message && toast(err.message);
        setDisabledBtn(false);
      });
  };

  const fillPopupDataHendler = async (item) => {
    setCustomerData({
      full_name: item.full_name || "",
      gender: item.gender || "",
      phone_number: item.phone_number || {},
      note: item.note || "",
      _id: item._id || "",
      national_ID_number: item.national_ID_number || "",
      email_address: item.email_address || "",
      WDYAHAU: item.WDYAHAU || "",
      connection_dates: item.connection_dates || "",
      template_tour: item.template_tour || "",
      allocator_id: item.allocator_id || "",
      operator_id: item.operator_id || "",
      company_id: company_id,
      userDetails: item.userDetails || {},
      createdAt: item.createdAt || "",
    });
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
    getCustomersList();
  }, [tableFilterOutcomingData, pageNow]);

  useEffect(() => {
    getCompanyBankAccounts();
    getServiceTypes();
  }, [pageNow]);

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
      toast(res.data.message);
      setPopupShow(null);
      setEdit(false);
      setDisabledBtn(false);
    } catch (err) {
      toast(err.response?.data?.message || err.message);
      setDisabledBtn(false);
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

  const toggleCustomerBotStatus = async (customerId, newStatus) => {
    try {
      const response = await axios.post("/customer/toggle-bot-status", {
        _id: customerId,
        bot_suspended: newStatus,
      });

      const updatedCustomer = response.data.customer;

      setCustomersData((prev) =>
        prev.map((customer) =>
          customer._id === customerId
            ? { ...customer, bot_suspended: updatedCustomer.bot_suspended }
            : customer
        )
      );

      toast.success(
        t("botConfig.successToggling", {
          status: updatedCustomer.bot_suspended
            ? t("botConfig.enabled")
            : t("botConfig.disabled"),
        })
      );
    } catch (error) {
      console.error("Error toggling bot status:", error);
      toast.error(t("botConfig.errorToggling"));
    }
  };

  const orderInputs = getOrderInputs(popUpData, setPopUpData, operators, t);

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        tableData={
          <CustomersTable
            customersData={customersData}
            th={th}
            mobile={mobile}
            mobileExpand={mobileExpand}
            fillPopupDataHendler={fillPopupDataHendler}
            deleteCustomer={deleteCustomer}
            changeCustomerStatus={changeCustomerStatus}
            setEdit={setEdit}
            setPopupShow={setPopupShow}
            setPopUpData={setPopUpData}
            toggleCustomerBotStatus={toggleCustomerBotStatus}
          />
        }
        tableHead={th}
        pageLabel={t("customers")}
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
            label={t("addCustomer")}
            size={"btn-lg"}
            type={"btn-primary"}
            element={"button"}
            svg={<AddSquareIcon />}
            onClick={() => setPopupShow("Add Customer")}
          />
        }
      />
      {(popupShow === "Add Customer" || popupShow === "Edit Customer") && (
        <Popup
          label={popupShow}
          inputs={inputs}
          handlePopUpClose={clearPopUpData}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          customStyles={{ minWidth: "60%" }}
          popUpElement={
            <>
              <div className="manual-inputs">
                {inputs?.map((params, index) => {
                  return (
                    <div className="exchange-input-wrapper" key={index}>
                      <Input
                        key={index}
                        type={params?.type}
                        label={params?.title}
                        defaultData={params?.options}
                        value={params.value || ""}
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
                        required={params.required}
                      />
                    </div>
                  );
                })}
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
                  }}
                  disabled={disabledBtn}
                />
                <Button
                  label={t("addCustomer")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={CustomerHandler}
                  customStyles={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "0",
                    backgroundColor: "rgba(50, 205, 50, 0.7)",
                  }}
                  disabled={disabledBtn}
                />
              </div>
            </>
          }
        />
      )}
      {popupShow === "Make Order" && (
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
            <div className={styles.ordersContent}>
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
                {orderInputs.map((params, index) => (
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
      {popupShow === "Customer Details" && (
        <Popup
          label={t("Customer Details")}
          handlePopUpClose={clearPopUpData}
          customStyles={{ width: "80%" }}
          popUpElement={<CustomerDetail data={customerData} />}
        />
      )}
      <ToastContainer theme="dark" />
    </>
  );
};

export default Customers;

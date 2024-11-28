import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFetchOperators from "../../hooks/useFetchOperators";
import { useTableParameters } from "../../hooks/useTableParameters";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Popup } from "../../UI/Popup/Popup";
import { Input } from "../../UI/Input/Input"; // Adjust the path as needed
import { Button } from "../../UI/Button/Button";
import PdfFile from "../PdfFolder/PdfFile";
import { getInvoiceInputs } from "./inputs";
import InvoiceTable from "./Table";
import { useTranslation } from "react-i18next";
import { AddSquareIcon } from "../../assets/svgs";
import ServiceTabs from "../ServiceTabs/ServiceTabs";

import "react-toastify/dist/ReactToastify.css";

const InvoiceList = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("invoice");

  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({
    selects: { statuses: "all" },
  });
  const [popupShow, setPopupShow] = useState("");
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [markedServices, setMarkedServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const company_id = useSelector((state) => state.user.companyId);
  const roles = useSelector((state) => state.user.roles[0]);
  const operator_id = useSelector((state) => state.user.user);
  const { operators } = useFetchOperators(company_id);

  const [popUpData, setPopUpData] = useState({
    _id: "",
    invoice_number: "",
    customer_id: {
      _id: "",
      full_name: "",
      national_ID_number: "",
      phone_number: {
        code: "+995",
        flag: "🇬🇪",
        number: "",
      },
      connection_dates: [],
    },
    discount: 0,
    operator_id: {
      _id: operator_id,
      username: "",
    },
    payment_method: {
      bank_name: "",
      account_number: "",
      _id: "",
    },
    passengers: [],
    services: [],
    status: "",
    total_price: 0,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const BANK_ACCOUNTS = bankAccounts.map((account) => ({
    name: account.bank_name,
    value: {
      bank_name: account.bank_name,
      bank_account_numbr: account.account_number,
    },
  }));

  const inputs = getInvoiceInputs(
    popUpData,
    setPopUpData,
    operators,
    BANK_ACCOUNTS,
    t
  );

  const clearPopUpData = () => {
    setPopUpData({
      _id: "",
      invoice_number: "",
      customer_id: {
        _id: "",
        full_name: "",
        national_ID_number: "",
        phone_number: {
          code: "+995",
          flag: "🇬🇪",
          number: "",
        },
        connection_dates: [],
      },
      discount: 0,
      operator_id: {
        _id: "",
        username: "",
      },
      payment_method: {
        bank_name: "",
        account_number: "",
        _id: "",
      },
      passengers: [],
      services: [],
      status: "",
      total_price: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0,
    });
    setPopupShow("");
    setActiveTab("");
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
    getCompanyBankAccounts();
    getServiceTypes();
  }, []);

  const getInvoicesList = async (limit = 20) => {
    setIsLoading(true);
    if (roles === "OPERATOR") {
      try {
        const res = await axios.post("/invoice/get-invoices-by-users", {
          operator_id: operator_id,
          tableFilterOutcomingData,
          page: pageNow,
          limit,
        });

        if (res.data) {
          setPageAll(res.data.totalPages);
          setInvoiceData(res.data.invoices);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const res = await axios.post("/invoice/get-all-invoice", {
          company_id,
          tableFilterOutcomingData,
          page: pageNow,
          limit,
        });

        if (res.data) {
          setPageAll(res.data.totalPages);
          setInvoiceData(res.data.invoices);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        toast.error("Error fetching invoices");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changeInvoicestatus = async (id, status) => {
    try {
      const res = await axios.post("/invoice/change-invoice-pay-status", {
        invoiceId: id,
        status,
      });
      getInvoicesList();
      toast(res.data.message);
    } catch (error) {
      toast.error("Error changing invoice status");
    }
  };

  const fillPopupDataHandler = (item) => {
    setPopUpData({
      _id: item._id || "",
      invoice_number: item.invoice_number || "",

      customer_id: {
        _id: item.customer_id?._id || "",
        full_name: item.customer_id?.full_name || "",
        national_ID_number: item.customer_id?.national_ID_number || "",
        phone_number: item.customer_id?.phone_number || {
          code: "+995",
          flag: "🇬🇪",
          number: "",
        },
        connection_dates: item.customer_id?.connection_dates || [],
      },
      discount: item.discount || 0,
      operator_id: {
        _id: item.operator_id?._id || "",
        username: item.operator_id?.username || "",
      },
      payment_method: {
        bank_name: item.payment_method?.bank_name || "",
        account_number: item.payment_method?.account_number || "",
        _id: item.payment_method?._id || "",
      },
      passengers: item.passengers || [],
      services: item.services || [],
      status: item.status || "",
      total_price: item.total_price || 0,
      createdAt: item.createdAt || "",
      updatedAt: item.updatedAt || "",
      __v: item.__v || 0,
    });
  };

  useEffect(() => {
    getInvoicesList();
  }, [tableFilterOutcomingData, pageNow]);

  useEffect(() => {
    setPageNow(1);
  }, [tableFilterOutcomingData]);

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

  const deleteInvoice = async (id) => {
    try {
      const res = await axios.post("/invoice/delete-invoice", { id });
      toast(res.data.message);
      getInvoicesList();
    } catch (error) {
      toast.error("Error deleting invoice");
    }
  };

  const submitHandler = async () => {
    setDisabledBtn(true);
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

    const invoiceData = {
      customerId: "",
      companyId: company_id,
      operatorId: popUpData.operator_id,
      status: popUpData.status || "unpaid",
      paymentMethod: popUpData.payment_method,
      passengers: popUpData.passengers || [],
      invoiceServices: services,
      discount: popUpData.discount || 0,
      totalPrice: popUpData.total_price || 0,
      newCustomer: {
        full_name: popUpData.customer_id.full_name,
        national_ID_number: popUpData.customer_id.national_ID_number,
        phone_number: popUpData.customer_id.phone_number.number,
      },
    };

    try {
      const res = await axios.post("/invoice/add-new-invoice", invoiceData);

      if (res.status === 200) {
        toast.success(res.data.message);
        clearPopUpData();
        getInvoicesList();
        setDisabledBtn(false);
      } else {
        throw new Error("Failed to submit invoice");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setDisabledBtn(false);
    }
  };

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        searchLabel={"Search"}
        tableData={
          <InvoiceTable
            invoiceData={invoiceData}
            mobile={mobile}
            th={th}
            mobileExpand={mobileExpand}
            setPopupShow={setPopupShow}
            fillPopupDataHandler={fillPopupDataHandler}
            changeInvoicestatus={changeInvoicestatus}
            deleteInvoice={deleteInvoice}
          />
        }
        pageLabel={t("invoices")}
        dataLoading={isLoading}
        tableEmulator={false}
        tableHead={th}
        mobile={mobile}
        tableHeader={1}
        tableFilter={true}
        tableSearchSelect={true}
        tableFilterData={tableFilterData}
        setTableFilterOutcomingData={setTableFilterOutcomingData}
        tableFilterOutcomingData={tableFilterOutcomingData}
        paginationCurrent={pageNow}
        paginationTotal={pageAll}
        paginationEvent={(page) => setPageNow(page)}
        tableHeaderButtons={
          <Button
            label={t("moreButton.generateInvoice")}
            size={"btn-lg"}
            type={"btn-primary"}
            element={"button"}
            svg={<AddSquareIcon />}
            onClick={() => setPopupShow("Make Invoice")}
          />
        }
      />
      {popupShow === "Make Invoice" && (
        <Popup
          label={popupShow}
          inputs={inputs}
          handlePopUpClose={clearPopUpData}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          customStyles={{ width: "80%" }}
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
                  <div className="exchange-input-wrapper" key={index}>
                    <Input
                      type={params.type}
                      label={params.title}
                      defaultData={params.options}
                      value={params.value || ""}
                      name={params.name}
                      customStyles={{ width: "100%" }}
                      selectHandler={(opt) => handleInputChange(opt, params)}
                      selectLabel={"select"}
                      placeholder={params.placeholder}
                      onChange={(e) => handleInputChange(e, params)}
                      customInputStyles={{
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                      editable={edit}
                      required={params.required}
                    />
                  </div>
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
                  label={t("moreButton.generateInvoice")}
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
      {popupShow === "PDF" && (
        <Popup
          label={"Invoice"}
          handlePopUpClose={clearPopUpData}
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

export default InvoiceList;

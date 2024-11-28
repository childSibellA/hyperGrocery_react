import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useTableParameters } from "../../hooks/useTableParameters";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { Popup } from "../../UI/Popup/Popup";
import { AddSquareIcon } from "../../assets/svgs";
import { useTranslation } from "react-i18next";
import { getServiceInputs } from "./inputs";
import ServiceItemsTable from "./Table";

import "react-toastify/dist/ReactToastify.css";
import ServiceDetailsTable from "./ServiceDetails";

const ServiceItem = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("serviceitem");

  const company_id = useSelector((state) => state.user.companyId);
  const role = useSelector((state) => state.user.roles[0]);
  const operator_id = useSelector((state) => state.user.user);

  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [edit, setEdit] = useState(false);
  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({
    selects: { statuses: "pending" },
  });
  const [popupShow, setPopupShow] = useState("");
  const [serviceCompanies, setServiceCompanys] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [popUpData, setPopUpData] = useState({
    _id: "",
    start_date: "",
    end_date: "",
    location: "",
    destination: "",
    invoice_pdf: "",
    amount: 0,
    document: "",
    service_type_id: "",
    service_company_id: "",
    company_id: company_id,
    operator_id: operator_id,
  });

  const clearPopUpData = () => {
    setEdit(false);
    setDisabledBtn(false);
    setPopUpData({
      _id: "",
      start_date: "",
      end_date: "",
      location: "",
      destination: "",
      invoice_pdf: "",
      amount: 0,
      document: "",
      service_type_id: "",
      service_company_id: "",
      company_id: company_id,
      operator_id: operator_id,
    });
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

  const getTableData = async (page, limit = 20) => {
    setIsLoading(true);
    if (role == "OPERATOR") {
      try {
        const res = await axios.post(
          "/service-item/get-all-service-by-operator",
          {
            operator_id,
            tableFilterOutcomingData,
            page: pageNow, // Pass page parameter
            limit, // Pass limit parameter
          }
        );

        if (res.data) {
          console.log(res.data, "data");
          setPageAll(res.data.totalPages);
          setData(res.data.serviceItems);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const res = await axios.post("/service-item/get-all-service", {
          company_id,
          tableFilterOutcomingData,
          page: pageNow, // Pass page parameter
          limit, // Pass limit parameter
        });

        if (res.data) {
          setPageAll(res.data.totalPages);
          setData(res.data.serviceItems);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteHandler = async (item) => {
    const { _id } = item;
    setIsLoading(true);
    await axios
      .post("/service-item/delete-service-item", { _id })
      .then((res) => {
        getTableData();
        toast(res?.data?.message);
      });
  };

  const hendlerSubmit = async () => {
    await axios
      .post(
        `${edit ? "/service-item/edit-service" : "/service-item/add-new-service"}`,
        popUpData
      )
      .then((res) => {
        clearPopUpData();
        toast(res.data.message);
        setPopupShow(null);
        getTableData();
        setEdit(false);
      })
      .catch((err) => {
        err.response.data.message && toast(err.response.data.message);
        err.message && toast(err.message);
      });
  };

  const getServiceCompanys = async () => {
    const transformData = (data) => {
      return data?.map((item) => ({
        name: item.name,
        value: item._id,
      }));
    };
    try {
      const res = await axios.post(
        "/service-company/get-all-service-companies-by-company",
        {
          company_id,
        }
      );

      setServiceCompanys(transformData(res.data.serviceCompanies));
    } catch (err) {
      toast(err.response?.data?.message || err.message);
    }
  };

  const getServiceType = async () => {
    const transformData = (data) => {
      return data?.map((item) => ({
        name: item.name,
        value: item._id,
      }));
    };
    try {
      const res = await axios.post("/service-type/get-all-service-types", {
        company_id,
      });
      setServiceTypes(transformData(res.data.serviceTypes));
    } catch (err) {
      toast(err.response?.data?.message || err.message);
    }
  };

  const fillPopupDataHandler = async (item) => {
    setPopUpData({
      start_date: item.start_date || "",
      end_date: item.end_date || "",
      location: item.location || "",
      destination: item.destination || "",
      invoice_pdf: item.invoice_pdf || "",
      amount: item.amount || 0,
      document: item.document || "",
      service_type_id: item?.service_type_id?._id || "",
      service_company_id: item?.service_company_id?._id || "",
      company_id: company_id || "",
      _id: item._id || "",
    });
  };

  useEffect(() => {
    getTableData();
    getServiceCompanys();
    getServiceType();
  }, [tableFilterOutcomingData, pageNow]);

  useEffect(() => {
    setPageNow(1);
  }, [tableFilterOutcomingData]);

  const inputs = getServiceInputs(
    popUpData,
    setPopUpData,
    serviceCompanies,
    serviceTypes,
    t
  );

  const changeServiceStatus = async (serviceId, performance_status) => {
    try {
      const res = await axios.post("/service-item/change-service-status", {
        serviceItemId: serviceId,
        performance_status,
      });
      getTableData();
      toast(res.data.message);
    } catch (error) {
      toast.error("Error changing service status");
    }
  };

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        tableData={
          <ServiceItemsTable
            data={data}
            th={th}
            mobile={mobile}
            mobileExpand={mobileExpand}
            setEdit={setEdit}
            setPopupShow={setPopupShow}
            fillPopupDataHandler={fillPopupDataHandler}
            deleteHandler={deleteHandler}
            setSelectedService={setSelectedService}
            changeServiceStatus={changeServiceStatus}
          />
        }
        pageLabel={t("services")}
        dataLoading={isLoading}
        tableEmulator={false}
        tableHead={th}
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
          <>
            <Button
              label={t("addService")}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              svg={<AddSquareIcon />}
              onClick={() => setPopupShow("Add Service")}
            />
          </>
        }
      />
      {(popupShow === "Add Service" || popupShow === "Edit Service") && (
        <Popup
          label={t("addService")}
          inputs={inputs}
          handlePopUpClose={() => {
            setPopupShow(null);
            clearPopUpData();
          }}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          customStyles={{ minWidth: "80%" }}
          // description={"rame"}
          popUpElement={
            <div className="popupElementContent">
              <div className="pdf-inputs">
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
                        required={params?.required}
                        editable={edit}
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
                    backgroundColor: "rgba(100, 95, 95, 0.571)",
                  }}
                  disabled={disabledBtn}
                />
                <Button
                  label={t("addService")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={hendlerSubmit}
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
      {popupShow === "More Info" && (
        <Popup
          label={t("Service Details")}
          handlePopUpClose={() => {
            setPopupShow(null);
          }}
          customStyles={{ width: "80%" }}
          popUpElement={<ServiceDetailsTable data={selectedService} />}
        />
      )}
      <ToastContainer theme="dark" />
    </>
  );
};

export default ServiceItem;

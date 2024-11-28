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
import { serviceCompanyInputs } from "./inputs";
import ServiceCompanyTable from "./Table";
import { useTranslation } from "react-i18next";

import "react-toastify/dist/ReactToastify.css";

const ServiceCompany = () => {
  const axios = useAxiosPrivate();
  const { t } = useTranslation();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("servicecompany");
  const company_id = useSelector((state) => state.user.companyId);
  const user = useSelector((state) => state.user.user);

  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [edit, setEdit] = useState(false);
  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({});
  const [popupShow, setPopupShow] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [exCategory, setExCategory] = useState([]);
  const [popUpData, setPopUpData] = useState({
    _id: "",
    company_id: company_id,
    user_id: user,
    service_type_id: "",
    name: "",
    bank_name: "",
    bank_account_numbr: "",
    additional_information: "",
  });

  const inputs = serviceCompanyInputs(popUpData, setPopUpData, exCategory);

  const clearPopUpData = () => {
    setDisabledBtn(false);
    setPopUpData({
      _id: "",
      company_id: company_id,
      user_id: user,
      service_type_id: "",
      name: "",
      bank_name: "",
      bank_account_numbr: "",
      additional_information: "",
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

  const getExpenseList = async (page, limit = 20) => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        "/service-company/get-all-service-companies-by-company",
        {
          company_id,
          tableFilterOutcomingData,
          page: pageNow, // Pass page parameter
          limit, // Pass limit parameter
        }
      );

      if (res.data) {
        // setPageAll(res.data.totalPages);
        setData(res.data.serviceCompanies);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpense = async (item) => {
    const { _id } = item;
    setIsLoading(true);
    await axios
      .post("/service-company/delete-service-company", { _id })
      .then((res) => {
        getExpenseList();
        toast(res?.data?.message);
      });
  };

  async function getCategorys() {
    const transformData = (data) => {
      return data.map((item) => ({
        name: item.name,
        value: item._id,
      }));
    };
    await axios
      .post("/service-type/get-all-service-types", {
        company_id,
      })
      .then((res) => {
        setExCategory(transformData(res.data.serviceTypes));
      });
  }

  const confirmHamdler = async () => {
    setDisabledBtn(true);
    await axios
      .post(
        `${edit ? "/service-company/edit-service-company" : "/service-company/add-service-company"}`,
        popUpData
      )
      .then((res) => {
        clearPopUpData();
        toast(res.data.message);
        setPopupShow(null);
        getExpenseList();
        setEdit(false);
      })
      .catch((err) => {
        err.response.data.message && toast(err.response.data.message);
        err.message && toast(err.message);
      });
  };

  const fillPopupDataHandler = async (item) => {
    setPopUpData({
      _id: item._id || "",
      company_id: company_id || "",
      user_id: user || "",
      service_type_id: item.service_type_id._id || "",
      name: item.name || "",
      bank_account_numbr: item.payment_method.account_number || "",
      bank_name: item.payment_method.bank_name || "",
      additional_information: item.additional_information || "",
    });
  };

  useEffect(() => {
    getCategorys();
  }, []);

  useEffect(() => {
    getExpenseList();
  }, [tableFilterOutcomingData, pageNow]);

  useEffect(() => {
    setPageNow(1);
  }, [tableFilterOutcomingData]);

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        tableData={
          <ServiceCompanyTable
            data={data}
            th={th}
            mobile={mobile}
            mobileExpand={mobileExpand}
            mobileExpandFunc={mobileExpandFunc}
            setEdit={setEdit}
            deleteExpense={deleteExpense}
            fillPopupDataHandler={fillPopupDataHandler}
            setPopupShow={setPopupShow}
          />
        }
        pageLabel={t("serviceCompanies")}
        dataLoading={isLoading}
        tableEmulator={false}
        tableHead={th}
        mobile={mobile}
        tableHeader={1}
        tableFilter={false}
        tableFilterData={tableFilterData}
        setTableFilterOutcomingData={setTableFilterOutcomingData}
        paginationCurrent={pageNow}
        paginationTotal={pageAll}
        paginationEvent={(page) => setPageNow(page)}
        tableHeaderButtons={
          <>
            <Button
              label={t("addServiceCompany")}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              svg={<AddSquareIcon />}
              onClick={() => setPopupShow("Add Service Company")}
            />
          </>
        }
      />
      {popupShow && (
        <Popup
          label={popupShow}
          inputs={inputs}
          handlePopUpClose={() => {
            setPopupShow(null);
            clearPopUpData();
          }}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          customStyles={{ minWidth: "60%" }}
          // description={"rame"}
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
                        value={params.value}
                        name={params.name}
                        customStyles={{ width: "100%" }}
                        selectHandler={(opt) => {
                          handleInputChange(opt, params);
                        }}
                        selectLabel={"select"}
                        placeholder={params?.placeholder}
                        onChange={(e) => handleInputChange(e, params)}
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
                  label={t("addServiceCompany")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={confirmHamdler}
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

      <ToastContainer theme="dark" />
    </>
  );
};

export default ServiceCompany;

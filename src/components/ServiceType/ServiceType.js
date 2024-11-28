import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useTableParameters } from "../../hooks/useTableParameters";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import { Popup } from "../../UI/Popup/Popup";
import { EditIcon, DeleteIcon, AddSquareIcon } from "../../assets/svgs";
import { useTranslation } from "react-i18next";

import "react-toastify/dist/ReactToastify.css";

const ServiceType = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { tableFilterData, th, mobile, mobileExpand } =
    useTableParameters("servicetype");
  const company_id = useSelector((state) => state.user.companyId);

  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [edit, setEdit] = useState(false);
  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({});
  const [popupShow, setPopupShow] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const [popUpData, setPopUpData] = useState({
    name: "",
    company_id: company_id,
    _id: "",
  });

  const inputs = [
    {
      title: "Name",
      name: "name",
      type: "default",
      placeholder: "Name",
      value: popUpData.name,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
  ];

  const clearPopUpData = () => {
    setDisabledBtn(false);
    setPopUpData({
      name: "",
      company_id: company_id,
      _id: "",
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

  const getData = async (page, limit = 20) => {
    setIsLoading(true);

    try {
      const res = await axios.post("/service-type/get-all-service-types", {
        company_id,
        tableFilterOutcomingData,
        page: pageNow, // Pass page parameter
        limit, // Pass limit parameter
      });

      if (res.data) {
        // setPageAll(res.data.totalPages);
        setData(res.data.serviceTypes);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandler = async (item) => {
    const { _id } = item;
    setIsLoading(true);
    await axios
      .post("/service-type/delete-service-type", { _id })
      .then((res) => {
        getData();
        toast(res?.data?.message);
      });
  };

  const submitHandler = async () => {
    setDisabledBtn(true);
    await axios
      .post(
        `${edit ? "/service-type/edit-service-type" : "/service-type/add-service-type"}`,
        popUpData
      )
      .then((res) => {
        clearPopUpData();
        toast(res.data.message);
        setPopupShow(null);
        getData();
        setEdit(false);
      })
      .catch((err) => {
        err.response.data.message && toast(err.response.data.message);
        err.message && toast(err.message);
      });
  };

  const fillPopupDataHandler = async (item) => {
    setPopUpData({
      name: item.name || "",
      _id: item._id || "",
    });
  };

  useEffect(() => {
    getData();
  }, [tableFilterOutcomingData, pageNow]);

  useEffect(() => {
    setPageNow(1);
  }, [tableFilterOutcomingData]);

  let tableData;
  tableData = data?.map((item, index) => {
    let dropdownData = [
      {
        id: 0,
        list: [
          {
            title: "Edit",
            onClick: () => {
              setPopupShow("Edit Customer");
              setEdit(true);
              fillPopupDataHandler(item);
            },
            svg: <EditIcon />,
          },
        ],
      },
      {
        id: 1,
        list: [
          {
            title: "Delete",
            onClick: () => {
              deleteHandler(item);
            },
            svg: <DeleteIcon />,
          },
        ],
      },
    ];

    return (
      <div
        key={index}
        className={`table-parent ${mobileExpand === index ? "active" : ""}`}
      >
        <div className="table">
          <div
            className={`td ${th[0].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}
          >
            <span>{item?.name}</span>
          </div>
          <div
            className={`td ${th[1].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[1].mobileWidth : th[1].width}%` }}
          >
            {/* <span>{item?.logo}</span> */}
          </div>
          <div
            className={`td ${th[2].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[2].mobileWidth : th[2].width}%` }}
          >
            <MoreButton dropdownData={dropdownData} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        tableData={tableData}
        pageLabel={t("serviceTypes")}
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
              label={t("addServiceType")}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              svg={<AddSquareIcon />}
              onClick={() => setPopupShow("Add Service Type")}
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
            <div className="manual-inputs">
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
              <div>
                <Button
                  label={t("addServiceType")}
                  size={"btn-lg"}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={submitHandler}
                  customStyles={{ width: "100%", height: "60px" }}
                  disabled={disabledBtn}
                />
              </div>
            </div>
          }
        />
      )}
      <ToastContainer theme="dark" />
    </>
  );
};

export default ServiceType;

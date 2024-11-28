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
import { useTranslation } from "react-i18next";

import { EditIcon, DeleteIcon, AddSquareIcon } from "../../assets/svgs";

import "react-toastify/dist/ReactToastify.css";

const ExpenseCategory = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("expensecategory");
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
    name: "",
    description: "",
    company_id: company_id,
    user_id: user,
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
    {
      title: "Description",
      name: "description",
      type: "default",
      placeholder: "Description",
      value: popUpData.description,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
  ];

  const clearPopUpData = () => {
    setEdit(false);
    setDisabledBtn(false);
    setPopUpData({
      name: "",
      description: "",
      company_id: company_id,
      user_id: user,
      _id: "",
    });
  };

  const handleInputChange = (e, params) => {
    console.log(popUpData);
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
        "/expense-category/get-all-expense-categories",
        {
          company_id,
          tableFilterOutcomingData,
          page: pageNow, // Pass page parameter
          limit, // Pass limit parameter
        }
      );

      if (res.data) {
        console.log(res.data);
        // setPageAll(res.data.totalPages);
        setData(res.data.expenseCategories);
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
      .post("/expense-category/delete-expense-category", { _id })
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
      .post("/expense-category/get-all-expense-categories", { company_id })
      .then((res) => {
        setExCategory(transformData(res.data.expenseCategories));
      });
  }

  const expenseHandler = async () => {
    setDisabledBtn(true);
    await axios
      .post(
        `${edit ? "/expense-category/edit-expense-category" : "/expense-category/add-new-expense-category"}`,
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
      description: item.description || "",
      name: item.name || "",
      company_id: company_id,
      user_id: user,
      _id: item._id || "",
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

  let tableData;
  tableData = data?.map((item, index) => {
    let dropdownData = [
      {
        id: 0,
        list: [
          {
            title: "Edit",
            onClick: () => {
              setPopupShow("Edit Expense Category");
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
              deleteExpense(item);
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
            <span>{item?.description}</span>
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
        pageLabel={t("expenceCategory")}
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
              label={t("addExpenceCategory")}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              svg={<AddSquareIcon />}
              onClick={() => setPopupShow("Add Expense Category")}
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
                  label={t("addExpenceCategory")}
                  size={"btn-lg"}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={expenseHandler}
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

export default ExpenseCategory;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useTableParameters } from "../../hooks/useTableParameters";
import { TimestampConverter } from "../../Utils/TimestampConverter";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { MoreButton } from "../../UI/MoreButton/MoreButton";
import { Popup } from "../../UI/Popup/Popup";
import { EditIcon, DeleteIcon, AddSquareIcon } from "../../assets/svgs";
import { useTranslation } from "react-i18next";

import "react-toastify/dist/ReactToastify.css";

const Expense = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { tableFilterData, th, mobile, mobileExpand, mobileExpandFunc } =
    useTableParameters("expense");
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
    description: "",
    document: "",
    amount: 0,
    category: "",
    bank_name: "",
    bank_account_numbr: "",
    company_id: company_id,
    user_id: user,
    _id: "",
  });

  const inputs = [
    {
      title: "Category",
      name: "category",
      type: "lable-input-select",
      options: exCategory,
      defaultAny: "Select",
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
    {
      title: "Document",
      name: "document",
      type: "default",
      placeholder: "Document",
      value: popUpData.document,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Bank Name",
      name: "bank_name",
      type: "default",
      placeholder: "Bank Name",
      value: popUpData.bank_name,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Bank Account Number",
      name: "bank_account_numbr",
      type: "default",
      placeholder: "Bank Account Number",
      value: popUpData.bank_account_numbr,
      onChange: (e) =>
        setPopUpData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        })),
    },
    {
      title: "Amount",
      name: "amount",
      type: "number",
      placeholder: "Amount",
      value: popUpData.amount,
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
      description: "",
      document: "",
      amount: 0,
      category: "",
      bank_name: "",
      bank_account_numbr: "",
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
      const res = await axios.post("/expense/get-all-expense", {
        company_id,
        tableFilterOutcomingData,
        page: pageNow, // Pass page parameter
        limit, // Pass limit parameter
      });

      if (res.data) {
        console.log(res.data);
        setPageAll(res.data.totalPages);
        setData(res.data.expenses);
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
    await axios.post("/expense/delete-expense", { _id }).then((res) => {
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
        `${edit ? "/expense/edit-expense" : "/expense/add-new-expense"}`,
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
    console.log(item);
    setPopUpData({
      description: item.description || "",
      document: item.document || "",
      amount: item.amount || 0,
      category: item.category._id || "",
      bank_name: item.payment_method.method,
      bank_account_numbr: item.payment_method.details,
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
            title: t("moreButton.edit"),
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
            title: t("moreButton.delete"),
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
            <span>{item?.category?.name}</span>
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
            <span>{item?.document}</span>
          </div>
          <div
            className={`td ${th[3].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[3].mobileWidth : th[3].width}%` }}
          >
            <span>{item?.payment_method?.details}</span>
          </div>
          <div
            className={`td ${th[4].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
          >
            <span>{item?.amount}</span>
          </div>
          <div
            className={`td ${th[5].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[5].mobileWidth : th[5].width}%` }}
          >
            <span>{TimestampConverter(item?.createdAt, false)}</span>
          </div>
          <div
            className={`td ${th[6].mobileWidth ? true : false}`}
            style={{ width: `${mobile ? th[6].mobileWidth : th[6].width}%` }}
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
        pageLabel={t("expences")}
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
              label={t("addExpences")}
              size={"btn-lg"}
              type={"btn-primary"}
              element={"button"}
              svg={<AddSquareIcon />}
              onClick={() => setPopupShow("Add Expense")}
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
                        value={params?.value || ""}
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
              <div style={{ display: "Flex", width: "100%" }}>
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
                  label={t("addExpences")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={expenseHandler}
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

export default Expense;

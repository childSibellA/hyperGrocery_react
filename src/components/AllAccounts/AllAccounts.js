import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useTableParameters } from "../../hooks/useTableParameters";
import { AdminPanel } from "../../UI/AdminPanel/AdminPanel";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { HelpText } from "../../UI/HelpText/HelpText";
import { Switches } from "../../UI/Switches/Switches";
import { Popup } from "../../UI/Popup/Popup";
import { useTranslation } from "react-i18next";
import { AddSquareIcon } from "../../assets/svgs";
import { useValidation } from "../../hooks/useValidation";
import Table from "./Table";

import "react-toastify/dist/ReactToastify.css";

const AllAccounts = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const company_id = useSelector((state) => state.user.companyId);
  const { th, mobile, mobileExpand } = useTableParameters("users");
  const [tableFilterOutcomingData, setTableFilterOutcomingData] = useState({});
  const [popUpActive, setPopUpActive] = useState("");
  const [addAdminError, setAddAdminError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [edit, setEdit] = useState(false);
  const [editPasscode, setEditPasscode] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [td, setTd] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [pageAll, setPageAll] = useState(1);
  const [popUpData, setPopUpData] = useState({
    roles: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: { code: "+995", flag: "🇬🇪", number: "" },
    company_id: company_id,
    _id: "",
  });

  const addAdminSelect = {
    name: t("registrationInputTitles.roles"),
    value: "roles",
    options: [
      { name: "Operator", value: "OPERATOR" },
      { name: "SuperAdmin", value: "SUPER_ADMIN" },
    ],
  };

  const helpTexts = {
    email: {
      validationType: "email",
      success: t("validations.emailValid"),
      failure: t("validations.emailInvalid"),
    },
    password: {
      validationType: "password",
      success: t("validations.passwordValid"),
      failure: t("validations.passwordInvalid"),
    },
  };

  const formErrors = useValidation(
    {
      email: popUpData.email,
      password: popUpData.password,
    },
    helpTexts
  );

  const isPasswordMatch =
    popUpData.password &&
    popUpData.confirmPassword &&
    popUpData.password === popUpData.confirmPassword;

  const arePasswordsEmpty =
    popUpData.password === "" && popUpData.confirmPassword === "";

  const isFormValid = useMemo(() => {
    const hasNoErrors = !Object.keys(formErrors).some(
      (key) => formErrors[key].failure
    );
    return (
      hasNoErrors &&
      popUpData.password &&
      popUpData.confirmPassword &&
      isPasswordMatch
    );
  }, [
    formErrors,
    popUpData.password,
    popUpData.confirmPassword,
    isPasswordMatch,
  ]);

  const handleFieldTouch = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  // Fetch data for the table
  async function getData(page = 1, limit = 5) {
    setIsLoading(true);
    try {
      const res = await axios.post("/users/get-all-users", {
        company_id,
        page: pageNow,
        limit,
      });
      setTd(res?.data?.users);
      setPageAll(res?.data?.totalPages);
      setPageNow(res?.data?.currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Clear data for the popup
  const clearForm = () => {
    setPopUpData({
      roles: "",
      username: "",
      phone_number: { code: "+995", flag: "🇬🇪", number: "" },
      email: "",
      password: "",
      confirmPassword: "",
      company_id: company_id,
    });
    setTouchedFields({
      email: false,
      password: false,
      confirmPassword: false,
    });
    setAddAdminError("");
    setEditPasscode(false);
  };

  // Delete user functionality
  const deleteUser = async (_id) => {
    try {
      await axios.post("/users/delete-user", { userId: _id });
      getData();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Edit user functionality
  const editUser = async (email, roles, username, _id) => {
    setPopUpData({
      email,
      username,
      password: "",
      confirmPassword: "",
      roles: roles[0],
    });
    setAdminId(_id);
    setEdit(true);
    setPopUpActive("Edit User");
  };

  useEffect(() => {
    getData();
  }, [tableFilterOutcomingData, pageNow]);

  const handlePopUpInputChange = (e, name) => {
    setPopUpData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
    handleFieldTouch(name);
  };

  const handlePopUpSelectChange = (opt, name) => {
    setPopUpData((prevData) => ({
      ...prevData,
      [name]: opt,
    }));
  };

  const handleAddAdminBtnClick = async () => {
    setAddAdminError("");
    if (!isFormValid) {
      toast.error(t("validations.formInvalid"));
      return;
    }

    try {
      await axios.post(`${!edit ? "/auth/register" : "/users/edit-user"}`, {
        email: popUpData.email,
        username: popUpData.username,
        password: popUpData.confirmPassword,
        roles: [popUpData.roles],
        userId: adminId,
        company_id: popUpData.company_id,
      });
      getData();
      toast.success("Admin saved successfully");
      clearForm();
      setPopUpActive(false);
    } catch (err) {
      console.error("Error saving admin:", err);
      toast.error(t("registrationError"));
    }
  };

  return (
    <>
      <AdminPanel
        adminPage={"table"}
        tableData={
          <Table
            td={td}
            th={th}
            mobile={mobile}
            mobileExpand={mobileExpand}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        }
        dataLoading={isLoading}
        tableHead={th}
        mobile={mobile}
        pageLabel={t("accounts")}
        tableHeaderButtons={
          <Button
            label={t("registration")}
            size={"btn-lg"}
            type={"btn-primary"}
            element={"button"}
            svg={<AddSquareIcon />}
            onClick={() => setPopUpActive("Add User")}
          />
        }
        tableFilter={false}
        setTableFilterOutcomingData={setTableFilterOutcomingData}
        paginationCurrent={pageNow}
        paginationTotal={pageAll}
        paginationEvent={(page) => setPageNow(page)}
      />

      {popUpActive && (
        <Popup
          label={popUpActive}
          handlePopUpClose={() => {
            setPopUpActive(false);
            clearForm();
            setEdit(false);
          }}
          popUpElement={
            <>
              <div className="addAdmin-container">
                <Input
                  type={"lable-input-select"}
                  label={addAdminSelect.name}
                  defaultData={addAdminSelect.options}
                  value={popUpData?.roles}
                  selectHandler={(opt) => handlePopUpSelectChange(opt, "roles")}
                  selectLabel={`${t("all")} ${addAdminSelect.name}`}
                  required={true}
                />
                <Input
                  type={"default"}
                  label={t("registrationInputTitles.username")}
                  placeholder={t("registrationInputTitles.username")}
                  value={popUpData?.username}
                  onChange={(e) => handlePopUpInputChange(e, "username")}
                  required={true}
                  statusCard={
                    addAdminError && (
                      <HelpText
                        status={"error"}
                        title={addAdminError}
                        fontSize={"font-12"}
                        icon={true}
                      />
                    )
                  }
                />
                <Input
                  type={"default"}
                  label={t("registrationInputTitles.email")}
                  placeholder={t("registrationInputTitles.email")}
                  value={popUpData?.email}
                  autoComplete={"email"}
                  onChange={(e) => handlePopUpInputChange(e, "email")}
                  required={true}
                  statusCard={
                    touchedFields.email &&
                    formErrors.email?.failure && (
                      <HelpText
                        status={"error"}
                        title={formErrors.email?.failure}
                        fontSize={"font-12"}
                        icon={true}
                      />
                    )
                  }
                />

                {edit && (
                  <Switches
                    label={t("registrationInputTitles.changePassword")}
                    onChange={() => setEditPasscode(!editPasscode)}
                  />
                )}

                {(!edit || editPasscode) && (
                  <>
                    <Input
                      type={"default"}
                      label={t("registrationInputTitles.password")}
                      inputType={"password"}
                      placeholder={t("registrationInputTitles.password")}
                      value={popUpData?.password}
                      autoComplete={"new-password"}
                      onChange={(e) => handlePopUpInputChange(e, "password")}
                      required={true}
                      statusCard={
                        touchedFields.password &&
                        formErrors.password?.failure && (
                          <HelpText
                            status={"error"}
                            title={formErrors.password?.failure}
                            fontSize={"font-12"}
                            icon={true}
                          />
                        )
                      }
                    />
                    <Input
                      type={"default"}
                      label={t("registrationInputTitles.confirmPassword")}
                      inputType={"password"}
                      placeholder={t("registrationInputTitles.confirmPassword")}
                      value={popUpData?.confirmPassword}
                      autoComplete={"new-password"}
                      onChange={(e) =>
                        handlePopUpInputChange(e, "confirmPassword")
                      }
                      required={true}
                      statusCard={
                        touchedFields.confirmPassword &&
                        !arePasswordsEmpty &&
                        touchedFields.password &&
                        !isPasswordMatch && (
                          <HelpText
                            status={"error"}
                            title={t("validations.passwordMismatch")}
                            fontSize={"font-12"}
                            icon={true}
                          />
                        )
                      }
                    />
                  </>
                )}

                {addAdminError && (
                  <HelpText
                    status={"warning"}
                    title={addAdminError}
                    fontSize={"font-12"}
                    icon={true}
                  />
                )}
              </div>
              <div className="popup-buttons-wrapper">
                <Button
                  label={t("clearForm")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={clearForm}
                  customStyles={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "0",
                  }}
                />
                <Button
                  label={t("saveUser")}
                  type={"btn-primary"}
                  element={"button"}
                  onClick={handleAddAdminBtnClick}
                  customStyles={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "0",
                    backgroundColor: "rgba(50, 205, 50, 0.7)",
                  }}
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

export default AllAccounts;

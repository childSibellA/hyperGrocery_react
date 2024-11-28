import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "../../UI/Dropdown/Dropdown";
import DarckMode from "./DarckMode/DarckMode";
import ArrowDownSvg from "../../assets/svgs/ArrowDownSvg";
import { CompaniSvg, LogOutSvg, UserProfileIcon } from "../../assets/svgs";
import UserProfileSvg from "../../assets/svgs/UserProfileSvg";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { Button } from "../../UI/Button/Button";
import SigninLogo from "../../assets/svgs/SigninLogo";
import defaultLogo from "../../assets/companyLogo.png";
import Registration from "../../assets/svgs/Registration";
import { logOut } from "../../store/userReducer ";
import { useTranslation } from "react-i18next";
import BotSvg from "../../assets/svgs/BotSvg";

import "./AdminHeader.css";

export const AdminHeader = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.user);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const company = useSelector((state) => state.user.company);

  const handleLogout = async () => {
    dispatch(logOut());
    setActive(false);
  };

  const adminHeaderData = {
    username: user.email || "error",
    svg: (
      <img
        src={company.main_logo ? company.main_logo : defaultLogo}
        width={210}
        height={100}
        alt="Company Logo"
      />
    ),
    userImageUrl: <UserProfileIcon />,
    authsDropdown: [
      {
        id: 1,
        title: "",
        list: [
          !user?.roles?.includes("OPERATOR") && {
            id: 1,
            title: "Company Account",
            onClick: () => navigate("/company-account"),
            svg: <CompaniSvg />,
          },
        ].filter(Boolean),
      },
      {
        id: 2,
        title: "",
        list: [
          {
            id: 1,
            title: "User Account",
            onClick: () => navigate("/user-account"),
            svg: <UserProfileSvg />,
          },
        ],
      },
      {
        id: 3,
        title: "",
        list: [
          !user?.roles?.includes("OPERATOR") && {
            id: 1,
            title: "Ai_chatbot Config",
            svg: <BotSvg />,
            onClick: () => navigate("/bot-config"),
          },
        ].filter(Boolean),
      },
      {
        id: 4,
        title: "",
        list: [
          {
            id: 1,
            title: "Logout",
            onClick: handleLogout,
            svg: <LogOutSvg />,
          },
        ],
      },
    ],
  };

  const activeHandler = () => {
    setActive((prevActive) => !prevActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="admin-header">
        <Link
          to={
            user?.access_token
              ? user?.roles?.includes("OPERATOR")
                ? "/user-account"
                : "/company-account"
              : "/"
          }
          className="admin-logo-container"
        >
          <div className="admin-logo">{adminHeaderData.svg}</div>
          <div className={`logo-description`}>
            {company.name
              ? company.name
              : "Create and manage your travel agency here"}
          </div>
        </Link>
        <div className="user-input-container">
          <LanguageSwitcher />
          {user?.access_token ? (
            <div ref={buttonRef} onClick={activeHandler} className="user-input">
              {adminHeaderData.userImageUrl}
              <p className="adminUsername">{adminHeaderData.username}</p>
              <ArrowDownSvg active={active} />
            </div>
          ) : (
            <div className="displayflex">
              <Link to={currentPath === "/login" ? "/registration" : "/login"}>
                <Button
                  label={
                    currentPath === "/login" ? t("registration") : t("login")
                  }
                  size={"btn-lg"}
                  type={"btn-primary"}
                  element={"signin"}
                  ArrowDownSvg={
                    currentPath === "/login" ? <Registration /> : <SigninLogo />
                  }
                  arrow={true}
                  onClick={() => {}}
                  customStyles={{
                    background: "#eeeeee",
                  }}
                />
              </Link>
            </div>
          )}
          {active && user?.access_token && (
            <div
              className={`${"admin-hidden"} ${active ? "admin-select" : ""}`}
              ref={dropdownRef}
            >
              <Dropdown
                data={adminHeaderData.authsDropdown}
                type={"dropdown"}
                dropdown={"dropdown"}
                active={active}
                customStyles={{ width: "100%" }}
                handleListItemClick={() => console.log("")}
              />
            </div>
          )}
          {user?.access_token && <DarckMode />}
        </div>
      </div>
    </>
  );
};

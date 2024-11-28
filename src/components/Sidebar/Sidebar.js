// src/Sidebar.js
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ExpenseSvg from "../../assets/svgs/ExpenseSvg";
import InvoiceSvg from "../../assets/svgs/InvoiceSvg";
import FlightsListSvg from "../../assets/svgs/FlightsListSvg";
import OrderSvg from "../../assets/svgs/OrderSvg";
import { OperatorSvg, CustomersSvg, SettingsSvg } from "../../assets/svgs";
import { Button } from "../../UI/Button/Button";
import { useLocation } from "react-router-dom";
import StatsSvg from "../../assets/svgs/StatsSvg";

import styles from "../../index.module.css";

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const company = useSelector((state) => state.user.company);
  const roles = useSelector((state) => state.user.roles);

  const sidebarItems = [
    roles?.includes("GOD") && {
      id: 11,
      name: "All Companies",
      route: "/all-company",
      svg: <OperatorSvg />,
      subMenu: [],
      active: true,
    },
    roles?.includes("SUPER_ADMIN") && {
      id: 0,
      name: t("allAccounts"),
      route: "/all-accounts",
      svg: <OperatorSvg />,
      subMenu: [],
      active: true,
    },
    company?.sections?.customers && {
      id: 1,
      name: roles?.includes("SUPER_ADMIN")
        ? t("allCustomers")
        : t("myCustomers"),
      route: "/customers",
      svg: <CustomersSvg />,
      subMenu: [],
      active: true,
    },
    company?.sections?.orders && {
      id: 3,
      name: roles?.includes("SUPER_ADMIN") ? t("allOrders") : t("myOrders"),
      route: "/orders",
      svg: <OrderSvg />,
      subMenu: [],
      active: true,
    },
    company?.sections?.invoices && {
      id: 5,
      name: roles?.includes("SUPER_ADMIN") ? t("allInvoices") : t("myInvoices"),
      route: "/invoice",
      svg: <InvoiceSvg />,
      subMenu: [],
      active: true,
    },
    company?.sections?.services && {
      id: 7,
      name: roles?.includes("SUPER_ADMIN") ? t("allServices") : t("myServices"),
      route: "/services",
      svg: <FlightsListSvg />,
      subMenu: [],
      active: true,
    },
    roles?.includes("SUPER_ADMIN") &&
      company?.sections?.expenses && {
        id: 9,
        name: t("expenses"),
        route: "/expense",
        svg: <ExpenseSvg />,
        subMenu: [],
        active: true,
      },
    roles?.includes("SUPER_ADMIN") &&
      company?.sections?.statistics && {
        id: 20,
        name: t("statistics"),
        route: "/statistics",
        svg: <StatsSvg />,
        subMenu: [],
        active: true,
      },
    roles?.includes("SUPER_ADMIN") && {
      id: 10,
      name: t("settings"),
      route: "/settings",
      svg: <SettingsSvg />,
      subMenu: [
        {
          name: t("expencesCategory"),
          route: "/expense-category",
        },
        {
          name: t("serviceCompany"),
          route: "/service-company",
        },
        {
          name: t("serviceType"),
          route: "/service-type",
        },
      ],
      active: true,
    },
  ].filter(Boolean);

  return (
    <div className={`${styles.sidebar} admin-sidebar`}>
      {sidebarItems.map((item) => (
        <Button
          key={item.id}
          id={item.id}
          label={item.name}
          route={item.route}
          element={"side-admin-button"}
          svg={item.svg}
          subMenu={item.subMenu}
          active={location.pathname === item.route}
          subMenuActive={location.pathname.includes(item.subMenu?.route)}
        />
      ))}
    </div>
  );
};

export default Sidebar;

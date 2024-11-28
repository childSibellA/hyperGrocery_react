import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import { Input } from "../../UI/Input/Input";
import { useTranslation } from "react-i18next";

import styles from "./Statistic.module.css";

const Statistic = () => {
  const axios = useAxiosPrivate();
  const { t } = useTranslation();
  const company_id = useSelector((state) => state.user.companyId);

  const colors = [
    "#3b5998", // Facebook color
    "#E1306C", // Instagram color
    "#8884d8", // Other color
    "#ffc658", // Other color
    "#82ca9d", // Other color
    "#ff8042", // Other color
  ];

  const [monthlyData, setMonthlyData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [customerSourceData, setCustomerSourceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [customerData, setCustomerData] = useState();
  const [startDate, setStartDate] = useState(
    new Date(moment().startOf("year"))
  );
  const [endDate, setEndDate] = useState(new Date());

  const fetchOrdersAndCustomerGrowth = async () => {
    try {
      const [ordersRes, customersRes] = await Promise.all([
        axios.post("/order/get-all-orders", { company_id }),
        axios.post("/customer/get-all-customer", { company_id }),
      ]);

      const orders = ordersRes.data.orders;
      const customers = customersRes.data.customers;

      // Prepare data structure
      const combinedData = {};

      // Process orders data
      orders.forEach((order) => {
        const month = moment(order.createdAt).format("MMM");
        if (!combinedData[month])
          combinedData[month] = { name: month, orders: 0, customers: 0 };
        combinedData[month].orders += 1;
      });

      // Process customers data
      customers.forEach((customer) => {
        const month = moment(customer.createdAt).format("MMM");
        if (!combinedData[month])
          combinedData[month] = { name: month, orders: 0, customers: 0 };
        combinedData[month].customers += 1;
      });

      setMonthlyData(Object.values(combinedData));
    } catch (error) {
      console.error("Error fetching orders or customers data:", error);
      toast.error("Failed to load orders or customers data");
    }
  };

  const fetchCustomerData = async () => {
    try {
      const res = await axios.post("/customer/get-all-customer", {
        company_id,
      });
      const customers = res.data.customers;

      const customerCountByStatus = customers.reduce((acc, customer) => {
        const status = customer.status || "unknown";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const customerSourceCount = customers.reduce((acc, customer) => {
        const source = customer.WDYAHAU || "other";
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});

      setCustomerData(
        Object.keys(customerCountByStatus).map((status) => ({
          name: status,
          customers: customerCountByStatus[status],
        }))
      );

      setCustomerSourceData(
        Object.keys(customerSourceCount).map((source) => ({
          name: source,
          customers: customerSourceCount[source],
        }))
      );
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("Failed to load customer data");
    }
  };

  const fetchMonthlyRevenueData = async () => {
    setRevenueLoading(true);
    try {
      const res = await axios.get("/invoice/get-revenue-data", {
        params: {
          company_id,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
        },
      });

      const data = res.data.map((item) => ({
        month: moment()
          .month(item.month - 1)
          .format("MMM"),
        serviceExpense: item.serviceExpense,
        invoiceRevenue: item.invoiceRevenue,
      }));

      setRevenueData(data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      toast.error("Failed to load revenue data");
    } finally {
      setRevenueLoading(false);
    }
  };

  const handleInputChange = (date, params) => {
    if (params.name === "start_date") {
      setStartDate(date);
    } else if (params.name === "end_date") {
      setEndDate(date);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchOrdersAndCustomerGrowth(),
        fetchCustomerData(),
        fetchMonthlyRevenueData(),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchMonthlyRevenueData();
  }, [startDate, endDate]);

  const inputs = [
    {
      title: t("statistic.start_date"),
      name: "start_date",
      type: "date-picker-input",
      value: startDate,
      onChange: (date) => handleInputChange(date, { name: "start_date" }),
    },
    {
      title: t("statistic.end_date"),
      name: "end_date",
      type: "date-picker-input",
      value: endDate,
      onChange: (date) => handleInputChange(date, { name: "end_date" }),
    },
  ];

  return (
    <div className={styles.statisticsContainer}>
      <h2>{t("statistic.overview")}</h2>
      {isLoading ? (
        <div className="table-loading-container">
          <div className="table-loading" />
        </div>
      ) : (
        <>
          <div className={styles.chartSection}>
            <h3>{t("statistic.orders_and_customers_growth")}</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#82ca9d" />
                  <Bar dataKey="customers" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartSection}>
            <h3>{t("statistic.customer_source_segmentation")}</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSourceData}
                    dataKey="customers"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label
                  >
                    {customerSourceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartSection}>
            <h3>{t("statistic.revenue_growth_over_months")}</h3>
            <div className={styles.inputsSection}>
              {inputs.map((params, index) => (
                <Input
                  key={index}
                  type={params.type}
                  label={params.title}
                  value={moment(params.value).format("YYYY-MM-DD")}
                  name={params.name}
                  onChange={(date) => handleInputChange(date, params)}
                />
              ))}
            </div>
            <div className={styles.chartWrapper}>
              {revenueLoading ? (
                <div className="table-loading-container">
                  <div className="table-loading" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="serviceExpense"
                      fill="#FF7F50"
                      name="Service Expense"
                    />
                    <Bar
                      dataKey="invoiceRevenue"
                      fill="#82ca9d"
                      name="Invoice Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Statistic;

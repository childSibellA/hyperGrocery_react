import React from "react";
import { TimestampConverter } from "../../Utils/TimestampConverter";
import styles from "./Customer.module.css";

const CustomerDetail = ({ data }) => {
  const renderRow = (label, value) => {
    if (value === null || value === undefined || value === "") return null;
    return (
      <tr>
        <td className={styles.td}>{label}</td>
        <td className={styles.td}>{value}</td>
      </tr>
    );
  };

  // Extract customer details
  const customerName = data?.full_name || "N/A";
  const customerPhone = data?.phone_number
    ? `${data?.phone_number?.code} ${data?.phone_number?.number}`
    : "N/A";
  const userDetails = data?.userDetails || {};

  return (
    <table className={styles.table}>
      <tbody>
        {renderRow("Customer Name", customerName)}
        {renderRow("Phone Number", customerPhone)}
        {renderRow("National ID Number", data?.national_ID_number || "N/A")}
        {renderRow("Operator", userDetails?.username || "N/A")}
        {renderRow("Operator Email", userDetails?.email || "N/A")}
        {renderRow("Created At", TimestampConverter(data?.createdAt))}
        {renderRow("Updated At", TimestampConverter(data?.updatedAt))}
        {renderRow("Status", data?.status || "N/A")}
        {renderRow("Template Tour", data?.template_tour ? "Yes" : "No")}
        {renderRow(
          "Connection Dates",
          data?.connection_dates?.length > 0
            ? data?.connection_dates.join(", ")
            : "None"
        )}
        {renderRow("Company ID", data?.company_id || "N/A")}
        {renderRow("Operator ID", data?.operator_id || "N/A")}
        {renderRow("Note", data?.note || "N/A")}
        {renderRow("Messages", data?.messages?.length > 0 ? "Yes" : "No")}
      </tbody>
    </table>
  );
};

export default CustomerDetail;

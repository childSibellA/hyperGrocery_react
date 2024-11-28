import React from "react";
import styles from "./ServiceItem.module.css";

const ServiceDetailsTable = ({ data }) => {
  // Helper function to conditionally render table rows
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
  const customerName = data?.customer_id?.full_name || "N/A";
  const customerPhone = data.customer_id?.phone_number
    ? `${data?.customer_id?.phone_number?.code} ${data?.customer_id?.phone_number?.number}`
    : "N/A";

  return (
    <table className={styles.table}>
      <tbody>
        {renderRow("Customer Name", customerName)}
        {renderRow("Customer Phone", customerPhone)}
        {renderRow("Amount", data.amount)}
        {renderRow("Baggage Type", data.baggage_type)}
        {renderRow("Baggage Weight", data.baggage_weight)}
        {renderRow("Destination", data.destination)}
        {renderRow("Location", data.location)}
        {renderRow(
          "departure date",
          data.start_date && new Date(data.start_date).toLocaleString()
        )}
        {renderRow(
          "End Date",
          data.end_date && new Date(data.end_date).toLocaleString()
        )}
        {renderRow("Service Type", data.service_type_id?.name)}
        {renderRow("Company", data.company_id?.name)}
        {renderRow("Operator ID", data.operator_id)}
        {renderRow("Performance Status", data.performance_status)}
        {renderRow("Status", data.status)}
        {renderRow("Visa Type", data.visa_type)}
        {renderRow("Zone", data.zone)}
        {renderRow(
          "Created At",
          data.createdAt && new Date(data.createdAt).toLocaleString()
        )}
        {renderRow(
          "Updated At",
          data.updatedAt && new Date(data.updatedAt).toLocaleString()
        )}
      </tbody>
    </table>
  );
};

export default ServiceDetailsTable;

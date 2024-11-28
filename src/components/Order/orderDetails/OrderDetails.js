import React from "react";
import { useTranslation } from "react-i18next";
import { TimestampConverter } from "../../../Utils/TimestampConverter";
import styles from "./OrderDetails.module.css";

const OrderDetails = ({ order }) => {
  const { t } = useTranslation();

  if (!order) return null;

  console.log(order, "order");
  

  return (
    <div className={styles.detailsContainer}>
      <h2>{t("inputTitles.order_details")}</h2>
      <p>
        <strong>{t("inputTitles.order_id")}:</strong> {order._id}
      </p>
      <p>
        <strong>{t("inputTitles.company_id")}:</strong> {order.company_id}
      </p>
      <p>
        <strong>{t("inputTitles.customer_name")}:</strong>{" "}
        {order.customer_id?.full_name || t("inputTitles.not_available")}
      </p>
      <p>
        <strong>{t("inputTitles.national_id")}:</strong>{" "}
        {order.customer_id?.national_ID_number ||
          t("inputTitles.not_available")}
      </p>
      <p>
        <strong>{t("inputTitles.phone_number")}:</strong>{" "}
        {order.customer_id?.phone_number?.code}{" "}
        {order.customer_id?.phone_number?.number ||
          t("inputTitles.not_available")}
      </p>
      <p>
        <strong>{t("inputTitles.operator")}:</strong>{" "}
        {order.operator_id?.username || t("inputTitles.not_available")} (
        {order.operator_id?.email || t("inputTitles.no_email")})
      </p>
      <p>
        <strong>{t("inputTitles.payment_method")}:</strong>{" "}
        {order.payment_method?.bank_name} -{" "}
        {order.payment_method?.account_number}
      </p>
      <p>
        <strong>{t("inputTitles.status")}:</strong>{" "}
        {order.status || t("inputTitles.not_available")}
      </p>
      <p>
        <strong>{t("inputTitles.note")}:</strong>{" "}
        {order.note || t("inputTitles.no_notes")}
      </p>
      <div>
        <strong>{t("inputTitles.passengers")}:</strong>
        {order.passengers && order.passengers.length > 0 ? (
          <ul>
            {order.passengers.map((passenger, index) => (
              <li key={index}>{passenger}</li>
            ))}
          </ul>
        ) : (
          <p>{t("inputTitles.no_passengers")}</p>
        )}
      </div>
      <p>
        <strong>{t("inputTitles.created_at")}:</strong>{" "}
        {TimestampConverter(order.createdAt)}
      </p>
      <p>
        <strong>{t("inputTitles.updated_at")}:</strong>{" "}
        {TimestampConverter(order.updatedAt)}
      </p>
      <h3>{t("inputTitles.services")}</h3>
      {order.services.length > 0 ? (
        order.services.map((service, index) => {
          const serviceItem = service.service_item_id
            ? service.service_item_id
            : service;
          return (
            <div key={index} className={styles.serviceItem}>
              {serviceItem.service_type_id?.name && (
                <p>
                  <strong>{t("inputTitles.service_type")}:</strong>{" "}
                  {serviceItem.service_type_id?.name}
                </p>
              )}
              {serviceItem.location && (
                <p>
                  <strong>{t("inputTitles.location")}:</strong>{" "}
                  {serviceItem.location}
                </p>
              )}
              {serviceItem.destination && (
                <p>
                  <strong>{t("inputTitles.destination")}:</strong>{" "}
                  {serviceItem.destination}
                </p>
              )}
              {serviceItem.start_date && (
                <p>
                  <strong>{t("inputTitles.start_date")}:</strong>{" "}
                  {TimestampConverter(serviceItem.start_date, true)}
                </p>
              )}
              {serviceItem.end_date && (
                <p>
                  <strong>{t("inputTitles.end_date")}:</strong>{" "}
                  {TimestampConverter(serviceItem.end_date, true)}
                </p>
              )}
              {serviceItem.performance_status && (
                <p>
                  <strong>{t("inputTitles.performance_status")}:</strong>{" "}
                  {serviceItem.performance_status}
                </p>
              )}
              {serviceItem.status && (
                <p>
                  <strong>{t("inputTitles.service_status")}:</strong>{" "}
                  {serviceItem.status}
                </p>
              )}
              {serviceItem.pickup_location && (
                <p>
                  <strong>{t("inputTitles.pickup_location")}:</strong>{" "}
                  {serviceItem.pickup_location}
                </p>
              )}
              {serviceItem.dropoff_location && (
                <p>
                  <strong>{t("inputTitles.dropoff_location")}:</strong>{" "}
                  {serviceItem.dropoff_location}
                </p>
              )}
              {serviceItem.internal_pickup_location && (
                <p>
                  <strong>{t("inputTitles.internal_pickup_location")}:</strong>{" "}
                  {serviceItem.internal_pickup_location}
                </p>
              )}
              {serviceItem.internal_dropoff_location && (
                <p>
                  <strong>{t("inputTitles.internal_dropoff_location")}:</strong>{" "}
                  {serviceItem.internal_dropoff_location}
                </p>
              )}
              {serviceItem.checkin_location && (
                <p>
                  <strong>{t("inputTitles.checkin_location")}:</strong>{" "}
                  {serviceItem.checkin_location}
                </p>
              )}
              {serviceItem.insurance_provider && (
                <p>
                  <strong>{t("inputTitles.insurance_provider")}:</strong>{" "}
                  {serviceItem.insurance_provider}
                </p>
              )}
              {serviceItem.baggage_type && (
                <p>
                  <strong>{t("inputTitles.baggage_type")}:</strong>{" "}
                  {serviceItem.baggage_type}
                </p>
              )}
              {serviceItem.baggage_weight && (
                <p>
                  <strong>{t("inputTitles.baggage_weight")}:</strong>{" "}
                  {serviceItem.baggage_weight}
                </p>
              )}
              {serviceItem.baggage_dimensions && (
                <p>
                  <strong>{t("inputTitles.baggage_dimensions")}:</strong>{" "}
                  {serviceItem.baggage_dimensions}
                </p>
              )}
              {serviceItem.zone && (
                <p>
                  <strong>{t("inputTitles.zone")}:</strong> {serviceItem.zone}
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p>{t("inputTitles.no_services_available")}</p>
      )}
    </div>
  );
};

export default OrderDetails;

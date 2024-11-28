import React from "react";
import { useTranslation } from "react-i18next";
import { EditIcon, DeleteIcon } from "../../assets/svgs";
import { TimestampConverter } from "../../Utils/TimestampConverter";
import DuplicateSvg from "../../assets/svgs/DuplicateSvg";
import styles from "./ServiceTabs.module.css";

const ServiceCard = ({ service, index, removeService, addSameService }) => {
  const { t } = useTranslation();

  const renderServiceDetails = () => {
    switch (service?.serviceName) {
      case "Ticket":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.date_of_fly")}:{" "}
              </span>
              {TimestampConverter(service?.start_date, true) || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.city_from_placeholder")}:{" "}
              </span>
              {service?.location || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.city_to_placeholder")}:{" "}
              </span>
              {service?.destination || "N/A"}
            </span>
          </>
        );

      case "Visa":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.country")}:{" "}
              </span>
              {service?.visa_country || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.visa_type")}:{" "}
              </span>
              {service?.visa_type || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.visa_issue_date")}:{" "}
              </span>
              {service?.start_date || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.visa_expiry_date")}:{" "}
              </span>
              {service?.end_date || "N/A"}
            </span>
          </>
        );

      case "Hotel":
        return (
          <>
            <span>
              <span className={styles.spanList}>{t("inputTitles.city")}: </span>
              {service?.location || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.hotel_name")}:{" "}
              </span>
              {service?.hotel_name || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.check_in_date")}:{" "}
              </span>
              {service?.start_date || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.check_out_date")}:{" "}
              </span>
              {service?.end_date || "N/A"}
            </span>
          </>
        );

      case "Invitation":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.invitation_country")}:{" "}
              </span>
              {service?.invitation_country || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.invitation_type")}:{" "}
              </span>
              {service?.invitation_type || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.invitation_issue_date")}:{" "}
              </span>
              {service?.start_date || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.invitation_expiry_date")}:{" "}
              </span>
              {service?.end_date || "N/A"}
            </span>
          </>
        );

      case "Returnable Ticket":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.date_of_fly")}:{" "}
              </span>
              {TimestampConverter(service?.start_date, true) || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.return_date")}:{" "}
              </span>
              {TimestampConverter(service?.end_date, true) || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.city_from_placeholder")}:{" "}
              </span>
              {service?.location || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.city_to_placeholder")}:{" "}
              </span>
              {service?.destination || "N/A"}
            </span>
          </>
        );

      case "Insurance":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.insurance_provider")}:{" "}
              </span>
              {service?.insurance_provider || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>{t("inputTitles.zone")}: </span>
              {service?.zone || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.insurance_start_date")}:{" "}
              </span>
              {service?.start_date || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.insurance_end_date")}:{" "}
              </span>
              {service?.end_date || "N/A"}
            </span>
          </>
        );

      case "Baggage":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.baggage_type")}:{" "}
              </span>
              {service?.baggage_type || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.weight")}:{" "}
              </span>
              {service?.baggage_weight || "N/A"} kg
            </span>
          </>
        );

      case "Transfer":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.pickup_location")}:{" "}
              </span>
              {service?.location || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.dropoff_location")}:{" "}
              </span>
              {service?.destination || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.transfer_date")}:{" "}
              </span>
              {service?.start_date || "N/A"}
            </span>
          </>
        );

      case "Internal Transfer":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.internal_pickup_location")}:{" "}
              </span>
              {service?.location || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.internal_dropoff_location")}:{" "}
              </span>
              {service?.destination || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.internal_transfer_date")}:{" "}
              </span>
              {service?.start_date || "N/A"}
            </span>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.internal_transfer_return_date")}:{" "}
              </span>
              {service?.end_date || "N/A"}
            </span>
          </>
        );

      case "Check In":
        return (
          <>
            <span>
              <span className={styles.spanList}>
                {t("inputTitles.check_in_date")}:{" "}
              </span>
              {TimestampConverter(service?.start_date, true) || "N/A"}
            </span>
          </>
        );

      default:
        return <span>{t("inputTitles.service_details_not_available")}</span>;
    }
  };

  return (
    <div className={styles.serviceCard} key={index}>
      <div className={styles.serviceCardHeader}>
        <h3>{service?.service_type_id?.name}</h3>
      </div>
      <div className={styles.serviceCardBody}>{renderServiceDetails()}</div>
      <div className={styles.serviceCardFooter}>
        <DuplicateSvg onClick={() => addSameService(service)} />
        <DeleteIcon
          customStyles={{ width: "30px", height: "30px", cursor: "pointer" }}
          onClick={() => removeService(index)}
        />
      </div>
    </div>
  );
};

export default ServiceCard;

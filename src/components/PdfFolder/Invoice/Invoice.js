import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { TimestampConverter } from "../../../Utils/TimestampConverter";

import styles from "./Invoice.module.css";

const Invoice = forwardRef(({ popUpData }, ref) => {
  const company = useSelector((state) => state.user.company);

  console.log(popUpData, "popUpData");
  

  return (
    <div className={styles.invoice} ref={ref}>
      <header className={styles.header}>
        {company?.invoice_logo && (
          <img
            src={company.invoice_logo}
            width={90}
            height={90}
            alt="Company Logo"
            crossOrigin="anonymous"
          />
        )}
        <h1>Invoice</h1>
        <div className={styles.companyInfo}>
          <h2>{company?.name}</h2>
          <p>ID - {company?.registration_id}</p>
          <p>
            {company?.phone_number.code}
            {company?.phone_number.number}
          </p>
          <p>{company?.web_page}</p>
        </div>
      </header>
      <section className={styles.details}>
        <div className={`${styles.commonStyle} client-info`}>
          <h3>მიმღები:</h3>
          <p>{popUpData?.customer_id?.full_name || "N/A"}</p>
          <p>{`ID N${popUpData?.customer_id?.national_ID_number || "N/A"}`}</p>
          <p>
            {popUpData?.customer_id?.phone_number?.code}
            {popUpData?.customer_id?.phone_number?.number || "N/A"}
          </p>
        </div>
        <div className={`${styles.commonStyle} invoice-info`}>
          <p>
            <strong>ინვოისი #:</strong> {popUpData.invoice_number}
          </p>
          <p>
            <strong>თარიღი:</strong>
            {TimestampConverter(popUpData?.createdAt, true)}
          </p>
        </div>
      </section>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>საბანკო რეკვიზიტები</th>
          </tr>
        </thead>
        <tbody>
          {popUpData?.payment_method?.bank_name ? (
            <tr>
              <td>{`სს "${popUpData.payment_method.bank_name}"`}</td>
              <td>{company.registration_name}</td>
              <td>{popUpData.payment_method.account_number || "N/A"}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="3">No payment method available</td>
            </tr>
          )}
        </tbody>
      </table>
      <table className={styles.table} style={{ zIndex: "10" }}>
        {popUpData?.services?.length > 0 && (
          <thead>
            <tr>
              <th>სერვისი</th>
              <th>დეტალები</th>
            </tr>
          </thead>
        )}
        <tbody>
          {popUpData?.services?.map((service, index) => (
            <tr key={service._id || index}>
              <td>
                {service.service_item_id?.service_type_id?.name || "Service"}
              </td>
              <td>
                <div className={styles.commonStyle}>
                  {service.service_item_id?.location && (
                    <div>
                      <strong>ლოკაცია:</strong>{" "}
                      {service.service_item_id.location}
                    </div>
                  )}
                  {service.service_item_id?.destination && (
                    <div>
                      <strong>მიმართულება:</strong>{" "}
                      {service.service_item_id.destination}
                    </div>
                  )}
                  {service.service_item_id?.start_date && (
                    <div>
                      <strong>თარიღი:</strong>{" "}
                      {TimestampConverter(
                        service.service_item_id.start_date,
                        true
                      )}{" "}
                      -{" "}
                      {TimestampConverter(
                        service.service_item_id.end_date,
                        true
                      )}
                    </div>
                  )}
                  {service.service_item_id?.visa_type && (
                    <div>
                      <strong>ვიზის ტიპი:</strong>{" "}
                      {service.service_item_id.visa_type}
                    </div>
                  )}
                  {service.service_item_id?.hotel_name && (
                    <div>
                      <strong>სასტუმროს სახელი:</strong>{" "}
                      {service.service_item_id.hotel_name}
                    </div>
                  )}
                  {service.service_item_id?.invitation_type && (
                    <div>
                      <strong>მოწვევის ტიპი:</strong>{" "}
                      {service.service_item_id.invitation_type}
                    </div>
                  )}
                  {service.service_item_id?.insurance_provider && (
                    <div>
                      <strong>დაზღვევის მიმწოდებელი:</strong>{" "}
                      {service.service_item_id.insurance_provider}
                    </div>
                  )}
                  {service.service_item_id?.zone && (
                    <div>
                      <strong>ზონა:</strong> {service.service_item_id.zone}
                    </div>
                  )}
                  {service.service_item_id?.baggage_type && (
                    <div>
                      <strong>ბარგის ტიპი:</strong>{" "}
                      {service.service_item_id.baggage_type}
                    </div>
                  )}
                  {service.service_item_id?.baggage_weight && (
                    <div>
                      <strong>წონა:</strong>{" "}
                      {service.service_item_id.baggage_weight} კგ
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popUpData?.passengers?.length > 0 && (
        <table className={styles.table} style={{ zIndex: "10" }}>
          <thead>
            <tr>
              <th>მგზავრები</th>
            </tr>
          </thead>
          <tbody>
            {popUpData?.passengers?.map((passenger, index) => (
              <tr key={index}>
                <td>{passenger || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <footer className={styles.footer}>
        {popUpData?.discount && (
          <p>
            <strong>ფასდაკლება:</strong> {popUpData.discount} %
          </p>
        )}
        <p>
          <strong>ჯამი:</strong> {popUpData?.total_price || "N/A"} ლარი
        </p>
        <p>მადლობა რომ იყენებთ ჩვენს სერვისს!</p>
      </footer>
      <section className={styles.companyPolicy}>
        <h3>დანიშნულება: {popUpData.invoice_number} </h3>
        <p>
          ყურადღება! თანხის ჩარიცხვით, თქვენ ეთანხმებით კომპანიის პოლიტიკას.
          გაითვალისწინეთ შეკვეთის გაუქმების და თანხის დაბრუნების მოთხოვნის
          შემთხვევაში, კომპანია მოქმედებს ავიაკომპანიის პოლიტიკის მიხედვით.
        </p>
      </section>
      <div className={styles.confirmLogo}>
        {company.ring_logo && (
          <img
            src={company.ring_logo}
            width={180}
            height={180}
            alt="Company Ring Logo"
          />
        )}
      </div>
    </div>
  );
});

export default Invoice;

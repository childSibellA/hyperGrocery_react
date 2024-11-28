import React from "react";
import styles from "./CompanyDetails.module.css";

const CompanyDetails = ({ company }) => {
  if (!company) return null;

  return (
    <div className={styles.companyDetails}>
      <h2>{company.name}</h2>
      <p>
        <strong>Address:</strong> {company.address || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {company.email || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong>{" "}
        {`${company.phone_number?.code || ""} ${company.phone_number?.number || ""}`}
      </p>
      <p>
        <strong>Status:</strong> {company.status || "N/A"}
      </p>
      <p>
        <strong>Registration ID:</strong> {company.registration_id || "N/A"}
      </p>
      <p>
        <strong>Bot Active:</strong> {company.bot_active ? "Yes" : "No"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(company.createdAt).toLocaleString() || "N/A"}
      </p>

      <h3>Logos</h3>
      <div className={styles.logos}>
        <p>
          <strong>Main Logo:</strong>{" "}
          <img src={company.main_logo} alt="Main Logo" />
        </p>
        <p>
          <strong>Invoice Logo:</strong>{" "}
          <img src={company.invoice_logo} alt="Invoice Logo" />
        </p>
        <p>
          <strong>Ring Logo:</strong>{" "}
          <img src={company.ring_logo} alt="Ring Logo" />
        </p>
      </div>

      <h3>Payment Methods</h3>
      {company.payment_methods && company.payment_methods.length > 0 ? (
        <ul className={styles.paymentMethods}>
          {company.payment_methods.map((method, index) => (
            <li key={index}>
              {method.bank_name}: {method.account_number}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payment methods available</p>
      )}

      <h3>Social Media</h3>
      <div className={styles.socialMedia}>
        <p>
          <strong>Facebook Chat ID:</strong> {company.fb_chat_id || "N/A"}
        </p>
        {/* <p>
          <strong>Facebook Page Access Token:</strong>{" "}
          {company.fb_page_access_token || "N/A"}
        </p> */}
        <p>
          <strong>Instagram Chat ID:</strong> {company.insta_chat_id || "N/A"}
        </p>
        {/* <p>
          <strong>Instagram Page Access Token:</strong>{" "}
          {company.insta_page_access_token || "N/A"}
        </p> */}
      </div>

      <h3>Sections</h3>
      <ul className={styles.sectionList}>
        {company.sections &&
          Object.entries(company.sections).map(([section, enabled]) => (
            <li key={section}>
              {section}: {enabled ? "Enabled" : "Disabled"}
            </li>
          ))}
      </ul>

      {/* <h3>OpenAI API Key</h3>
      <p>{company.openai_api_key || "N/A"}</p> */}
    </div>
  );
};

export default CompanyDetails;

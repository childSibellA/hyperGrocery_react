import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Legal.module.css";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("privacyPolicy.title")}</h1>
      <p className={styles.text}>{t("privacyPolicy.intro")}</p>

      <h2 className={styles.subtitle}>
        {t("privacyPolicy.infoCollection.title")}
      </h2>
      <p className={styles.text}>{t("privacyPolicy.infoCollection.content")}</p>

      <h2 className={styles.subtitle}>{t("privacyPolicy.infoUsage.title")}</h2>
      <p className={styles.text}>{t("privacyPolicy.infoUsage.content")}</p>

      <h2 className={styles.subtitle}>
        {t("privacyPolicy.infoSharing.title")}
      </h2>
      <p className={styles.text}>{t("privacyPolicy.infoSharing.content")}</p>

      <h2 className={styles.subtitle}>
        {t("privacyPolicy.dataSecurity.title")}
      </h2>
      <p className={styles.text}>{t("privacyPolicy.dataSecurity.content")}</p>

      <h2 className={styles.subtitle}>{t("privacyPolicy.contactUs.title")}</h2>
      <p className={styles.text}>{t("privacyPolicy.contactUs.content")}</p>
    </div>
  );
};

export default PrivacyPolicy;

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Legal.module.css";

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("termsOfUse.title")}</h1>
      <p className={styles.text}>{t("termsOfUse.intro")}</p>

      <h2 className={styles.subtitle}>{t("termsOfUse.acceptance.title")}</h2>
      <p className={styles.text}>{t("termsOfUse.acceptance.content")}</p>

      <h2 className={styles.subtitle}>{t("termsOfUse.changes.title")}</h2>
      <p className={styles.text}>{t("termsOfUse.changes.content")}</p>

      <h2 className={styles.subtitle}>
        {t("termsOfUse.userResponsibilities.title")}
      </h2>
      <p className={styles.text}>
        {t("termsOfUse.userResponsibilities.content")}
      </p>

      <h2 className={styles.subtitle}>{t("termsOfUse.termination.title")}</h2>
      <p className={styles.text}>{t("termsOfUse.termination.content")}</p>

      <h2 className={styles.subtitle}>{t("termsOfUse.governingLaw.title")}</h2>
      <p className={styles.text}>{t("termsOfUse.governingLaw.content")}</p>
    </div>
  );
};

export default TermsOfUse;

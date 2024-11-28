import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import { useTranslation } from "react-i18next";
import earth from "../../assets/img/lending/earth.png";
import whyAviafy from "../../assets/img/lending/whyAviaFy.png";
import howItworks from "../../assets/img/lending/howItWorks.svg";
import crm from "../../assets/img/lending/crm.png";
import orders from "../../assets/img/lending/orders.png";
import invoice from "../../assets/img/lending/invoice.png";
import security from "../../assets/img/lending/security.png";
import expences from "../../assets/img/lending/expences.png";
import permissions from "../../assets/img/lending/permissions.png";
import reporting from "../../assets/img/lending/reporting.png";
import chatbot from "../../assets/img/lending/chatbot.png";
import benefits from "../../assets/img/lending/benefits.png";
import { useFade } from "../../hooks/useFade";

import styles from "./Landing.module.css";

const Landing = () => {
  const { t } = useTranslation();
  useFade("up", [".fade-up"]);
  const SERVICELIST = [
    { service: t("landing.aiAnsweringMachine") },
    { service: t("landing.customerManagement") },
    { service: t("landing.createInvoice") },
    { service: t("landing.marketingTools") },
    { service: t("landing.orderExpenseManagement") },
  ];

  return (
    <div className={styles.container}>
      {/* Intro Section */}
      <section
        className={`${styles.blueSection} ${styles.sectionWrapper} fade-up`}
      >
        <div className={styles.sectionBody}>
          <div className={styles.introSectionContent}>
            <h1 className={styles.title}>{t("landing.welcome")}</h1>
            <p className={styles.text}>{t("landing.subtitle")}</p>
            <Link to="/registration" className={styles.registerButton}>
              {t("landing.getStarted")}
            </Link>
          </div>

          <div
            className={styles.imageContainer}
            // style={{ marginRight: "60px" }}
          >
            <img src={earth} alt="earth" />
          </div>
        </div>
        <div className={styles.decorRotatedElement}></div>
      </section>

      {/* Why Choose Section */}
      <section
        className={`${styles.whiteSection} ${styles.sectionWrapper} fade-up`}
      >
        <h1 className={styles.subtitle}>{t("landing.whyChoose")}</h1>
        <div className={styles.sectionBody}>
          <div className={styles.sectionContent}>
            <p className={styles.textBlue}>
              {t("landing.whyChooseDescription")}
            </p>
            <img src={whyAviafy} alt="why choose" />
          </div>
          <div className={`${styles.serviceList} ${styles.imageContainer}`}>
            {SERVICELIST.map((item, index) => (
              <div key={index} className={styles.serviceItem}>
                <p style={{ color: "#eeeeee" }}>{item.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`${styles.blueSection} ${styles.sectionWrapper} fade-up`}
      >
        <h2 className={styles.subtitle}>{t("landing.howItWorks")}</h2>
        <div className={styles.sectionBody}>
          <ul
            className={`${styles.whiteBackgroundOnBlue} ${styles.sectionContent} ${styles.featuresListWhite}`}
          >
            <li className={styles.text}>
              {t("landing.howItWorksDescription")}
            </li>
            <li className={styles.text}>{t("landing.centralizedDashboard")}</li>
            <li className={styles.text}>{t("landing.automationTools")}</li>
            <li className={styles.text}>{t("landing.scalableCustomizable")}</li>
            <li className={styles.text}>{t("landing.startManaging")}</li>
          </ul>
          <div className={styles.imageContainer}>
            <img src={howItworks} alt="how it works" />
          </div>
        </div>
        <div className={styles.decorRotatedElementTwo}></div>
      </section>

      {/* Key Features Section */}
      <section
        className={`${styles.whiteSection} ${styles.sectionWrapper} fade-up`}
      >
        <div className={styles.sectionBody}>
          <div className={styles.mainFeatureWrapp}>
            <h2 className={styles.subtitle}>{t("landing.keyFeatures")}</h2>
            <div
              className={styles.mainFeature}
              style={{ border: "1px solid #3e54ac" }}
            >
              <div className={styles.whiteBackground}>
                <h3 className={styles.desctitle}>
                  {t("landing.customerRelationshipManagement")}
                </h3>
                <img src={crm} alt="CRM" />
              </div>
              <ul className={styles.featuresList}>
                <li>{t("landing.simpleRecording")}</li>
                <li>{t("landing.organizedData")}</li>
              </ul>
            </div>
          </div>

          <div className={styles.featuresListWrapp}>
            <div
              className={styles.whiteBackground}
              style={{ border: "1px solid #3e54ac" }}
            >
              <div>
                <img src={orders} alt="order management" />
                <h3 className={styles.desctitle}>
                  {t("landing.orderManagement")}
                </h3>
              </div>
              <ul className={styles.featuresList}>
                <li>{t("landing.agents")}</li>
                <li>{t("landing.attachTickets")}</li>
              </ul>
            </div>
            <div
              className={styles.whiteBackground}
              style={{ border: "1px solid #3e54ac" }}
            >
              <div>
                <img src={invoice} alt="invoice generation" />
                <h3 className={styles.desctitle}>
                  {t("landing.invoiceGeneration")}
                </h3>
              </div>
              <ul className={styles.featuresList}>
                <li>{t("landing.professionalInvoices")}</li>
                <li>{t("landing.sendInvoices")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More Features Section */}
      <section
        className={`${styles.blueSection} ${styles.sectionWrapper} fade-up`}
      >
        <div className={`${styles.sectionBody} ${styles.bodyReverse}`}>
          <div className={styles.featuresListWrapp}>
            <div className={styles.whiteBackground}>
              <ul className={styles.featuresList}>
                <li>{t("landing.agents")}</li>
                <li>{t("landing.attachTickets")}</li>
              </ul>
              <div>
                <h3 className={styles.desctitle}>
                  {t("landing.permissionsRoles")}
                </h3>
                <img src={permissions} alt="permissions and roles" />
              </div>
            </div>
            <div className={styles.whiteBackground}>
              <ul className={styles.featuresList}>
                <li>{t("landing.accessData")}</li>
              </ul>
              <div>
                <img src={reporting} alt="reporting" />
                <h3 className={styles.desctitle}>{t("landing.reporting")}</h3>
              </div>
            </div>
          </div>

          <div className={styles.mainFeatureWrapp}>
            <h1 className={styles.subtitle}>{t("landing.moreFeatures")}</h1>
            <div className={styles.mainFeature}>
              <div className={styles.whiteBackground}>
                <img src={expences} alt="expenses" />
                <h3 className={styles.desctitle}>
                  {t("landing.expenseManagement")}
                </h3>
              </div>
              <ul className={styles.featuresList}>
                <li>{t("landing.trackExpenses")}</li>
                <li>{t("landing.calculateSalaries")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section
        className={`${styles.whiteSection} ${styles.sectionWrapper} fade-up`}
      >
        <h1 className={styles.subtitle}>
          {t("landing.intelligentAnsweringMachine")}
        </h1>
        <div className={styles.sectionBody}>
          <div className={styles.imageContainer}>
            <img src={chatbot} alt="chatbot" />
          </div>
          <ul
            className={`${styles.whiteBackground} ${styles.sectionContent} ${styles.featuresList}`}
            style={{ border: "1px solid #3e54ac" }}
          >
            <li className={styles.text}>{t("landing.customerSupport")}</li>
            <li className={styles.text}>{t("landing.dataCollection")}</li>
            <li className={styles.text}>
              {t("landing.automatedNotifications")}
            </li>
            <li className={styles.text}>{t("landing.connectAnywhere")}</li>
            <li className={styles.text}>{t("landing.freeAndScalable")}</li>
            <li className={styles.text}>{t("landing.saveTime")}</li>
          </ul>
        </div>
      </section>

      <section
        className={`${styles.blueSection} ${styles.sectionWrapper} fade-up`}
      >
        <h1 className={styles.subtitle}>{t("landing.benefits")}</h1>
        <div className={styles.sectionBody}>
          <ul
            className={`${styles.whiteBackgroundOnBlue} ${styles.sectionContent} ${styles.featuresListWhite}`}
          >
            <li className={styles.text}>
              {t("landing.centralizedManagement")}
            </li>
            <li className={styles.text}>{t("landing.enhancedEfficiency")}</li>
            <li className={styles.text}>{t("landing.customerSupport24")}</li>
            <li className={styles.text}>{t("landing.logTrackBookings")}</li>
            <li className={styles.text}>
              {t("landing.realTimeFinancialOversight")}
            </li>
            <li className={styles.text}>
              {t("landing.improvedCustomerExperience")}
            </li>
            <li className={styles.text}>
              {t("landing.scalabilityFlexibility")}
            </li>
            <li className={styles.text}>{t("landing.seamlessIntegration")}</li>
            <li className={styles.text}>{t("landing.dataDrivenInsights")}</li>
            <li className={styles.text}>
              {t("landing.costEffectiveSolution")}
            </li>
            <li className={styles.text}>{t("landing.easyImplementation")}</li>
            <li className={styles.text}>{t("landing.teamCollaboration")}</li>
          </ul>
          <div className={styles.imageContainer}>
            <img src={benefits} alt="benefits" />
          </div>
        </div>
        <div className={styles.decorRotatedElementTwo}></div>
      </section>

      <section
        className={`${styles.whiteSection} ${styles.sectionWrapper} fade-up`}
      >
        <h2 className={styles.subtitle}>{t("landing.securityCompliance")}</h2>
        <div className={styles.sectionBody}>
          <div className={styles.imageContainer}>
            <img src={security} alt="security" />
          </div>
          <ul
            className={`${styles.whiteBackground} ${styles.sectionContent}`}
            style={{ border: "1px solid #3e54ac" }}
          >
            <li>{t("landing.advancedEncryption")}</li>
            <li>{t("landing.secureDataStorage")}</li>
            <li>{t("landing.gdprCompliant")}</li>
            <li>{t("landing.roleBasedAccess")}</li>
            <li>{t("landing.realTimeThreatDetection")}</li>
            <li>{t("landing.builtInPrivacy")}</li>
            <li>{t("landing.reliableBackup")}</li>
            <li>{t("landing.highAvailability")}</li>
            <li>{t("landing.commitmentExcellence")}</li>
          </ul>
        </div>
      </section>
      <div className="fade-up">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;

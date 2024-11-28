import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTelegram , FaLinkedin} from "react-icons/fa";
import { useTranslation } from "react-i18next";

import styles from "./Footer.module.css";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Call to Action Section */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>{t("footer.readyToTransform")}</h2>
          <p className={styles.ctaText}>{t("footer.joinAgencies")}</p>
          <Link to="/registration" className={styles.ctaButton}>
            {t("footer.startTrial")}
          </Link>
        </div>

        {/* Contact & Social Media Section */}
        <div className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <h3 className={styles.contactTitle}>{t("footer.contactUs")}</h3>
            <p className={styles.contactPhone}>+995 511 414 036</p>
            <p className={styles.contactPhone}>myaviafy@gmail.com</p>
            <div className={styles.socialMediaLinks}>
              <a
                href="https://www.facebook.com/profile.php?id=61565919404752"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialMediaLink}
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialMediaLink}
              >
                <FaInstagram />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className={styles.socialMediaLink}
              >
                <FaTelegram />
              </a>
              <a
                href="https://www.linkedin.com/company/105415409"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialMediaLink}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Links Section */}
        <div className={styles.legalSection}>
          <p className={styles.legalText}>
            © 2024 Aviafy. {t("footer.allRightsReserved")}
          </p>
          <div className={styles.legalLinks}>
            <Link to="/privacy-policy" className={styles.legalLink}>
              {t("footer.privacyPolicy")}
            </Link>
            <span>|</span>
            <Link to="/terms-of-use" className={styles.legalLink}>
              {t("footer.termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

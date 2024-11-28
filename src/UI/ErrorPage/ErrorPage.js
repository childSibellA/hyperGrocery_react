import React from "react";
import { Button } from "../Button/Button";

import styles from "./ErrorPage.module.css";

const ErrorPage = ({ errorMessage }) => {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.errorMessage}>Oops! Something went wrong.</div>
      <div className={styles.errorDetails}>{errorMessage}</div>
      <div className={styles.buttonsWrapper}>
        <Button
          element={"button"}
          size={"btn-lg"}
          type={"btn-primary"}
          label={"Refresh Page"}
          active={true}
          onClick={() => window.location.reload()}
        />
        <Button
          element={"button"}
          size={"btn-lg"}
          type={"btn-primary"}
          label={"Back To Home"}
          active={true}
          onClick={() => (window.location.href = "/")}
        />
      </div>
    </div>
  );
};

export default ErrorPage;

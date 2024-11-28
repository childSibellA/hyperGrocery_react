import { useState } from "react";
import { MainLogoSvg, SigninLogo } from "../../assets/svgs";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { HelpText } from "../HelpText/HelpText";
import { useTranslation } from "react-i18next";

import "./Signin.css";

export const Signin = ({
  handleSubmit,
  loginError,
  loading,
  successMessage,
  logo,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={`signin-container`}>
      <div className="signin-form-container">
        <div className={`signin-header`}>
          {/* {logo ?? <MainLogoSvg />} */}

          <h2>Aviafy</h2>
        </div>
        <div className={`signin-form`}>
          <Input
            type={"default"}
            icon={true}
            inputType={"text"}
            placeholder={"Enter Email Address"}
            editable={false}
            label={t("registrationInputTitles.email")}
            subLabel={""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type={"default"}
            icon={true}
            inputType={"password"}
            placeholder={"Enter Password"}
            label={t("registrationInputTitles.password")}
            editable={false}
            subLabel={""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            statusCard={
              loginError ? (
                <HelpText
                  status={"error"}
                  title={loginError}
                  fontSize={"font-12"}
                  icon={true}
                />
              ) : successMessage ? (
                <HelpText
                  status={"success"}
                  title={successMessage}
                  fontSize={"font-12"}
                  icon={true}
                />
              ) : (
                false
              )
            }
          />
          <Button
            label={loading ? "Loading..." : t("login")}
            size={"btn-lg"}
            type={"btn-primary"}
            arrow={"arrow-none"}
            element={"button"}
            customStyles={{ width: "100%" }}
            onClick={() => handleSubmit({ email, password })}
            ArrowDownSvg={<SigninLogo />}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { getChatbotInputs } from "./inputs";
import BotSvg from "../../assets/svgs/BotSvg";
import { EditIcon } from "../../assets/svgs";
import { Switches } from "../../UI/Switches/Switches";
import { setCompanyDetails } from "../../store/userReducer ";
import { useTranslation } from "react-i18next";

import styles from "./BotConfig.module.css";

const BotConfig = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.user.company);
  const [isChatbotEnabled, setIsChatbotEnabled] = useState(company.bot_active);
  const [edit, setEdit] = useState(true);
  const [formData, setFormData] = useState({
    _id: company._id,
    fb_chat_id: company.fb_chat_id || "",
    insta_chat_id: company.insta_chat_id || "",
    openai_api_key: company.openai_api_key || "",
    fb_page_access_token: company.fb_page_access_token || "",
    insta_page_access_token: company.insta_page_access_token || "",
    system_instructions: company.system_instructions || "",
    bot_active: company.bot_active || false,
  });

  useEffect(() => {
    setIsChatbotEnabled(formData.bot_active);
  }, [formData.bot_active]);

  const handleChatbotToggle = async () => {
    try {
      const response = await axios.post("/company/toggle-bot-status", {
        _id: company._id,
        bot_active: !isChatbotEnabled,
      });

      dispatch(setCompanyDetails(response.data.company));
      setFormData((prev) => ({
        ...prev,
        bot_active: response.data.company.bot_active,
      }));

      toast.success(
        t("botConfig.successToggling", {
          status: response.data.company.bot_active
            ? t("botConfig.enabled")
            : t("botConfig.disabled"),
        })
      );
    } catch (error) {
      console.error("Error toggling bot status:", error);
      toast.error(t("botConfig.errorToggling"));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/company/edit-bot-config", formData);
      dispatch(setCompanyDetails(response.data.company));

      toast.success(t("botConfig.successSaving"));
    } catch (error) {
      console.error("Error saving bot configuration:", error);
      toast.error(t("botConfig.errorSaving"));
    }
  };

  const chatbotInputs = getChatbotInputs(formData, setFormData, t);
  console.log(isChatbotEnabled);
  

  return (
    <div className={styles.botConfigPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("botConfig.title")}</h1>
        <div className={styles.switchWrapper}>
          <BotSvg />
          <div>
            <p className={styles.switchLabel}>
              <span>{t("botConfig.status")}:</span>
              <span
                className={isChatbotEnabled ? styles.active : styles.inactive}
              >
                {isChatbotEnabled
                  ? t("botConfig.enabled")
                  : t("botConfig.disabled")}
              </span>
            </p>
            <Switches
              value={isChatbotEnabled}
              onChange={handleChatbotToggle}
            />
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className={styles.botConfigLayout}>
            {chatbotInputs.map((input, index) => (
              <Input
                key={index}
                type={input.type || "text"}
                label={input.title}
                value={input.value}
                name={input.name}
                onChange={input.onChange}
                placeholder={input.placeholder}
                editable={edit}
              />
            ))}

            <div className={styles.saveSection}>
              <Button
                label={t("botConfig.saveChanges")}
                size="btn-lg"
                type="btn-primary"
                element="button"
                svg={<EditIcon />}
                onClick={handleSave}
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default BotConfig;

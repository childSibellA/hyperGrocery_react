export const getChatbotInputs = (formData, setFormData, t) => [
  {
    title: t("chatbotConfig.facebookChatId"),
    name: "fb_chat_id",
    type: "default",
    placeholder: t("chatbotConfig.enterFacebookChatId"),
    value: formData.fb_chat_id || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("chatbotConfig.facebookPageAccessToken"),
    name: "fb_page_access_token",
    type: "default",
    placeholder: t("chatbotConfig.enterFacebookPageAccessToken"),
    value: formData.fb_page_access_token || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("chatbotConfig.instagramChatId"),
    name: "insta_chat_id",
    type: "default",
    placeholder: t("chatbotConfig.enterInstagramChatId"),
    value: formData.insta_chat_id || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("chatbotConfig.instagramPageAccessToken"),
    name: "insta_page_access_token",
    type: "default",
    placeholder: t("chatbotConfig.enterInstagramPageAccessToken"),
    value: formData.insta_page_access_token || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("chatbotConfig.openaiApiKey"),
    name: "openai_api_key",
    type: "default",
    placeholder: t("chatbotConfig.enterOpenaiApiKey"),
    value: formData.openai_api_key || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("chatbotConfig.systemInstructions"),
    name: "system_instructions",
    type: "textarea",
    placeholder: t("chatbotConfig.enterSystemInstructions"),
    value: formData.system_instructions || "",
    onChange: (e) =>
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
  },
  {
    title: t("chatbotConfig.botActive"),
    name: "bot_active",
    type: "switch",
    value: formData.bot_active || false,
    onChange: () =>
      setFormData((prev) => ({
        ...prev,
        bot_active: !formData.bot_active,
      })),
  },
];

import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  email: null,
  access_token: null,
  user: null,
  isLoading: false,
  roles: [null],
  companyId: null,
  sections: {
    customers: false,
    orders: false,
    invoices: false,
    services: false,
    expenses: false,
    statistics: false,
  },
  company: {
    name: "",
    email: "",
    address: "",
    registration_id: "",
    logo: "",
    logo1: "",
    logo2: "",
    logo3: "",
    phone_number: {
      code: "",
      flag: "",
      number: "",
    },
    payment_methods: [
      {
        bank_name: "",
        account_number: "",
      },
    ],
    status: "",
  },
  bot_active: false,
  fb_chat_id: "",
  insta_chat_id: "",
  openai_api_key: "",
  fb_page_access_token: "",
  insta_page_access_token: "",
  system_instructions: "",
};

const userReducer = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    logIn(state, action) {
      return {
        ...state,
        email: action.payload.email,
        access_token: action.payload.access_token,
        user: action.payload.user,
        roles: action.payload.roles,
        companyId: action.payload.companyId,
        company: action.payload.company,
      };
    },
    logOut: () => {
      // Correctly resetting state to the initial state
      return INIT_STATE;
    },
    setIsLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setNewAccessToken(state, action) {
      return {
        ...state,
        access_token: action.payload.access_token,
      };
    },
    setCompanyDetails(state, action) {
      return {
        ...state,
        company: action.payload,
      };
    },
    setSections(state, action) {
      return {
        ...state,
        sections: action.payload,
      };
    },
  },
});

export const {
  logIn,
  logOut,
  setOperators,
  setIsLoading,
  setNewAccessToken,
  setCompanyDetails,
  setSections,
} = userReducer.actions;

export default userReducer.reducer;

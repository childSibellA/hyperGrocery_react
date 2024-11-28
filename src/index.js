import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import ErrorBoundary from "./Utils/ErrorBoundary";
import App from "./App";
import './i18n';

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ErrorBoundary />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </PersistGate>
    </Provider>
    <ErrorBoundary />
  </BrowserRouter>
);

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminHeader } from "./components/Header/AdminHeader";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import InvoiceList from "./components/InvoiceList/InvoiceList";
import Customers from "./components/Customers/Customer";
import RequireAuth from "./Utils/RequireAuth";
import AllAccounts from "./components/AllAccounts/AllAccounts";
import ServiceType from "./components/ServiceType/ServiceType";
import Login from "./components/Login/Login";
import Expense from "./components/Expense/Expense";
import ServiceItem from "./components/ServiceItem/ServiceItem";
import ExpenseCategory from "./components/ExpenseCategory/ExpenseCategory";
import Order from "./components/Order/Order";
import ServiceCompany from "./components/ServiceCompany/ServiceCompany";
import CheckInputs from "./UI/CheckInputs";
import Sidebar from "./components/Sidebar/Sidebar";
import Landing from "./components/Landing/Landing";
import Registration from "./components/Registration/Registration";
import TermsOfUse from "./components/Legal/TermsOfUse";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import UserProfile from "./components/UserProfile/UserProfile";
import BotConfig from "./components/Bot/BotConfig";
import AllCompany from "./components/AllCompany/AllCompany";
import Statistic from "./components/Statistics/Statistic";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const access_token = useSelector((state) => state.user.access_token);
  return (
    <main className="App">
      <AdminHeader />
      {access_token ? (
        <div className={`admin-container`}>
          <Sidebar />
          <Routes>
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              element={
                <RequireAuth allowedRoles={["OPERATOR", "SUPER_ADMIN"]} />
              }
            >
              <Route path="/user-account" element={<UserProfile />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/invoice" element={<InvoiceList />} />
              <Route path="/services" element={<ServiceItem />} />
              <Route path="/checkinputs" element={<CheckInputs />} />
              <Route path="/all-company" element={<AllCompany />} />
              <Route path="/statistics" element={<Statistic />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["SUPER_ADMIN"]} />}>
              <Route path="/company-account" element={<CompanyProfile />} />
              <Route path="/bot-config" element={<BotConfig />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/all-accounts" element={<AllAccounts />} />
              <Route
                path="/settings/expense-category"
                element={<ExpenseCategory />}
              />
              <Route
                path="/settings/service-company"
                element={<ServiceCompany />}
              />
              <Route path="/settings/service-type" element={<ServiceType />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["GOD"]} />}>
              <Route path="/all-company" element={<AllCompany />} />
            </Route>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Landing />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="*"
            element={
              location.pathname === "/" ? null : <Navigate to="/" replace />
            }
          />
        </Routes>
      )}
    </main>
  );
}

export default App;

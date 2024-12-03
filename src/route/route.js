import { Routes, Route } from "react-router-dom";
import LoginWrapper from "../Auth/login";
import DashboardWrapper from "../Panel/dashboardWrapper";
import Layout from "../components/Layout";
import BeneficiaryWrapper from "../Panel/Beneficiary/beneficiary";
import AddBeneficiaryPage from "../Panel/Beneficiary/addbeneficiarypage";
import BankDetailsPage from "../Panel/Beneficiary/BankDetailspage";
import CaptureImagePage from "../Panel/Beneficiary/captureImage";
import UserProfilePage from "../Panel/Beneficiary/userProfile";
import RecordPayment from "../Panel/Beneficiary/recordpayment";
import RecordWrapper from "../Panel/Records/record";
import SettingsWrapper from "../Panel/Settings/settingsWrapper";
import RegisterAdminPage from "../Panel/Settings/add-admin";

const RouteWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginWrapper />} />
      <Route path="panel" element={<Layout />}>
        <Route path="/panel/dashboard" element={<DashboardWrapper />} />
        <Route path="/panel/beneficiaries" element={<BeneficiaryWrapper />} />
        <Route path="/panel/add-beneficiary" element={<AddBeneficiaryPage />} />
        <Route path="/panel/add-bank-details" element={<BankDetailsPage />} />
        <Route path="/panel/capturing" element={<CaptureImagePage />} />
        <Route path="/panel/user/profile" element={<UserProfilePage />} />
        <Route path="/panel/record" element={<RecordPayment />} />
        <Route path="/panel/reports" element={<RecordWrapper />} />
        <Route path="/panel/settings" element={<SettingsWrapper />} />
        <Route path="/panel/add-admin" element={<RegisterAdminPage />} />
      </Route>
    </Routes>
  );
};

export default RouteWrapper;

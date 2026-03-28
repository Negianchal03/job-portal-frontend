import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/UserLogin/Signup";
import Login from "./Pages/UserLogin/Login";
import VerifyOtp from "./Pages/UserLogin/VerifyOtp";
import ResetPassword from "./Pages/UserLogin/ResetPassword";
import EmployeeDashboard from "./Pages/EmployeeDashboard.jsx";
import EmployerDashboard from "./Pages/EmployerDashboard.jsx";
import Jobs from "./Pages/Jobs/Jobs.jsx";
import AppliedJobs from "./Pages/Jobs/AppliedJobs.jsx";
import SavedJobs from "./Pages/Jobs/SavedJobs.jsx";
import JobDetails from "./Pages/Jobs/JobDetails.jsx";
import Settings from "./Pages/Jobs/Settings.jsx";
import AddJob from "./Pages/Jobs/AddJob.jsx";
import HomePlaceholder from "./Pages/HomePlaceHolder.jsx";

import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Pricing from "./Pages/Pricing.jsx";

function App() {
  return (
    <Routes>

      {/* User auth routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Employee Dashboard */}
      <Route path="/employee-dashboard" element={<EmployeeDashboard />}>
        <Route index element={<HomePlaceholder />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applied-jobs" element={<AppliedJobs />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
        <Route path="job-details/:id" element={<JobDetails />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Employer Dashboard */}
      <Route path="/employer-dashboard" element={<EmployerDashboard />}>
        <Route index element={<HomePlaceholder />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="job-details/:id" element={<JobDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>

    </Routes>
  );
}

export default App;
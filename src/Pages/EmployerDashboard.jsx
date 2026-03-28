import Header from "../Components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Building2,
  Settings
} from "lucide-react";

function EmployerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white relative overflow-hidden">

      <Header />

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-64 min-h-screen bg-zinc-900/70 backdrop-blur-xl border-r border-zinc-800 p-6 flex flex-col justify-between">

          {/* TOP SECTION */}
          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-10">
              Employer Panel
            </h2>

            <ul className="space-y-4">

              {/* Jobs */}
              <li
                onClick={() => navigate("jobs")}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-purple-600/10"
              >
                <Briefcase size={20} className="text-purple-400" />
                <span>Jobs</span>
              </li>

              {/* Add Job */}
              <li
                onClick={() => navigate("add-job")}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-purple-600/10"
              >
                <Building2 size={20} className="text-purple-400" />
                <span>Add Job</span>
              </li>

              {/* Settings */}
              <li
                onClick={() => navigate("settings")}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-purple-600/10"
              >
                <Settings size={20} className="text-purple-400" />
                <span>Settings</span>
              </li>

            </ul>
          </div>

         
          <div className="text-xs text-zinc-500">
            © 2026 JobPortal
          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-12 py-10">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default EmployerDashboard;
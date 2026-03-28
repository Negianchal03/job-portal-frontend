import Header from "../Components/Header";
import { Search, Briefcase, Bookmark, Settings } from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";

function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white relative overflow-hidden">

      <Header />

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-64 min-h-screen bg-zinc-900/70 backdrop-blur-xl border-r border-zinc-800 p-6 flex flex-col justify-between">

          <div>
            <h2 className="text-xl font-semibold text-purple-400 mb-10">
              Employee Panel
            </h2>

            <ul className="space-y-4">
              <li onClick={() => navigate("jobs")} className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-purple-600/10">
                <Search size={20} className="text-purple-400" />
                <span>Jobs</span>
              </li>

              <li onClick={() => navigate("saved-jobs")} className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-purple-600/10">
                <Bookmark size={20} className="text-purple-400" />
                <span>Saved Jobs</span>
              </li>

              <li onClick={() => navigate("applied-jobs")} className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-purple-600/10">
                <Briefcase size={20} className="text-purple-400" />
                <span>Applied Jobs</span>
              </li>

              <li onClick={() => navigate("settings")} className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer hover:bg-purple-600/10">
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

export default EmployeeDashboard;
import { MapPin, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../Services/axiosConfig";

function Jobs() {
  const navigate = useNavigate();
  const location = useLocation();

  const [applyVisible, setApplyVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //ROLE
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "employee";


  const defaultJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹18 LPA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Adobe",
      location: "Noida",
      type: "Full Time",
      salary: "₹14 LPA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Amazon",
      location: "Hyderabad",
      type: "Hybrid",
      salary: "₹20 LPA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      id: 4,
      title: "React Developer",
      company: "Meta",
      location: "Remote",
      type: "Contract",
      salary: "₹16 LPA",
      logo: "https://1000logos.net/wp-content/uploads/2021/10/Meta-Logo.png",
    },
    {
      id: 5,
      title: "Product Designer",
      company: "Microsoft",
      location: "Mumbai",
      type: "Full Time",
      salary: "₹22 LPA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      id: 6,
      title: "Software Engineer",
      company: "TCS",
      location: "Pune",
      type: "Full Time",
      salary: "₹9 LPA",
      logo: "https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png",
    },
  ];

  
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs([...defaultJobs, ...storedJobs]);
  }, []);


  useEffect(() => {
    if (location.state?.refresh) {
      const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      setJobs([...defaultJobs, ...storedJobs]);
    }
  }, [location.state]);

  const handleApplyJob = async (job) => {
    try {
      const jobData = {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
        logo: job.logo,
      };

      const res = await api.post("/auth/job/apply", { job: jobData });
      console.log("Applied successfully:", res.data);

      setApplyVisible(true);
      setTimeout(() => setApplyVisible(false), 3000);
    } catch (err) {
      console.error("Apply error:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to apply job");
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    }
  };

  return (
    <div className="px-12 py-10 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-10">
        Explore <span className="text-purple-400">Latest Jobs</span>
      </h1>

      {applyVisible && (
        <div className="fixed top-5 z-50 bg-gradient-to-r from-green-700 to-purple-900 text-white px-6 py-3 rounded-xl shadow-lg">
          Job applied successfully!
        </div>
      )}

      {errorVisible && (
        <div className="fixed top-5 z-50 bg-gradient-to-r from-red-700 to-purple-900 text-white px-6 py-3 rounded-xl shadow-lg">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-zinc-900/70 border border-purple-800/30 p-6 rounded-2xl backdrop-blur-lg hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-purple-300">{job.title}</h2>
                <p className="text-zinc-400 mt-1">{job.company}</p>
              </div>

              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 shadow-md">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/*  Icon + Text Alignment Fixed */}
            <div className="flex items-center gap-6 mt-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{job.type}</span>
              </div>
            </div>

            <p className="text-lg font-bold mt-4 text-purple-400">{job.salary}</p>

            <div className="flex gap-4 mt-6">

              {role === "employee" && (
                <>
                  <button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg"
                    onClick={() => handleApplyJob(job)}
                  >
                    Apply Now
                  </button>

                  <button
                    className="flex-1 border border-purple-500 text-purple-400 py-2 rounded-lg"
                    onClick={() =>
                      navigate(`/employee-dashboard/job-details/${job.id}`)
                    }
                  >
                    Details
                  </button>
                </>
              )}

              {role === "employer" && (
                <button
                  className="w-full bg-purple-600 py-2 rounded-lg"
                  onClick={() =>
                    navigate(`/employer-dashboard/job-details/${job.id}`)
                  }
                >
                  View Details
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;







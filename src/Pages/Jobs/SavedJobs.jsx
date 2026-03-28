import { useEffect, useState } from "react";
import { MapPin, Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/axiosConfig"; 

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyVisible, setApplyVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const savedRes = await api.get("/auth/job/saved");
        setSavedJobs(savedRes.data.savedJobs || []);

        const appliedRes = await api.get("/auth/job/applied");
        setAppliedJobs(appliedRes.data.appliedJobs.map((j) => j.jobId));
      } catch (err) {
        console.error("Failed to fetch jobs:", err.response || err.message);
        setErrorMessage(err.response?.data?.message || "Failed to load jobs");
        setErrorVisible(true);
        setTimeout(() => setErrorVisible(false), 3000);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // REMOVE SAVED JOB
  const handleRemoveJob = async (jobId) => {
    try {
      await api.delete("/auth/job/remove", { data: { jobId } });
      setSavedJobs((prev) => prev.filter((job) => job.jobId !== jobId));
      setApplyVisible(true);
      setTimeout(() => setApplyVisible(false), 3000);
    } catch (err) {
      console.error("Failed to remove job:", err.response || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to remove job");
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    }
  };

  // APPLY JOB
  const handleApplyJob = async (job) => {
    try {
      await api.post("/auth/job/apply", {
        job: {
          id: job.jobId,
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          salary: job.salary,
          logo: job.logo,
        },
      });

      setAppliedJobs((prev) => [...prev, job.jobId]);
      setApplyVisible(true);
      setTimeout(() => setApplyVisible(false), 3000);
    } catch (err) {
      console.error("Failed to apply job:", err.response || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to apply job");
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    }
  };

  // NAVIGATE TO DETAILS
  const handleDetails = (jobId) => {
    navigate(`/employee-dashboard/job-details/${jobId}`, {
      state: { fromSavedPage: true },
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );

  if (savedJobs.length === 0)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        No saved jobs yet.
      </div>
    );

  return (
    <div className="px-12 py-10 min-h-screen bg-black text-white">
      {/* Alerts */}
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

      <h1 className="text-3xl font-bold mb-10">
        Saved <span className="text-purple-400">Jobs</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedJobs.map((job) => (
          <div
            key={job.jobId}
            className="relative bg-zinc-900/70 border border-purple-800/30 p-6 rounded-2xl backdrop-blur-lg hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-xl transition duration-300"
          >
            {/* Remove button */}
            <button
              className="absolute top-0.5 right-3 text-red-500 hover:text-red-400"
              onClick={() => handleRemoveJob(job.jobId)}
            >
              <X size={20} />
            </button>

            {/* Top Section */}
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
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/80?text=" + job.company.charAt(0);
                  }}
                />
              </div>
            </div>

            {/* Location + Type */}
            <div className="flex items-center gap-4 mt-4 text-sm text-zinc-400">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {job.type}
              </span>
            </div>

            {/* Salary */}
            <p className="text-lg font-bold mt-4 text-purple-400">{job.salary}</p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className={`flex-1 transition py-2 rounded-lg font-medium ${
                  appliedJobs.includes(job.jobId)
                    ? "bg-purple-600 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                onClick={() => handleApplyJob(job)}
                disabled={appliedJobs.includes(job.jobId)}
              >
                {appliedJobs.includes(job.jobId) ? "Applied" : "Apply Now"}
              </button>

              <button
                className="flex-1 border border-purple-500 text-purple-400 hover:bg-purple-600/10 transition py-2 rounded-lg font-medium"
                onClick={() => handleDetails(job.jobId)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedJobs;
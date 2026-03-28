import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../Services/axiosConfig";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fromSavedPage = location.state?.fromSavedPage || false;
  const fromAppliedPage = location.state?.fromAppliedPage || false;

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "employee";

  const [saving, setSaving] = useState(false);
  const [applyVisible, setApplyVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [job, setJob] = useState(null);

  const defaultJobs = [
    { id: 1, title: "Frontend Developer", company: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", location: "Bangalore", type: "Full Time", salary: "₹18 LPA", description: "Build interactive and responsive UIs using React. Collaborate with designers and backend developers to implement seamless web applications. Ensure high performance and code quality.", experience: "2-4 years", skills: "React, JS, HTML, CSS" },
    { id: 2, title: "UI/UX Designer", company: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg", location: "Noida", type: "Full Time", salary: "₹14 LPA", description: "Design intuitive and visually appealing user interfaces for web and mobile applications. Collaborate with product managers and developers to create seamless user experiences, while maintaining design consistency and usability standards.", experience: "3-5 years", skills: "Figma, Adobe XD, Photoshop" },
    { id: 3, title: "Backend Developer", company: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", location: "Hyderabad", type: "Hybrid", salary: "₹20 LPA", description: "Develop, test, and maintain robust APIs using Node.js and Express. Collaborate with frontend developers to integrate services, optimize performance, and ensure scalable, secure, and maintainable backend solutions.", experience: "2-5 years", skills: "Node.js, Express, MongoDB, SQL" },
    { id: 4, title: "React Developer", company: "Meta", logo: "https://1000logos.net/wp-content/uploads/2021/10/Meta-Logo.png", location: "Remote", type: "Contract", salary: "₹16 LPA", description: "Develop and maintain scalable React applications. Collaborate with designers and backend developers to build responsive, high-performance user interfaces. Ensure code quality, reusability, and best practices across projects.", experience: "1-3 years", skills: "React, Redux, JS" },
    { id: 5, title: "Product Designer", company: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", location: "Mumbai", type: "Full Time", salary: "₹22 LPA", description: "Design end-to-end product experiences, from research and wireframes to high-fidelity prototypes. Collaborate with cross-functional teams to create user-friendly, visually appealing, and functional products. Conduct user testing and iterate designs based on feedback.", experience: "3-6 years", skills: "Figma, Adobe Suite, UX Research" },
    { id: 6, title: "Software Engineer", company: "TCS", logo: "https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png", location: "Pune", type: "Full Time", salary: "₹9 LPA", description: "Develop full-stack enterprise applications, including frontend, backend, and database components. Collaborate with cross-functional teams to implement scalable, maintainable, and high-performance solutions. Participate in code reviews, testing, and deployment processes to ensure quality and reliability.", experience: "2-4 years", skills: "Java, Spring, SQL" },
  ];

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedStoredJobs = storedJobs.map(j => ({
      ...j,
      logo: j.logo || `https://via.placeholder.com/150/000000/FFFFFF?text=${j.company.charAt(0)}`
    }));
    const allJobs = [...defaultJobs, ...updatedStoredJobs];
    const foundJob = allJobs.find(j => j.id === parseInt(id));

    if (!foundJob) {
      navigate(role === "employee" ? "/employee-dashboard/jobs" : "/employer-dashboard/jobs", { state: { refresh: true } });
    } else {
      setJob(foundJob);
    }
  }, [id, navigate, role]);

  // APPLY, SAVE, REMOVE JOB
  const handleApplyJob = async () => {
    try {
      await api.post("/auth/job/apply", { job });
      setApplyVisible(true);
      setTimeout(() => setApplyVisible(false), 3000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to apply job");
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    }
  };

  const handleSaveJob = async () => {
    try {
      setSaving(true);
      await api.post("/auth/job/save", { job });
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to save job");
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFromSaved = async () => {
    try {
      setSaving(true);
      await api.delete("/auth/job/remove", { data: { jobId: job.id } });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigate("/employee-dashboard/saved-jobs");
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to remove job");
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFromApplied = async () => {
    try {
      setSaving(true);
      await api.delete("/auth/job/remove-applied", { data: { jobId: job.id } });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigate("/employee-dashboard/applied-jobs");
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to remove applied job");
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  // EMPLOYER EDIT / DELETE
  const handleEditJob = () => {
    navigate("/employer-dashboard/add-job", { state: { jobToEdit: job } });
  };

  const handleDeleteJob = () => {
    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = existingJobs.filter(j => j.id !== job.id);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    navigate(role === "employee" ? "/employee-dashboard/jobs" : "/employer-dashboard/jobs", { state: { refresh: true } });
  };

  if (!job)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Job Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-12 px-4 text-white relative">
      {alertVisible && (
  <div
    className={`fixed top-5 z-50 px-6 py-3 rounded-xl ${
      fromAppliedPage || fromSavedPage
        ? "bg-gradient-to-r from-red-700 to-purple-900"
        : "bg-gradient-to-r from-green-700 to-purple-900"
    }`}
  >
    {fromAppliedPage
      ? "Job removed from applied!"
      : fromSavedPage
      ? "Job removed from saved!"
      : "Job saved successfully!"}
  </div>
)}

      {applyVisible && (
        <div className="fixed top-5 z-50 bg-gradient-to-r from-green-700 to-purple-900 px-6 py-3 rounded-xl">
          Job applied successfully!
        </div>
      )}

      {errorVisible && (
        <div className="fixed top-5 z-50 bg-gradient-to-r from-red-700 to-purple-900 px-6 py-3 rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-700 w-full max-w-2xl shadow-lg">
        <button onClick={() => navigate(-1)} className="mb-6 bg-purple-600 px-4 py-2 rounded-lg">← Back</button>

        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <h1 className="text-3xl font-bold text-purple-400">{job.company}</h1>
            <p className="text-lg mt-1 text-zinc-300">{job.location}</p>
            <p className="text-lg font-semibold text-purple-300">{job.salary}</p>
            <h2 className="text-2xl font-bold mt-2 text-purple-400">{job.title}</h2>
          </div>

          <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center">
            <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-2xl border border-purple-700 mb-4">
          <h3 className="text-xl font-semibold text-purple-300">Job Description</h3>
          <p className="mt-2 text-zinc-400">{job.description}</p>
        </div>

        <div className="bg-zinc-800 p-6 rounded-2xl border border-purple-700 mb-4">
          <h3 className="text-xl font-semibold text-purple-300">Experience & Skills</h3>
          <p className="mt-2 text-zinc-400"><strong>Experience:</strong> {job.experience}</p>
          <p className="mt-1 text-zinc-400"><strong>Skills:</strong> {job.skills}</p>
        </div>

        <div className="flex gap-4 mt-6">
          {role === "employee" && (
            <>
              <button className="flex-1 bg-purple-600 py-3 rounded-lg" onClick={handleApplyJob} disabled={fromAppliedPage}>
                {fromAppliedPage ? "Applied" : "Apply Now"}
              </button>

              <button className="flex-1 border border-purple-500 py-3 rounded-lg"
                onClick={fromAppliedPage ? handleRemoveFromApplied : fromSavedPage ? handleRemoveFromSaved : handleSaveJob}>
                {fromAppliedPage ? "Remove from Applied" : fromSavedPage ? "Remove from Saved" : "Save"}
              </button>
            </>
          )}

          {role === "employer" && (
            <>
              <button className="flex-1 bg-purple-700 py-3 rounded-lg" onClick={handleEditJob}>Edit Job</button>
              <button className="flex-1 bg-purple-700 py-3 rounded-lg" onClick={handleDeleteJob}>Delete Job</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;




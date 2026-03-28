import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddJob() {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [type, setType] = useState("Full Time");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    const jobToEdit = location.state?.jobToEdit;
    if (jobToEdit) {
      setJobId(jobToEdit.id);
      setTitle(jobToEdit.title);
      setCompany(jobToEdit.company);
      setLocationInput(jobToEdit.location);
      setType(jobToEdit.type);
      setSalary(jobToEdit.salary);
      setDescription(jobToEdit.description);
      setExperience(jobToEdit.experience);
      setSkills(jobToEdit.skills);
    }
  }, [location.state]);

  const handleAddJob = () => {
    if (!title || !company || !locationInput || !salary) {
      alert("Please fill all required fields!");
      return;
    }

    const salaryWithRupee = salary.startsWith("₹") ? salary : "₹" + salary;

    const logoLetter = company.trim() ? company.trim().charAt(0).toUpperCase() : "A";
    const logoUrl = `https://via.placeholder.com/80/6b21a8/ffffff?text=${encodeURIComponent(logoLetter)}`;

    const newJob = {
      id: jobId || Date.now(),
      title,
      company,
      location: locationInput,
      type,
      salary: salaryWithRupee,
      description,
      experience,
      skills,
      logo: logoUrl,
      appliedBy: [],
      savedBy: [],
    };

    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if (jobId) {
      // Edit
      const updatedJobs = existingJobs.map(j => (j.id === jobId ? newJob : j));
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    } else {
      // Add new
      localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));
    }

    navigate("/employer-dashboard/jobs", { state: { refresh: true } });
  };

  return (
    <div className="px-6 py-6 min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">
        {jobId ? "Edit" : "Add"} <span className="text-purple-400">Job</span>
      </h1>

      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md space-y-4">
        <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded" />
        <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded" />
        <input type="text" placeholder="Location" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded" />
        <input type="text" placeholder="Salary (e.g., 15 LPA)" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded">
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Contract</option>
          <option>Hybrid</option>
          <option>Remote</option>
        </select>
        <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded" />
        <input type="text" placeholder="Experience Required (e.g., 2-4 years)" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded" />
        <input type="text" placeholder="Skills (e.g., React, JS)" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded" />

        <button onClick={handleAddJob} className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700 transition">
          {jobId ? "Save Changes" : "Post Job"}
        </button>
      </div>
    </div>
  );
}

export default AddJob;





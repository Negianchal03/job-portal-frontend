import React from "react";
import { Search, Briefcase, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePlaceholder() {
 
  const featuredJobs = [
    { id: 1, title: "Frontend Developer", company: "Google", location: "Bangalore", salary: "₹18 LPA" },
    { id: 2, title: "UI/UX Designer", company: "Adobe", location: "Noida", salary: "₹14 LPA" },
    { id: 3, title: "Backend Developer", company: "Amazon", location: "Hyderabad", salary: "₹20 LPA" },
    { id: 4, title: "React Developer", company: "Meta", location: "Remote", salary: "₹16 LPA" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white relative overflow-x-hidden px-4">

     
      <section className="flex flex-col items-center text-center mt-16 md:mt-24 mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Let's find your dream job
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl">
          Explore opportunities that match your skills and interests
        </p>

        
        <div className="flex items-center w-full max-w-xl mx-auto bg-zinc-800 rounded-xl border border-purple-700 overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search for jobs, skills, or companies..."
            className="flex-1 px-6 py-4 bg-transparent text-white placeholder:text-zinc-400 focus:outline-none"
          />
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-4 flex items-center justify-center">
            <Search size={20} />
            <span className="ml-2 text-white font-semibold">Search</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {["Frontend Developer", "React", "UI/UX Designer", "Node.js", "Product Designer", "Java"].map((tag, idx) => (
            <span key={idx} className="px-4 py-2 bg-zinc-700 text-zinc-200 rounded-full text-sm hover:bg-purple-600/70 cursor-pointer transition-all">
              {tag}
            </span>
          ))}
        </div>
      </section>

     
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div key={job.id} className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg hover:shadow-purple-700 transition-all cursor-pointer">
              <h3 className="text-xl font-semibold text-white">{job.title}</h3>
              <p className="text-zinc-400 mt-1">{job.company} • {job.location}</p>
              <p className="text-purple-300 mt-2 font-medium">{job.salary}</p>
              <Link to={`/employee-dashboard/job-details/${job.id}`} className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

    
      <section className="mb-20 text-center">
        <h2 className="text-3xl font-bold text-purple-400 mb-8">Why Join Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <Users size={32} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Massive Network</h3>
            <p className="text-zinc-300">Connect with top companies and professionals worldwide.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <Star size={32} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Top Companies</h3>
            <p className="text-zinc-300">Get opportunities from leading tech giants and startups.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <Briefcase size={32} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
            <p className="text-zinc-300">Explore roles that match your skills and help you grow.</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-zinc-500">
        © 2026 JobPortal. All rights reserved.
      </footer>

    </div>
  );
}
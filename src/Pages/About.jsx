import React from "react";
import { Users, Star, Briefcase } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-12">

      
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          About HireNest
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
          We connect talented professionals with their dream jobs. Our mission is to make job search easy, efficient, and enjoyable.
        </p>
      </section>

     
      <section className="mb-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-purple-400 mb-6">Our Mission & Vision</h2>
        <p className="text-zinc-300 text-lg mb-4">
          Our mission is to empower professionals by connecting them to meaningful career opportunities across the globe.
        </p>
        <p className="text-zinc-300 text-lg">
          Our vision is to create a seamless job portal where companies and talent meet effortlessly.
        </p>
      </section>

     
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-purple-400 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <Users size={32} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vast Network</h3>
            <p className="text-zinc-300">Connect with top companies and professionals worldwide.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <Star size={32} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Companies</h3>
            <p className="text-zinc-300">Get opportunities from leading tech giants and innovative startups.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <Briefcase size={32} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
            <p className="text-zinc-300">Find roles that match your skills and help you grow professionally.</p>
          </div>
        </div>
      </section>

      
      <section className="mb-16 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-400 mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <h3 className="text-4xl font-bold text-purple-400 mb-2">10K+</h3>
            <p className="text-zinc-300">Jobs Posted</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <h3 className="text-4xl font-bold text-purple-400 mb-2">5K+</h3>
            <p className="text-zinc-300">Happy Employees</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
            <h3 className="text-4xl font-bold text-purple-400 mb-2">500+</h3>
            <p className="text-zinc-300">Companies Registered</p>
          </div>
        </div>
      </section>

      
      <footer className="text-center py-8 text-zinc-500">
        © 2026 JobPortal. All rights reserved.
      </footer>
    </div>
  );
}
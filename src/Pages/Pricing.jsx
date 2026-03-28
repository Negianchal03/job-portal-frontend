import React from "react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-12">

      
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Our Pricing Plans
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
          Choose a plan that fits your career goals. Upgrade anytime to unlock premium features.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-700 shadow-lg flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Basic</h2>
          <p className="text-4xl font-bold text-white mb-2">Free</p>
          <p className="text-zinc-400 mb-6">Access to limited job listings and basic profile features.</p>
          <ul className="mb-6 text-zinc-300 space-y-2">
            <li>✔️ View jobs</li>
            <li>✔️ Save jobs</li>
            <li>❌ Apply to jobs</li>
            <li>❌ Premium support</li>
          </ul>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium">
            Start Free
          </button>
        </div>

        
        <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-700 shadow-lg flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Standard</h2>
          <p className="text-4xl font-bold text-white mb-2">₹499/mo</p>
          <p className="text-zinc-400 mb-6">Unlock more opportunities and apply to jobs directly.</p>
          <ul className="mb-6 text-zinc-300 space-y-2">
            <li>✔️ View jobs</li>
            <li>✔️ Save jobs</li>
            <li>✔️ Apply to jobs</li>
            <li>❌ Premium support</li>
          </ul>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium">
            Choose Plan
          </button>
        </div>

       
        <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-700 shadow-lg flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Premium</h2>
          <p className="text-4xl font-bold text-white mb-2">₹999/mo</p>
          <p className="text-zinc-400 mb-6">All features included plus premium support and career guidance.</p>
          <ul className="mb-6 text-zinc-300 space-y-2">
            <li>✔️ View jobs</li>
            <li>✔️ Save jobs</li>
            <li>✔️ Apply to jobs</li>
            <li>✔️ Premium support & guidance</li>
          </ul>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium">
            Choose Plan
          </button>
        </div>

      </section>

     
      <section className="text-center mt-16">
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
          Upgrade your plan anytime to take full advantage of HireNest premium features and accelerate your job search!
        </p>
      </section>

    </div>
  );
}
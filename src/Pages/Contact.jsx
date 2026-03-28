import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-12">

      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
          Have questions or want to connect? Send us a message and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* ===== Contact Info ===== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 text-center">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
          <Mail size={32} className="text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-zinc-300">support@hirenest.com</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
          <Phone size={32} className="text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <p className="text-zinc-300">+91 98765 43210</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-700 shadow-lg">
          <MapPin size={32} className="text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <p className="text-zinc-300">123 HireNest Street, Tech City, India</p>
        </div>
      </section>

      {/* ===== Contact Form ===== */}
      <section className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-2xl border border-purple-700 shadow-lg">
        {success && (
          <div className="mb-4 bg-green-700 text-white p-3 rounded-xl text-center">
            Message sent successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-4 rounded-lg border border-purple-500 bg-zinc-800 text-white focus:outline-none focus:border-purple-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-4 rounded-lg border border-purple-500 bg-zinc-800 text-white focus:outline-none focus:border-purple-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            className="p-4 rounded-lg border border-purple-500 bg-zinc-800 text-white focus:outline-none focus:border-purple-400"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
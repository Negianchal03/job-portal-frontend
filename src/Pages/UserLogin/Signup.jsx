import { useState } from "react";
import { signupUser } from "../../Services/authService";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.phone ||
      !form.role
    ) {
      setError("All fields are required");
      return;
    }

    try {
      await signupUser(form);
      setSuccess("User registered. OTP sent to email");

      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email: form.email, type: "signup" },
        });
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden bg-black shadow-2xl">

        {/* LEFT PANEL */}
        <div className="hidden md:flex w-1/2 relative overflow-hidden rounded-l-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b0764] via-[#1e0035] to-black" />
          <div className="absolute top-10 right-10 w-40 h-40 bg-purple-600/20 blur-3xl rounded-full" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-purple-500/20 blur-3xl rounded-full" />

          <div className="absolute top-0 left-0 w-full bg-black/70 backdrop-blur-md px-6 py-4 flex items-center gap-4 z-10">
            <img src={logo} alt="HireNest" className="w-20 h-16 object-contain" />
            <div>
              <h2 className="text-xl font-semibold text-purple-300">
                HireNest
              </h2>
              <p className="text-xs text-purple-200">
                Your Future, Connected
              </p>
            </div>
          </div>

          <div className="relative z-10 text-white w-full flex flex-col items-center justify-center px-10 pt-10">
            <img
              src={logo}
              alt="HireNest"
              className="w-96 md:w-[420px] mb-6 object-contain drop-shadow-[0_0_60px_rgba(168,85,247,0.9)]"
            />
            <h1 className="text-3xl font-bold mb-3 text-center">
              Get Started with Us
            </h1>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md">

            <h2 className="text-3xl font-semibold text-white mb-2">
              Sign Up Account
            </h2>
            <p className="text-gray-400 mb-8 text-sm">
              Enter your personal data to create your account.
            </p>

            {error && (
              <div className="bg-gradient-to-r from-red-700 to-purple-900 p-3 mb-4 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-gradient-to-r from-green-700 to-purple-900 text-white p-3 mb-4 rounded">
                {success}
              </div>
            )}

            <div className="space-y-5">

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm text-gray-300 block mb-2">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    placeholder="eg. Abcd"
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div className="w-1/2">
                  <label className="text-sm text-gray-300 block mb-2">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    placeholder="eg. Wxyz"
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="eg. abcd@gmail.com"
                  onChange={handleChange}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Phone Number
                </label>
                <input
                  name="phone"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="" disabled hidden>
                    Choose your role
                  </option>
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              <button className="w-full bg-gray-200 text-black font-medium py-2.5 rounded-md hover:bg-white transition duration-300">
                Sign Up
              </button>

            </div>

            <p className="text-gray-400 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                Log in
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Signup;

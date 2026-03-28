import { useState } from "react";
import { verifyOtp } from "../../Services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const type = location.state?.type || "signup"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    try {
      const res = await verifyOtp({ email, otp });
      setSuccess(res.message);

      setTimeout(() => {
        if (type === "forgot") {
          
          navigate("/login", {
            state: { openReset: true, email },
          });
        } else {
        
          navigate("/login");
        }
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

          <div className="relative z-10 text-white w-full flex flex-col items-center justify-center px-10 pt-10">
            <img
              src={logo}
              alt="HireNest"
              className="w-96 md:w-[420px] mb-6 object-contain drop-shadow-[0_0_60px_rgba(168,85,247,0.9)]"
            />
            <h1 className="text-3xl font-bold mb-3 text-center">
              Verify Your Email
            </h1>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h2 className="text-3xl font-semibold text-white mb-2">
              Enter OTP
            </h2>
            <p className="text-gray-400 mb-6">
              We have sent an OTP to your email.
            </p>

            {error && (
              <div className="bg-gradient-to-r from-red-700 to-purple-900 p-3 mb-4 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-gradient-to-r from-green-700 to-purple-900 p-3 mb-4 rounded">
                {success}
              </div>
            )}

            <div className="mt-4">
              <label className="text-sm text-gray-400">OTP Code</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full mt-1 p-3 bg-zinc-800 text-white rounded-md outline-none focus:ring-2 focus:ring-purple-600 text-center text-lg tracking-widest"
              />
            </div>

            <button className="w-full mt-6 bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
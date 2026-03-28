import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser, forgotPassword, verifyOtp, resetPassword } from "../../Services/authService";
import logo from "../../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  // LOGIN FORM
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // FORGOT PASSWORD STATES
  const [showForgot, setShowForgot] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");

  const [resetForm, setResetForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // HANDLE LOGIN FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // LOGIN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await loginUser(form);

      const token = res?.data?.accessToken || res?.accessToken;
      const user = res?.data?.user || res?.user;

      if (!token) {
        setError("Login failed: token not received");
        return;
      }

      // Save token and user
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Saved token ✅", localStorage.getItem("accessToken"));

      setSuccess(res?.data?.message || res?.message || "Login successful");

      const role = user.role;
      setTimeout(() => {
        if (role === "employee") {
          navigate("/employee-dashboard");
        } else if (role === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/login");
        }
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // FORGOT PASSWORD SUBMIT
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!forgotEmail) {
      setError("Email is required");
      return;
    }

    try {
      const res = await forgotPassword({ email: forgotEmail });
      setSuccess(res.message || "OTP sent to your email");

      setResetForm({ ...resetForm, email: forgotEmail });

      setTimeout(() => {
        setShowForgot(false);
        setShowOtp(true);
        setSuccess("");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!resetForm.otp) {
      setError("OTP is required");
      return;
    }

    try {
      const res = await verifyOtp({ email: forgotEmail, otp: resetForm.otp });
      setSuccess(res.message || "OTP verified");

      setTimeout(() => {
        setShowOtp(false);
        setShowReset(true);
        setSuccess("");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  // RESET PASSWORD
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!resetForm.newPassword || !resetForm.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword({
        email: resetForm.email,
        otp: resetForm.otp,
        newPassword: resetForm.newPassword,
        confirmPassword: resetForm.confirmPassword,
      });

      setSuccess(res.message || "Password reset successfully");

      setTimeout(() => {
        setShowReset(false);
        setShowOtp(false);
        setShowForgot(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-20" />
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-700 to-purple-900 p-3 mb-4 rounded text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-gradient-to-r from-green-700 to-purple-900 p-3 mb-4 rounded text-center">
            {success}
          </div>
        )}

        {/* LOGIN */}
{!showForgot && !showOtp && !showReset && (
  <>
    <h2 className="text-2xl text-white text-center mb-4">Login</h2>
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-3 bg-zinc-800 text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <div className="relative mb-3">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-gray-400"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </span>
      </div>

      <p
        onClick={() => setShowForgot(true)}
        className="text-sm text-purple-400 hover:text-purple-300 font-medium cursor-pointer mb-4 text-right"
      >
        Forgot Password?
      </p>

      <button className="w-full bg-white text-black py-3 rounded-md font-semibold">
        Login
      </button>
    </form>

    {/* 🔹 Signup link */}
    <p className="text-sm text-gray-400 mt-4 text-center">
      Don’t have an account?{" "}
      <Link
        to="/"
        className="text-purple-400 hover:text-purple-300 font-medium"
      >
        Signup
      </Link>
    </p>
  </>
)}
        {/* FORGOT PASSWORD FORM */}
        {showForgot && (
          <>
            <h2 className="text-2xl text-white text-center mb-4">Forgot Password</h2>
            <form onSubmit={handleForgotSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full p-3 bg-zinc-800 text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button className="w-full bg-white text-black py-3 rounded-md font-semibold">
                Send OTP
              </button>
            </form>
            <p
              onClick={() => { setShowForgot(false); setError(""); setSuccess(""); }}
              className="text-sm text-purple-400 cursor-pointer mt-4 text-center hover:text-purple-300"
            >
              ← Back to Login
            </p>
          </>
        )}

        {/* OTP FORM */}
        {showOtp && (
          <>
            <h2 className="text-2xl text-white text-center mb-4">Verify OTP</h2>
            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={resetForm.otp}
                onChange={(e) => setResetForm({ ...resetForm, otp: e.target.value })}
                className="w-full p-3 bg-zinc-800 text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button className="w-full bg-white text-black py-3 rounded-md font-semibold">
                Verify OTP
              </button>
            </form>
            <p
              onClick={() => { setShowOtp(false); setShowForgot(true); setError(""); setSuccess(""); }}
              className="text-sm text-purple-400 cursor-pointer mt-4 text-center hover:text-purple-300"
            >
              ← Back
            </p>
          </>
        )}

        {/* RESET PASSWORD FORM */}
        {showReset && (
          <>
            <h2 className="text-2xl text-white text-center mb-4">Reset Password</h2>
            <form onSubmit={handleResetSubmit}>
              <div className="relative mb-4">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={resetForm.newPassword}
                  onChange={(e) => setResetForm({ ...resetForm, newPassword: e.target.value })}
                  className="w-full p-3 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                >
                  {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </span>
              </div>
              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={resetForm.confirmPassword}
                  onChange={(e) => setResetForm({ ...resetForm, confirmPassword: e.target.value })}
                  className="w-full p-3 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </span>
              </div>
              <button className="w-full bg-white text-black py-3 rounded-md font-semibold">
                Reset Password
              </button>
            </form>
            <p
              onClick={() => { setShowReset(false); setShowOtp(true); setError(""); setSuccess(""); }}
              className="text-sm text-purple-400 cursor-pointer mt-4 text-center hover:text-purple-300"
            >
              ← Back
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;





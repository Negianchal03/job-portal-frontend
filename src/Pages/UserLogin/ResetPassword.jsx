import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../Services/authService";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("All fields required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword({
        email,
        otp,
        newPassword,
        confirmPassword, 
      });

      setSuccess(res.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-xl w-96">
        <h2 className="text-white text-2xl mb-4 text-center">
          Reset Password
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-3">{error}</p>
        )}

        {success && (
          <p className="text-green-400 text-center mb-3">{success}</p>
        )}

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-3 bg-zinc-800 text-white rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/*  NEW FIELD */}
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-3 bg-zinc-800 text-white rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="w-full bg-white text-black py-3 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
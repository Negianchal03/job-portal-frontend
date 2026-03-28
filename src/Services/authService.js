import api from "./axiosConfig"; 

const API_URL = "http://localhost:3000/api/auth";

// SIGNUP
export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

//LOGIN 
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  //  access token store
  localStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
};

//  SEND OTP (FORGOT PASSWORD) 
export const forgotPassword = async (data) => {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

//  VERIFY OTP 
export const verifyOtp = async (data) => {
  const res = await fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

//  RESET PASSWORD 
export const resetPassword = async (data) => {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      otp: data.otp,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};



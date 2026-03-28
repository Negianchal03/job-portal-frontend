import axios from "axios";

const api = axios.create({
  // baseURL: "https://job-portal-backend-9zo5.onrender.com",
   baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/refresh-token", 
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);

      
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);

      } catch (err) {
        console.log("Session expired, login again");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to inject the Authorization header
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    console.log("apiService:", token);

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("config :", config);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors and refresh token
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Refresh the token
        const response = await axios.post(`${API_URL}/token`, {
          token: refreshToken,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("authToken", newAccessToken);

          // Update the Authorization header and retry the original request
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest); // Retry the original request with the new token
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

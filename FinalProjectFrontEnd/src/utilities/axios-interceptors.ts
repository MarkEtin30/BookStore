import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Base URL and client setup
const baseUrl = import.meta.env.VITE_BASE_URL;

const client1 = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
    },
});

// Success handler
const onSuccess = (response: AxiosResponse) => {
    return response;
};

// Error handler
const onError = (error: AxiosError) => {
    // Handle the error, for example by logging out the user if the token is expired
    if (error.response?.status === 401) {
        // Redirect to login page or handle token expiration
        console.error("Token expired or unauthorized access.");
    }
    return Promise.reject(error);
};

// Request function
export const request1 = (options: AxiosRequestConfig) => {
    return client1(options)
        .then(onSuccess)
        .catch(onError);
};

export default request1;

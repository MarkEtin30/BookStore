import axios from "axios";
import { useState } from "react";

// Base URLs
const authBaseUrl = "https://localhost:7095/api/authentication";
const userBaseUrl = "https://localhost:7095/api/AppUsers";

const apiAuth = axios.create({
  baseURL: authBaseUrl,
});

const apiUser = axios.create({
  baseURL: userBaseUrl,
});

// const [logoutState, setLogoutState] = useState(false);


// Register a new user
const register = (email: string, username: string, password: string) => 
  apiAuth.post("/register", { email, username, password });

// Login a user and store token in local storage
const login = (email: string, password: string) => 
  apiAuth.post("/login", { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      return response;
    });

const getUserId = async () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  if (token && token.token) {
    const decodedToken = JSON.parse(atob(token.token.split('.')[1]));
    return decodedToken.UserId; // Assuming the User ID is stored in the payload
  }
  return null;
};

// Change Password
// Change Password API Call
// Change Password
export const changePassword = async (passwordData: { userId: string; currentPassword: string; newPassword: string }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. User must be logged in.");
    }

    const response = await apiUser.put("/ChangePassword", passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Returns success message
  } catch (error: any) {

    throw new Error(error.response?.data?.message || "Failed to change password.");
  }
};




// Check Authentication Status
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Logout User


export const logout = () => {
  localStorage.removeItem("token");

};

// Fetch User Data
export const getUserData = async (userId: number) => {
  try {
    const response = await apiAuth.get(`/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch user data.");
  }
};

// Export all authentication-related actions
export const authentication = {
  getUserId,
  register,
  login,
  changePassword,
  isAuthenticated,
  logout,
  getUserData,
  
};
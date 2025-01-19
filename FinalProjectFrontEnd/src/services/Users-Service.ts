import axios from "axios";
import request1 from "../utilities/axios-interceptors"; // Assuming this is the default export
import { decodeJwt } from "../utilities/jwtHelper";
import { UserType, UserTypeForCreatingNewUser } from "../@types";

const url = import.meta.env.VITE_BASE_URL + "/AppUsers";

const apiUser = axios.create({
  baseURL: url,
});


// Get all users
export const getUsers = () => {
  return request1({
    url: "/AppUsers",
  });
};



const authBaseUrl = "https://localhost:7095/api/authentication";

const apiAuth = axios.create({
  baseURL: authBaseUrl,
});





export const getUserById = async (id: number) => {
  try {
    const response = await request1({
      url: `/AppUsers/${id}`,
    });
    const user: UserType = response.data; // Assuming `response.data` contains the user object

    // Map all fields from `UserType` to the `userSettings` structure
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      orders: user.orders,
      
      password: "", // Default password to an empty string (passwords are usually not returned by the backend)

      imageUrl: user.imageUrl,
      roles: user.roles,
    };
  } catch (error) {
    // console.error("Error fetching user by ID:", error);
    throw error; // Ensure errors propagate to the caller
  }
};



// Usage

export const getUserIdFromJwt = () => {
  const token = localStorage.getItem('token');
  const decodedToken = decodeJwt(token);

  const claims = JSON.parse(atob(token.split('.')[1]));
  const userId = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

  return userId ? userId : null;
};


// Import necessary modules (e.g., axios for API requests)


export const updateUserSettings = async (updatedUser) => {
  try {
    const response = await axios.put(`${url}/${updatedUser.id}`, updatedUser);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user settings.");
  }
};


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






// Delete a user
export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`${url}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user.");
  }
};

// Create a new user
export const createUser = async (newUser: UserTypeForCreatingNewUser) => {
  try {
    const response = await apiAuth.post("/register", newUser);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user.");
  }
};




// Assign a role to a user (via a separate endpoint)
export const assignRoleToUser = async (userId: number, role: string) => {
  try {
    const response = await axios.post(`${url}/${userId}/roles/${role}`);
    return response.data; // Assuming successful response
  } catch (error) {
    throw new Error("Failed to assign role.");
  }
};






// Delete a role to a user (via a separate endpoint)
export const deleteRoleToUser = async (userId: number, role: string) => {
  try {
    const response = await axios.delete(`${url}/${userId}/roles/${role}`);
    return response.data; // Assuming successful response
  } catch (error) {
    throw new Error("Failed to assign role.");
  }
};




// Get the role of the user (via a separate endpoint)
export const getRoleToUser = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/${userId}/roles`);
    return response.data; // Assuming successful response
  } catch (error) {
    throw new Error("Failed to assign role.");
  }
};
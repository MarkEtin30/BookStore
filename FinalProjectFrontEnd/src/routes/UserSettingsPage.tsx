import React, { useState, useEffect } from "react";
import {
  getUserById,
  getUserIdFromJwt,
  updateUserSettings,
} from "../services/Users-Service";
import { changePassword } from "../services/Authentication-Service";
import { UserTypeForUpdate } from "../@types";

const UserSettingsPage = () => {
  const [userSettings, setUserSettings] = useState<UserTypeForUpdate>({
    id: 0,
    username: "",
    email: "",
    phoneNumber: "",
    roles:"",
    imageUrl: ""

  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const userId = getUserIdFromJwt(); // Get user ID from JWT
        if (userId) {
          const user = await getUserById(userId); // Fetch the user
          setUserSettings({
            id: user.id,
            username: user.username || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            roles: user.roles || "",
            imageUrl: user.imageUrl || ""
          });
        }
      } catch (error) {
        setErrorMessage(
          "Failed to load user settings. Please try again later."
        );
      }
    };

    fetchUserSettings();
  }, []);






  const handleUpdateSettings = async () => {
    setIsSubmitting(true);
    try {
      const updatedUser: UserTypeForUpdate = {
        id: userSettings.id,
        username: userSettings.username,
        email: userSettings.email,
        phoneNumber: userSettings.phoneNumber || "000-000-0000",
        roles: userSettings.roles,
        imageUrl: userSettings.imageUrl || ""
      };

      await updateUserSettings(updatedUser); // Send the update
      alert("Settings updated successfully!");
    } catch (error) {
      // console.error("Error updating settings:", error);
      setErrorMessage("Failed to update settings. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordStrong = (password) =>
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password) &&
    (password.length >= 8) && (password.length <= 20)






  const handleChangePassword = async () => {
    if (!isPasswordStrong(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 and not exceed 20 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    setIsSubmitting(true);
    setPasswordSuccessMessage("");
    setErrorMessage("");

    try {
      await changePassword({userId: userSettings.id.toString() , currentPassword: currentPassword, newPassword });
      setPasswordSuccessMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      // console.error("Error changing password:", error);
      setPasswordSuccessMessage("");

      setErrorMessage(
        error.response?.data?.message ||
        
          "Failed to change password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };










  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-black-400">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-400 bg-gray-100 w-full max-w-4xl rounded-lg">
       <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-black-400 dark:text-black-400">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {passwordSuccessMessage && (
        <p className="text-green-500">{passwordSuccessMessage}</p>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            value={userSettings.username || ""}
            onChange={(e) =>
              setUserSettings({ ...userSettings, username: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={userSettings.email || ""}
            onChange={(e) =>
              setUserSettings({ ...userSettings, email: e.target.value })
            }
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone Number:</label>
          <input
            type="text"
            value={userSettings.phoneNumber || ""}
            onChange={(e) =>
              setUserSettings({
                ...userSettings,
                phoneNumber: e.target.value,
              })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image Url:</label>
          <input
            type="text"
            value={userSettings.imageUrl || ""}
            onChange={(e) =>
              setUserSettings({ ...userSettings, imageUrl: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleUpdateSettings}
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block mb-1">Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserSettingsPage;

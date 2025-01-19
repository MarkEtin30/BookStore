import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assignRoleToUser, deleteRoleToUser, getRoleToUser, getUserById, updateUserSettings } from "../services/Users-Service";
import { UserTypeForUpdate } from "../@types";

const EditUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserTypeForUpdate | null>(null);
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [oldRole, setOldRole] = useState<string>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await getUserById(Number(id));
        setUser(fetchedUser as UserTypeForUpdate);
        
        const currentRoleArray = await getRoleToUser(Number(id));
        const currentRole = currentRoleArray[0]?.toString(); 
        setRole(currentRole);
        setOldRole(currentRole);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  const handleSave = async () => {
    if (user) {
      try {
        await updateUserSettings({ ...user, roles: role });

        if (role !== oldRole) {
          await updateRoleForUser(user.id, role, oldRole);
        }

        alert("User updated successfully!");
        navigate("/users");
      } catch (err) {
        alert("Failed to update user.");
      }
    }
  };

  const updateRoleForUser = async (userId: number, newRole: string, previousRole: string) => {
    // Assign the new role if it's different
    await assignRoleToUser(userId, newRole);
    
    // Remove the old role if it exists
    if (previousRole === "Admin" && newRole !== "Admin") {
      await deleteRoleToUser(userId, "Admin");
    }

    if (previousRole === "User" && newRole !== "User") {
      await deleteRoleToUser(userId, "User");
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-black-400">
    <div className="card shadow-lg dark:bg-gray-700 dark:text-black-400 bg-gray-100 w-full max-w-4xl rounded-lg">
     <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-black-500 dark:text-black-400">    
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form >
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
      </div>
      </div>
  );
};

export default EditUserForm;

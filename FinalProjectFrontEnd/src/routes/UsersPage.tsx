import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { UserType } from "../@types";
import { deleteUser, getRoleToUser } from "../services/Users-Service";

const UsersPage: React.FC = () => {
  const { users, loading, error, refetchUsers } = useUsers();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<{ [userId: number]: string }>({});

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesMap: { [userId: number]: string } = {};
      for (const user of users) {
        try {
          const role = await getRoleToUser(user.id);
          rolesMap[user.id] = role;
        } catch (err) {
        }
      }
      setRoles(rolesMap);
    };

    if (users.length > 0) {
      fetchRoles();
    }
  }, [users]);

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      alert("User deleted successfully!");
      refetchUsers();
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleCreateNewUser = () => {
    navigate("/users/create");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-black-400">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-black-400 bg-gray-100 w-full max-w-4xl rounded-lg">
       <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-black-700 dark:text-black-700">

       <h1 className="text-center mb-6 text-3xl font-bold text-blue-600 dark:text-blue-400">
            Users Managment
          </h1>


          <div className="mb-4 flex justify-end">
            <button
              onClick={handleCreateNewUser}
              className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
            >
              Create New User
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-20">
              <div className="spinner-border animate-spin"></div>
            </div>
          )}

          {error && <div className="text-red-500">Error: {error.message}</div>}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user: UserType) => (
              <div
                key={user.id}
                className=" dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col space-y-4"
              >
                <div className="text-sm">
                  <span className="font-bold">ID:</span> {user.id}
                </div>
                <div className="text-sm">
                  <span className="font-bold">Name:</span>{" "}
                  <a
                    href={`/users/${user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {user.username}
                  </a>
                </div>
                <div className="text-sm">
                  <span className="font-bold">Role:</span> {roles[user.id] || "Loading..."}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default UsersPage;

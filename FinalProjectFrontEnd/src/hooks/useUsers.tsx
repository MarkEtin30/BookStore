import { useState, useEffect, useCallback } from "react";
import { UserType } from "../@types"; // Ensure UserType is imported
import { getUsers } from "../services/Users-Service"; // Assuming this is the service for fetching users

const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users function
  const fetchUsers = useCallback(() => {
    setLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setError(null); // Reset error if fetch is successful
      })
      .catch((error) => {
        setError(error); // Set the error if fetch fails
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch users initially when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Return users data, loading state, error, and refetch function
  return { users, loading, error, refetchUsers: fetchUsers };
};

export default useUsers;

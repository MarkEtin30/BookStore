import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getUserIdFromJwt } from "../services/Users-Service";
import { UserType } from "../@types";

// Define the context type including the role and user
interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  user: UserType | null;
}

// Default context values
const initialAuthState: AuthContextType = {
  isLoggedIn: localStorage.getItem("token") !== null,
  token: localStorage.getItem("token") ?? null,
  role: localStorage.getItem("role") ?? null,
  login: () => {},
  logout: () => {},
  user: null, // Initialize as null
};

// Create the authentication context
const AuthenticationContext = createContext<AuthContextType>(initialAuthState);

interface AuthenticationProviderProps {
  children: ReactNode;
}

// AuthenticationProvider component
function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialAuthState.isLoggedIn);
  const [token, setToken] = useState<string | null>(initialAuthState.token);
  const [role, setRole] = useState<string | null>(initialAuthState.role);
  const [user, setUser] = useState<UserType | null>(null); // Default to null

  const navigate = useNavigate();

  // Function to fetch user data based on the token
  async function fetchUser() {
    try {
      const userId = getUserIdFromJwt();
      if (userId) {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser); // Set the resolved user object
      } else {
      }
    } catch (error) {
      setUser(null); // Reset user on error
    }
  }

  // Effect to keep token and role synced with localStorage
  useEffect(() => {
    if (token ) {
      localStorage.setItem("token", token);
      fetchUser();
    } else {
      localStorage.removeItem("token");
      setUser(null); // Clear user when token is removed
    }

    if (role) {
   
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [token, role]); // Only run when token or role changes

  // Login function
  function login(token: string, role: string) {
    setIsLoggedIn(true);
    setToken(token);
    setRole(role);
  }

  // Logout function
  function logout() {
    setIsLoggedIn(false);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    sessionStorage.clear(); // Clear all session storage
    setUser(null); // Clear user state
    // console.log("User logged out, cart and storage cleared.");
    navigate("/");
  }

  // Providing context values to the children components
  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, token, role, login, logout, user }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

// Export the context and provider
export { AuthenticationProvider, AuthenticationContext };

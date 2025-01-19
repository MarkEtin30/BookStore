import { createContext, useEffect, useState } from "react";

// Initialize context with default values
const initialValues = {
  darkMode: false,
  toggle: () => {},
};

const DarkModeContext = createContext(initialValues);

function DarkModeProvider({ children }) {
  // State for tracking the dark mode status
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize state based on localStorage or default to light mode
    return localStorage.getItem("darkMode") === "dark";
  });

  // Apply the correct class on the <body> when the component mounts
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle function to switch between dark and light modes
  const toggle = () => {
    const newMode = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", newMode);

    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeProvider, DarkModeContext };

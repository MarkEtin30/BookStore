import { BsGithub } from "react-icons/bs";
import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <footer
      id="app-footer"
      className={`shadow-lg p-4  ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } transition-colors duration-300`}
    >
      <div className="container">
        {/* Icon Links */}
        <div className="d-flex justify-content-center align-items-center gap-4 mb-3">
          {/* Home Link */}
          <NavLink
            className="btn btn-outline-secondary rounded-circle p-3 hover-bg-primary transition-all"
            to="/"
            aria-label="Home"
          >
            <SiHomebridge size={20} />
          </NavLink>

          {/* About Link */}
          <NavLink
            className="btn btn-outline-secondary rounded p-3 hover-bg-primary transition-all"
            to="/about"
          >
            About
          </NavLink>

          {/* GitHub Link */}
          <a
            href="https://github.com/MarkEtin30"
            className="btn btn-outline-info rounded-circle p-3 hover-bg-primary transition-all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <BsGithub size={20} />
          </a>
        </div>

        {/* Footer Text */}
        <div className="mt-3 text-center">
          <p className="small">
            &copy; {new Date().getFullYear()} BookWorms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

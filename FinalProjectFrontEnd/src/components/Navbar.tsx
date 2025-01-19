import { BsGithub } from "react-icons/bs";
import { SiHomebridge } from "react-icons/si";
import { FaBook, FaCartPlus, FaCashRegister, FaCog, FaCogs, FaUserCog } from "react-icons/fa";
import { AiFillContacts, AiFillPhone, AiOutlineBook } from "react-icons/ai";
import { BiLogIn, BiLogOut, BiRegistered } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import "./Navbar.scss";
import { FaBoxArchive } from "react-icons/fa6";

const Navbar = () => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { isLoggedIn, logout, role, user } = useContext(AuthenticationContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);



  // Define menu items based on roles and login status
  const menuItems = [
    { to: "/", label: "Home", icon: <SiHomebridge size={16} />, visible: true },
    { to: "/about", label: "About", icon: <AiOutlineBook size={16} />, visible: true },
    { to: "/contact-us", label: "contact-us", icon: <AiFillPhone size={16} />, visible: true },
    { to: "/cart", label: "Cart", icon: <FaCartPlus size={16} />, visible: true },
    { to: "/users", label: "Users", icon: <FaCogs size={16} />, visible: isLoggedIn && role === "Admin" },
    { to: "/orders", label: "Orders", icon: <FaBoxArchive size={16} />, visible: isLoggedIn && role === "Admin" },
    { to: "/books", label: "Books", icon: <FaBook size={16} />, visible: isLoggedIn && role === "Admin" },
    { to: "/user-settings", label: "User Settings", icon: <FaUserCog size={16} />, visible: isLoggedIn },

  ];

  return (
    <nav
      id="app-nav"
      className={`shadow navbar px-3 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"} transition-colors duration-300`}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-start">
          <NavLink className="navbar-brand pb-3 ps-2" to="/" aria-label="Home">
          BookWorms
            <img
              src="https://img.icons8.com/ios/452/book.png"
              alt="Bookstore Logo"
              className="brand-logo"
              style={{ width: "30px", height: "30px" }}

          
            />
          </NavLink>
        </div>

        <div className="d-flex justify-content-between w-100">
          {/* Hamburger Button */}
          <button
            className="btn  d-md-none p-3"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <GiHamburgerMenu size={16} />
          </button>

          {/* Dropdown Menu */}
          <div className={`navbar-links d-flex flex-column d-md-none ${menuOpen ? "open" : "d-none"}`}>
            {menuItems.map(
              (item, index) =>
                item.visible && (
                  <NavLink key={index} className="nav-link btn btn-outline-secondary rounded px-2 py-1 fs-6" to={item.to}>
                    {item.icon} <span className="ms-2">{item.label}</span>
                  </NavLink>
                )
            )}
         {/* {isLoggedIn && 
      
        } */}
      </div>
          {/* Navbar Links */}
          <div className="d-none d-md-flex align-items-center gap-2">
            {menuItems.map(
              (item, index) =>
                item.visible && (
                  <NavLink key={index} className="nav-link btn btn-outline-secondary rounded px-2 py-1 fs-6" to={item.to}>
                    {item.icon} <span className="ms-2">{item.label}</span>
                  </NavLink>
                )
            )}

      
    
          </div>

          {/* Right-Aligned Buttons */}
          <div className="d-flex align-items-center ms-auto gap-2 ps-4 sm-12 ">
            <div className="sm-7">
            <button onClick={toggle} className="btn p-3 " aria-label="Toggle Dark Mode sm-6">
              {darkMode ? "🌚 ": "🌞 "}
            </button>
            <a
              href="https://github.com/MarkEtin30"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-info rounded-circle p-3"
              aria-label="GitHub"
            >
              <BsGithub size={16} />
            </a>
            </div>
            {!isLoggedIn && (
              <div className="sm-5">
                <NavLink
                  className="nav-link btn btn-outline-secondary rounded px-2 py-1 fs-6"
                  to="/login"
                >
                  <BiLogIn size={16} /> <span className="ms-2">Login</span>
                </NavLink>

                  <NavLink
                  className="nav-link btn btn-outline-secondary rounded px-2 py-1 fs-6"
                  to="/register"
                >
                  <FaBook size={16} /> <span className="ms-2">Register</span>
                </NavLink>


            

              </div>
            )}
        {isLoggedIn &&
        <div className={` sm-5`}>
            <button onClick={logout} className="nav-link btn btn-outline-secondary rounded px-2 py-1 fs-6 "
             aria-label="Logout">
            <BiLogOut size={16} /> <span>Logout</span>
            </button>

               {isLoggedIn && (
              <div className="sm-6 ">

              
                {user?.imageUrl && (
                  <>
                    <span>
                    <img
                      src={user.imageUrl}
                      alt={`${user.username}'s profile`}
                      className="rounded-circle"
                      style={{ width: "30px", height: "30px", objectFit: "cover" }}
                    />{" "}
                        Welcome, {user.username}
                    </span>
               
                    <div>
                    </div>
                  </>

                )}
               
              </div>
            )}
         </div>  
        }

       </div>
        
      </div>
   
      </div>
    </nav>

  );
};

export default Navbar;

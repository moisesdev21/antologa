import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.jsx"; // Importar el hook
import Logo from "../assets/sidebar-icons/antologa-logo01-dark.svg";
import LogoWhite from "../assets/sidebar-icons/antologa-logo01-white.svg";
import home from "../assets/nav-menu-icons/home.svg";
import homeActive from "../assets/nav-menu-icons/home-active.svg";
import discover from "../assets/nav-menu-icons/discover.svg";
import discoverActive from "../assets/nav-menu-icons/discover-active.svg";
import blog from "../assets/nav-menu-icons/blog.svg";
import blogActive from "../assets/nav-menu-icons/blog-active.svg";
import trips from "../assets/nav-menu-icons/suitcase.svg";
import tripsActive from "../assets/nav-menu-icons/suitcase-active.svg";
import pricing from "../assets/nav-menu-icons/pricing.svg";
import pricingActive from "../assets/nav-menu-icons/pricing-active.svg";
import myaccount from "../assets/nav-menu-icons/myaccount.svg";
import myaccountActive from "../assets/nav-menu-icons/myaccount-active.svg";
import notification from "../assets/nav-menu-icons/campanita.svg";
import notificationActive from "../assets/nav-menu-icons/campanita-activa.svg";
import darkmode from "../assets/nav-menu-icons/nocturno.svg";
import lighmode from "../assets/nav-menu-icons/sol.svg";

const NavIcons = () => {
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [rightHovered, setRightHovered] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Usar el hook global del tema
  const { isDarkMode, toggleTheme } = useTheme();

  const [openNotifications, setOpenNotifications] = useState(false);
  const [closingNotif, setClosingNotif] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const routes = {
      "/home": "home",
      "/discover": "discover",
      "/trips": "trips",
      "/pricing": "pricing",
      "/blog": "blog",
      "/partners": "partners",
      "/my-account": "partners",
    };
    const matched = Object.entries(routes).find(([route]) => path.startsWith(route));
    if (matched) setActive(matched[1]);
    else if (path === "/") setActive("home");
  }, [location.pathname]);

  const leftItems = [
    { label: "home", path: "/home" },
    { label: "discover", path: "/discover" },
    { label: "trips", path: "/trips" },
    { label: "blog", path: "/blog" },
  ];
  const rightItems = [
    { label: "pricing", path: "/pricing" },
    { label: "partners", path: "/partners" },
  ];
  const topRightIcons = [
    { label: "darkmode", action: "darkmode" },
    { label: "notifications", action: "notifications" },
  ];

  const getIcon = (label, isRightSide = false) => {
    const isActiveItem = active === label;
    const isHover = isRightSide ? rightHovered === label : hovered === label;
    switch (label) {
      case "home": return isHover || isActiveItem ? homeActive : home;
      case "discover": return isHover || isActiveItem ? discoverActive : discover;
      case "trips": return isHover || isActiveItem ? tripsActive : trips;
      case "pricing": return isHover || isActiveItem ? pricingActive : pricing;
      case "blog": return isHover || isActiveItem ? blogActive : blog;
      case "partners": return isHover || isActiveItem ? myaccountActive : myaccount;
      case "notifications": return isHover ? notificationActive : notification;
      case "darkmode": return isDarkMode ? lighmode : darkmode;
      default: return null;
    }
  };

  const closeModal = () => {
    setClosingNotif(true);
    setTimeout(() => {
      setOpenNotifications(false);
      setClosingNotif(false);
    }, 300);
  };

  const handleRightItemClick = (action) => {
  if (action === "notifications") {
    openNotifications ? closeModal() : setOpenNotifications(true);
  } else if (action === "darkmode") {
    console.log("Dark mode button clicked"); // Para debug
    toggleTheme();
  }
};

  const handleItemClick = (path, label) => {
    setActive(label);
    window.location.href = path;
  };

  return (
    <nav className="w-full py-4 flex justify-center absolute top-0 left-0 right-0 z-50">
      <div className="w-full max-w-[1200px] flex justify-between items-center px-4">

        {/* ✅ LOGO DINÁMICO */}
        <img
          src={isDarkMode ? LogoWhite : Logo}
          alt="Antologa Logo"
          className="w-[150px] cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />

        {/* ✅ ICONOS CENTRALES */}
        <div className="flex items-center gap-6">
          {leftItems.map((item) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center cursor-pointer w-[32px]"
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleItemClick(item.path, item.label)}
            >
              <img
                src={getIcon(item.label)}
                alt={item.label}
                className={`w-[32px] h-[32px] object-contain ${
                  isDarkMode
                    ? (active === item.label || hovered === item.label ? "filter-green" : "invert-[90%] brightness-95")
                    : (active === item.label || hovered === item.label ? "filter-green" : "brightness-0")
                }`}
              />
              {(active === item.label || hovered === item.label) && (
                <div className="w-4 h-0 outline outline-[1.5px] outline-[#078282] mt-[4px]" />
              )}
            </div>
          ))}

          {/* ✅ DIVIDER CON COLOR DINÁMICO */}
          <span className="text-xl font-light select-none"
            style={{ color: isDarkMode ? "#f8f8f8" : "#282828" }}>
            │
          </span>

          {rightItems.map((item) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center cursor-pointer w-[32px]"
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleItemClick(item.path, item.label)}
            >
              <img
                src={getIcon(item.label)}
                alt={item.label}
                className={`w-[32px] h-[32px] object-contain ${
                  isDarkMode
                    ? (active === item.label || hovered === item.label ? "filter-green" : "invert-[90%] brightness-95")
                    : (active === item.label || hovered === item.label ? "filter-green" : "brightness-0")
                }`}
              />
              {(active === item.label || hovered === item.label) && (
                <div className="w-4 h-0 outline outline-[1.5px] outline-[#078282] mt-[4px]" />
              )}
            </div>
          ))}
        </div>

        {/* ✅ ICONOS DERECHA / CAMPANITA SIN FILTROS */}
        <div className="flex items-center gap-4">
          {topRightIcons.map((item) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center cursor-pointer w-[42px]"
              onMouseEnter={() => setRightHovered(item.label)}
              onMouseLeave={() => setRightHovered(null)}
              onClick={() => handleRightItemClick(item.action)}
            >

              {/* CAMPANITA: SIN FILTROS, SIEMPRE VERDE */}
              {item.label === "notifications" ? (
                <img
                  src={getIcon(item.label, true)}
                  alt="notifications"
                  className="w-[32px] h-[32px]"
                />
              ) : (
                <img
                  src={getIcon(item.label, true)}
                  className={`w-[42px] h-[42px] ${
                    isDarkMode && item.label !== "darkmode" ? "invert-[90%] brightness-95" : item.label !== "darkmode" ? "brightness-0" : ""
                  }`}
                />
              )}

            </div>
          ))}

          {/* AUTH BUTTONS (IGUALITO) */}
          {currentUser ? (
            <>
              <button
                onClick={() => window.location.href = "/my-account"}
                className="w-12 h-12 bg-[#078282] rounded-lg flex justify-center items-center"
              >
                <img src={myaccountActive} className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="h-11 px-4 bg-[#078282] text-white rounded-lg"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => (window.location.href = "/login")} className="text-[#078282] font-semibold">
                Log In
              </button>
              <button onClick={() => (window.location.href = "/register")} className="px-4 py-2.5 bg-[#078282] text-white rounded-lg">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* ✅ MODAL NOTIFICACIONES CON ANIMACIÓN */}
      {openNotifications && (
        <>
          <div
            onClick={closeModal}
            className="fixed top-0 left-0 w-full h-full z-[998]"
          />
          <div
            className={`fixed top-0 right-0 w-[380px] h-full bg-white dark:bg-[#141414] shadow-xl z-[999] p-6 ${
              closingNotif ? "animate-slideRight" : "animate-slideLeft"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 dark:text-white">Notificaciones</h2>
            <div className="text-gray-500 dark:text-gray-300">(Aquí mostrarás tus notificaciones)</div>
          </div>
        </>
      )}

      <style jsx>{`
        .filter-green {
          filter: invert(33%) sepia(67%) saturate(937%) hue-rotate(134deg) brightness(92%) contrast(101%);
        }
        @keyframes slideLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes slideRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-slideLeft { animation: slideLeft 0.3s ease-out forwards; }
        .animate-slideRight { animation: slideRight 0.3s ease-out forwards; }
      `}</style>
    </nav>
  );
};

export default NavIcons;
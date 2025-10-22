import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/sidebar-icons/antologa-logo01-dark.svg";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rightHovered, setRightHovered] = useState(null);
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Sincronizar el estado activo con la ruta actual
  useEffect(() => {
    const path = location.pathname;
    
    // Mapeo de rutas a labels
    const routeToLabel = {
      '/home': 'home',
      '/discover': 'discover',
      '/trips': 'trips',
      '/pricing': 'pricing',
      '/blog': 'blog',
      '/partners': 'partners',
      '/my-account': 'partners', // my-account también usa el icono de partners
    };

    // Encontrar el label correspondiente a la ruta actual
    const matchedLabel = Object.entries(routeToLabel).find(([route]) => 
      path.startsWith(route)
    );

    if (matchedLabel) {
      setActive(matchedLabel[1]);
    } else if (path === '/') {
      setActive('home');
    }
  }, [location.pathname]);

  const items = [
    { label: "home", path: "/home" },
    { label: "discover", path: "/discover" },
    { label: "trips", path: "/trips" },
    { label: "pricing", path: "/pricing" },
    { label: "blog", path: "/blog" },
    { label: "partners", path: "/partners" },
  ];

  const rightItems = [
    { label: "notifications", action: "notifications" },
    { label: "darkmode", action: "darkmode" },
  ];

  const getIcon = (label, isRightSide = false) => {
    const isActive = active === label;
    const isHover = isRightSide ? rightHovered === label : hovered === label;

    switch (label) {
      case "home":
        return isHover || isActive ? homeActive : home;
      case "discover":
        return isHover || isActive ? discoverActive : discover;
      case "trips":
        return isHover || isActive ? tripsActive : trips;
      case "pricing":
        return isHover || isActive ? pricingActive : pricing;
      case "blog":
        return isHover || isActive ? blogActive : blog;
      case "partners":
        return isHover || isActive ? myaccountActive : myaccount;
      case "notifications":
        return isHover || isActive ? notificationActive : notification;
      case "darkmode":
        return isHover || isActive ? (isDarkMode ? lighmode : darkmode) : (isDarkMode ? lighmode : darkmode);
      default:
        return null;
    }
  };

  const getDisplayText = (label) => {
    switch (label) {
      case "partners":
        return "Partners";
      case "notifications":
        return "Notificaciones";
      case "darkmode":
        return isDarkMode ? "Modo Claro" : "Modo Oscuro";
      default:
        return label.charAt(0).toUpperCase() + label.slice(1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  const handleMyAccount = () => {
    window.location.href = "/my-account";
    setActive("partners"); // Establecer como activo cuando se va a my-account
  };

  const handleNotifications = () => {
    console.log("Abrir notificaciones");
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const handleItemClick = (path, label) => {
    setActive(label);
    window.location.href = path;
  };

  const handleRightItemClick = (action) => {
    if (action === "notifications") {
      handleNotifications();
    } else if (action === "darkmode") {
      handleToggleDarkMode();
    }
  };

  return (
    <nav className="w-full py-4 flex justify-center absolute top-0 left-0 right-0 z-50">
      <div className="w-full max-w-[1200px] flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <img
            src={Logo}
            alt="Antologa Logo"
            className="w-[150px] h-auto object-contain"
            onClick={() => window.location.href = "/"}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Íconos centrados */}
        <div className="flex justify-center items-center h-full gap-6 ">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center justify-center cursor-pointer w-[32px] "
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleItemClick(item.path, item.label)}
            >
              <img
                src={getIcon(item.label)}
                alt={item.label}
                className={`w-[32px] h-[32px] object-contain ${
                  (active === item.label || hovered === item.label) 
                    ? "filter-green" 
                    : "filter brightness-0" 
                }`}
              />

              {(active === item.label || hovered === item.label) && (
                <div className="w-4 h-0 outline outline-[1.5px] outline-offset-[-0.75px] outline-[#078282] mt-[4px]" />
              )}

              {hovered === item.label && (
                <span className="text-[#078282] mt-1 text-sm font-medium whitespace-nowrap">
                  {getDisplayText(item.label)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Lado derecho - íconos y botones */}
        <div className="flex items-center gap-4 h-full">
          {/* Íconos de notificaciones y darkmode */}
          {rightItems.map((item) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center justify-center cursor-pointer w-[32px]"
              onMouseEnter={() => setRightHovered(item.label)}
              onMouseLeave={() => setRightHovered(null)}
              onClick={() => handleRightItemClick(item.action)}
            >
              <img
                src={getIcon(item.label, true)}
                alt={item.label}
                className={`w-[32px] h-[32px]`}
              />
            </div>
          ))}

          {/* Botones de autenticación */}
          {currentUser ? (
            <>
              <button
                onClick={handleMyAccount}
                className="w-12 h-12 bg-[#078282] rounded-lg shadow-md flex justify-center items-center hover:bg-[#066666] transition-colors"
                title="Mi Cuenta"
              >
                <img
                  src={myaccountActive}
                  alt="My Account"
                  className="w-6 h-6"
                />
              </button>
              <button
                onClick={handleLogout}
                className="h-11 px-4 py-2.5 bg-[#078282] rounded-lg text-white font-semibold hover:bg-[#066666] transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="rounded-lg inline-flex justify-center items-center gap-2 overflow-hidden text-[#078282] text-base font-semibold font-['Nunito'] bg-transparent hover:text-[#066666] transition-colors"
              >
                Log In
              </button>

              <button
                onClick={handleRegister}
                className="px-4 py-2.5 bg-[#078282] rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline outline-1 outline-offset-[-1px] outline-[#078282] inline-flex justify-center items-center gap-2 overflow-hidden text-white text-base font-semibold font-['Nunito'] hover:bg-[#066666] hover:outline-[#066666] transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Estilos para el filtro de color */}
      <style jsx>{`
        .filter-green {
          filter: invert(33%) sepia(67%) saturate(937%) hue-rotate(134deg) brightness(92%) contrast(101%);
        }
      `}</style>
    </nav>
  );
};

export default NavIcons;
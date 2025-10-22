import { useState, useEffect } from "react";

// LOGOS
const LogoDark = "/src/assets/sidebar-icons/antologa-logo01-dark.svg";
const LogoIcon = "/src/assets/sidebar-icons/antologa-logo01-icon.svg";

// ICONOS
const icons = {
  dashboard: ["/src/assets/sidebar-icons/dashboard-icon.svg", "/src/assets/sidebar-icons/dashboard-icon02.svg"],
  users: ["/src/assets/sidebar-icons/profile-icon.svg", "/src/assets/sidebar-icons/profile-icon02.svg"],
  business: ["/src/assets/sidebar-icons/business-icon.svg", "/src/assets/sidebar-icons/business-icon02.svg"],
  destinations: ["/src/assets/sidebar-icons/destinations-icon.svg", "/src/assets/sidebar-icons/destinations-icon02.svg"],
  experiences: ["/src/assets/sidebar-icons/experiences-icon.svg", "/src/assets/sidebar-icons/experiences-icon02.svg"],
  traffic: ["/src/assets/sidebar-icons/traffic-icon.svg", "/src/assets/sidebar-icons/traffic-icon02.svg"],
  sales: ["/src/assets/sidebar-icons/sales-icon.svg", "/src/assets/sidebar-icons/sales-icon02.svg"],
  profile: ["/src/assets/sidebar-icons/profile-icon02.svg", "/src/assets/sidebar-icons/profile-icon02.svg"],
};

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [iconsDelayed, setIconsDelayed] = useState(sidebarOpen); // estado para delay

  // Cada vez que se toca toggle, esperar 200ms antes de cambiar los iconos
  useEffect(() => {
    const timer = setTimeout(() => setIconsDelayed(sidebarOpen), 200); 
    return () => clearTimeout(timer);
  }, [sidebarOpen]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "users", label: "User DB" },
    { id: "business", label: "Business DB" },
    { id: "destinations", label: "Destinations" },
    { id: "experiences", label: "Experiences" },
    { id: "traffic", label: "Site Traffic" },
    { id: "sales", label: "Sales" },
    { id: "profile", label: "Profile & Admin" },
  ];

  const handleToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col items-center bg-[#F8F8F8] rounded-r-3xl 
      shadow-[4px_0_10px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 ease-in-out
      ${sidebarOpen ? "w-64 px-6" : "w-20 px-3"}`}
    >
      {/* LOGO */}
      <div className={`absolute top-6 left-1/2 -translate-x-1/2 transition-all duration-500 ${sidebarOpen ? "w-40 h-20" : "w-16 h-16"}`}>
        <img src={sidebarOpen ? LogoDark : LogoIcon} alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* BOTONES */}
      <div className="relative flex flex-col items-center w-full flex-1 mt-32">
        <nav className="flex flex-col items-center w-full gap-3 py-4">
          {menuItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredItem === id;
            const [normal, hover] = icons[id];
            const iconSrc = iconsDelayed ? hover : normal; // <-- Aquí usamos el estado retrasado

            return (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                onMouseEnter={() => setHoveredItem(id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group flex items-center w-full rounded-xl transition-all duration-300
                  ${sidebarOpen ? "px-4 py-2" : "justify-center p-2"}
                  ${isActive ? "bg-white shadow-md" : "bg-[#F8F8F8] hover:bg-white hover:shadow-md"}`}
              >
                <img src={iconSrc} alt={label} className="w-7 h-7 flex-shrink-0" />
                {sidebarOpen && <span className="ml-3 font-medium text-sm">{label}</span>}
              </button>
            );
          })}

          {/* TOGGLE */}
          <button
            onClick={handleToggle}
            className="group flex items-center justify-center w-full rounded-xl bg-[#F8F8F8] px-4 py-2 mt-6 hover:bg-white hover:shadow-md transition-all duration-300"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="black">
                <path d="M16 17.7585L9.53221 24.2263C9.29022 24.4683 8.98223 24.5893 8.60824 24.5893C8.23426 24.5893 7.92627 24.4683 7.68428 24.2263C7.44228 23.9843 7.32129 23.6763 7.32129 23.3023C7.32129 22.9284 7.44228 22.6204 7.68428 22.3784L14.152 15.9106L7.68428 9.44285C7.44228 9.20086 7.32129 8.89287 7.32129 8.51889C7.32129 8.1449 7.44228 7.83691 7.68428 7.59492C7.92627 7.35293 8.23426 7.23193 8.60824 7.23193C8.98223 7.23193 9.29022 7.35293 9.53221 7.59492L16 14.0627L22.4677 7.59492C22.7097 7.35293 23.0177 7.23193 23.3917 7.23193C23.7657 7.23193 24.0737 7.35293 24.3157 7.59492C24.5577 7.83691 24.6786 8.1449 24.6786 8.51889C24.6786 8.89287 24.5577 9.20086 24.3157 9.44285L17.8479 15.9106L24.3157 22.3784C24.5577 22.6204 24.6786 22.9284 24.6786 23.3023C24.6786 23.6763 24.5577 23.9843 24.3157 24.2263C24.0737 24.4683 23.7657 24.5893 23.3917 24.5893C23.0177 24.5893 22.7097 24.4683 22.4677 24.2263L16 17.7585Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="black">
                <path d="M5.33334 24C4.95556 24 4.63912 23.872 4.384 23.616C4.12889 23.36 4.00089 23.0436 4 22.6667C3.99912 22.2898 4.12712 21.9733 4.384 21.7173C4.64089 21.4613 4.95734 21.3333 5.33334 21.3333H26.6667C27.0445 21.3333 27.3613 21.4613 27.6173 21.7173C27.8733 21.9733 28.0009 22.2898 28 22.6667C27.9991 23.0436 27.8711 23.3604 27.616 23.6173C27.3609 23.8742 27.0445 24.0018 26.6667 24H5.33334ZM5.33334 17.3333C4.95556 17.3333 4.63912 17.2053 4.384 16.9493C4.12889 16.6933 4.00089 16.3769 4 16C3.99912 15.6231 4.12712 15.3067 4.384 15.0507C4.64089 14.7947 4.95734 14.6667 5.33334 14.6667H26.6667C27.0445 14.6667 27.3613 14.7947 27.6173 15.0507C27.8733 15.3067 28.0009 15.6231 28 16C27.9991 16.3769 27.8711 16.6938 27.616 16.9507C27.3609 17.2076 27.0445 17.3351 26.6667 17.3333H5.33334ZM5.33334 10.6667C4.95556 10.6667 4.63912 10.5387 4.384 10.2827C4.12889 10.0267 4.00089 9.71022 4 9.33333C3.99912 8.95644 4.12712 8.64 4.384 8.384C4.64089 8.128 4.95734 8 5.33334 8H26.6667C27.0445 8 27.3613 8.128 27.6173 8.384C27.8733 8.64 28.0009 8.95644 28 9.33333C27.9991 9.71022 27.8711 10.0271 27.616 10.284C27.3609 10.5409 27.0445 10.6684 26.6667 10.6667H5.33334Z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

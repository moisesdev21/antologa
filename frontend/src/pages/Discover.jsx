import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AntologaSearch from "../components/AntologaSearch";

const Discover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname.includes('/discover/experiences')) return 'experiences';
    return 'destinations';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'destinations') {
      navigate('/discover/destinations');
    } else {
      navigate('/discover/experiences');
    }
  };

  return (
    <div className="relative bg-white dark:bg-dark-bg min-h-screen mt-[0.25rem] transition-colors duration-300">
      <div className="pt-[8.25rem]"> 
        
        {/* Toggle Switch Centrado */}
        <div className="flex justify-center mb-[1rem]">
          <div className="bg-gray-100 dark:bg-dark-surface rounded-full p-[0.5rem] flex gap-[0.5rem] shadow-md">
            
            {/* Destinations */}
            <div
              onClick={() => handleTabChange("destinations")}
              className={`px-[1rem] py-[0.625rem] inline-flex justify-center items-start cursor-pointer transition-all duration-300 ${
                activeTab === "destinations" ? "bg-teal-500 rounded-full shadow-lg" : ""
              }`}
            >
              <div className="inline-flex flex-col justify-start items-center">
                <div className="flex flex-col justify-start items-center">
                  <div
                    className={`text-center justify-center text-[1rem] leading-normal font-['Roboto'] ${
                      activeTab === "destinations"
                        ? "text-stone-50 font-medium"
                        : "text-color-grey-42 dark:text-gray-300 font-normal"
                    }`}
                  >
                    Destinations
                  </div>
                </div>
              </div>
            </div>

            {/* Experiences */}
            <div
              onClick={() => handleTabChange("experiences")}
              className={`px-[1rem] py-[0.625rem] inline-flex justify-center items-start cursor-pointer transition-all duration-300 ${
                activeTab === "experiences" ? "bg-teal-500 rounded-full shadow-lg" : ""
              }`}
            >
              <div className="inline-flex flex-col justify-start items-center">
                <div className="flex flex-col justify-start items-center">
                  <div
                    className={`text-center justify-center text-[1rem] leading-normal font-['Roboto'] ${
                      activeTab === "experiences"
                        ? "text-stone-50 font-medium"
                        : "text-color-grey-42 dark:text-gray-300 font-normal"
                    }`}
                  >
                    Experiences
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Aquí insertamos tu buscador AntologaSearch y le pasamos el activeTab */}
        <div className="max-w-[72rem] mx-auto mb-[-4 rem]">
          <AntologaSearch discoverActiveTab={activeTab} />
        </div>

        {/* Renderizar el contenido de la página hija */}
        <Outlet />
      </div>
    </div>
  );
};

export default Discover;
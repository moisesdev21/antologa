// layouts/FloatingSupport.jsx
import React from "react";
import support from "../assets/nav-menu-icons/support.svg";

const FloatingSupport = () => {
  const handleSupportClick = () => {
    window.open('/support', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleSupportClick}
        className="w-14 h-14 bg-[#078282] rounded-full shadow-lg flex items-center justify-center hover:bg-[#066666] transition-colors duration-300 hover:scale-110"
        title="Soporte"
      >
        <img
          src={support}
          alt="Soporte"
          className="w-6 h-6 filter-white"
        />
      </button>
      
      <style jsx>{`
        .filter-white {
          filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
        }
      `}</style>
    </div>
  );
};

export default FloatingSupport;
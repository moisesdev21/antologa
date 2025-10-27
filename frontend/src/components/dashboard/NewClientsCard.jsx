const NewClientsCard = ({ totalBusinesses = 0 }) => {
  return (
    <div className="h-[80px] rounded-[15px] bg-[#F8F8F8] dark:bg-dark-surface shadow-[0_3.5px_5.5px_rgba(0,0,0,0.02)] flex items-center justify-between px-6 transition-colors duration-300">
      <div className="flex flex-col">
        <span className="text-[#A0AEC0] dark:text-gray-400 text-[12px] font-bold font-montserrat">
          New Clients
        </span>
        <span className="text-[#2D3748] dark:text-white text-[18px] font-bold font-helvetica">
          {totalBusinesses}
        </span>
        <span className="text-[#E53E3E] text-[14px] font-bold font-helvetica">
          -1.7%
        </span>
      </div>

      <div className="w-[32px] h-[32px] flex-shrink-0">
        {/* Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="none" viewBox="0 0 33 32">
          <path d="M9.945 2.012h5.75c.06 0 .12.025..."
            fill="#C45A32"/>
        </svg>
      </div>
    </div>
  );
};

export default NewClientsCard;
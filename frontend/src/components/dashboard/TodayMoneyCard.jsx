const TodayMoneyCard = ({ amount = 0 }) => {
  return (
    <div className="h-[80px] rounded-[15px] bg-[#F8F8F8] dark:bg-dark-surface shadow-[0_3.5px_5.5px_rgba(0,0,0,0.02)] flex items-center justify-between px-6 transition-colors duration-300">
      <div className="flex flex-col">
        <span className="text-[#A0AEC0] dark:text-gray-400 text-[12px] font-bold font-montserrat">
          Today's Money
        </span>
        <span className="text-[#2D3748] dark:text-white text-[18px] font-bold font-helvetica">
          ${amount.toFixed(2)}
        </span>
        <span className="text-[#48BB78] text-[14px] font-bold font-helvetica">
          +5.6%
        </span>
      </div>

      <div className="w-[32px] h-[32px] flex-shrink-0">
        {/* Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="none" viewBox="0 0 33 32">
          <path d="M6.074 6.497H26.074c.234 0 .467.015.699.045..."
            fill="#C45A32"/>
        </svg>
      </div>
    </div>
  );
};

export default TodayMoneyCard;
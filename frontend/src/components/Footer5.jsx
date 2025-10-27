import React from 'react';

const Footer5 = () => {
  const handleGetInTouch = () => {
    window.location.href = '/contact';
  };

  const handleJoinTeam = () => {
    window.location.href = '/careers';
  };

  return (
    <div className="flex justify-center items-start bg-[#061C3D] w-full">
      {/* Call to Actions Section */}
      <div className="flex flex-col justify-center items-start gap-[72px] bg-[#004F71] p-[124px_112px_124px_300px]">
        {/* Let's Work Together Section */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-6 w-[424px]">
            <h2 className="text-[#E1A951] font-inter text-[40px] font-bold leading-[48px] tracking-[-0.8px]">
              Have a project idea! Let’s work together.
            </h2>
            <p className="text-[#E1A951] font-inter text-base font-normal leading-6">
              Nunc vel metus cursus, tempor ipsum sit amet, rutrum justo. Maecenas tincidunt imperdiet magna, et porta libero eleifend vel.
            </p>
          </div>
          
          {/* Get in Touch Button */}
          <button
            onClick={handleGetInTouch}
            className="flex px-8 justify-center items-center gap-3 rounded-[7px] bg-[#E1A951] hover:bg-[#d19a41] transition-colors duration-200"
          >
            <span className="text-[#004F71] font-inter text-base font-bold leading-[48px] uppercase">
              Business CTA
            </span>
          </button>
        </div>

        {/* Join our Team Section */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-6 w-[424px]">
            <h3 className="text-[#E1A951] font-inter text-[32px] font-bold leading-[40px]">
              Join our team. We’re open to hire creative peoples!               
               <p/>
            </h3>
          </div>
          
          {/* Join Team Button */}
          <button
            onClick={handleJoinTeam}
            className="flex px-5 justify-center items-center gap-2 rounded-[5px] bg-[#004F71] border-[1.5px] border-[#E1A951] hover:bg-[#E1A951] hover:bg-opacity-10 transition-all duration-200"
          >
            <span className="text-[#E1A951] font-lexend text-sm font-bold leading-[40px] uppercase">
              Travel Agency CTA
            </span>
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div 
        className="flex w-[1084px] h-[788px] p-[124px_300px_124px_136px] flex-col justify-center items-center gap-[72px] bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('/icons/footer-bg.svg')`
        }}
      >
        {/* Contenido opcional */}
      </div>
    </div>
  );
};

export default Footer5;
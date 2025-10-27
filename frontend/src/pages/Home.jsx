import React from 'react';
import AntologaSearch from '../components/AntologaSearch';
import Footer5 from '../components/Footer5';

// Reusable Button
const ArrowButton = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseClasses = "flex py-0 px-8 justify-center items-center gap-3 rounded-lg font-inter text-base font-bold leading-[48px] uppercase transition-all duration-300 hover:scale-105";
  const variants = {
    primary: "bg-[#078282] text-[#F8F8F8] border-2 border-[#078282]",
    outline: "border-2 border-[#078282] text-[#078282] bg-transparent"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg" className="transform rotate-180">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

// Services Card
const ServiceCard = ({ title, description, icon: IconComponent }) => (
  <div className="flex flex-col items-start gap-5 p-6 rounded-[16px] border-2 border-[#078282] bg-[#F8F8F8] dark:bg-dark-surface hover:shadow-lg transition-all duration-300">
    <div className="flex p-4 items-start gap-2.5 rounded-lg bg-[#078282]">
      <IconComponent />
    </div>
    <div className="flex flex-col items-start gap-3 pt-1">
      
      <h3 className="w-full text-[#078282] font-montserrat text-lg font-bold leading-[26px] tracking-[0.36px]">
        {title}
      </h3>
      <p className="w-full text-[#242424] dark:text-gray-200 font-lexend text-sm font-light leading-5">
        {description}
      </p>
    </div>
  </div>
);

// Project Card
const ProjectCard = ({ image, roles, title, description, reverse = false }) => (
  <div className={`flex justify-between items-center gap-12 ${reverse ? 'flex-row-reverse' : ''}`}>
    <div className="w-[660px] h-[424px] flex-shrink-0 rounded-[32px] bg-cover bg-no-repeat bg-center bg-gray-300 hover:scale-105 transition-transform duration-500"
      style={{ backgroundImage: `url(${image})` }} />

    <div className="flex flex-col items-start gap-8 flex-1">
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-start gap-1.5 text-[#42526B] dark:text-gray-400 font-inter text-sm">{roles}</div>
        <h3 className="w-full text-[#061C3D] dark:text-white font-inter text-[32px] font-bold leading-[40px] tracking-[-0.64px]">{title}</h3>
        <p className="w-full text-[#42526B] dark:text-gray-300 font-inter text-lg font-normal leading-[26px]">{description}</p>
      </div>
      <ArrowButton>View Case Study</ArrowButton>
    </div>
  </div>
);

const Home = () => {
  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80",
      roles: "Creative Direction/UX/UI/Website Design/Icon Design",
      title: "PMR — online platform & responsive website design",
      description: "Less Doing, More Living was a conference about productivity and entrepreneurship hosted by Ari Meisel."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80",
      roles: "Brand Strategy/Visual Identity/Web Development",
      title: "EcoLife — Sustainable Brand Identity",
      description: "A comprehensive brand identity for an eco-friendly startup focusing on sustainable living products.",
      reverse: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80",
      roles: "Mobile App Design/User Research/Prototyping",
      title: "FitTrack — Fitness Mobile Application",
      description: "A fitness application that helps users track workouts, nutrition, and progress with personalized recommendations."
    }
  ];

  const services = [
    { title: "UI/UX Design", description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna." },
    { title: "Web Development", description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna." },
    { title: "Mobile App Development", description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna." },
    { title: "Brand Strategy", description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna." },
    { title: "Digital Marketing", description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna." },
    { title: "E-commerce Solutions", description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna." }
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-dark-bg">

      {/* HERO */}
      <section className="flex flex-col items-center gap-[118px] self-stretch h-[1080px] bg-gray-100 dark:bg-dark-surface"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.80) 100%), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e) center/cover'
        }}>
        <div className="flex flex-col justify-center items-center gap-9 w-full mt-40">
          <h1 className="w-[1320px] text-white text-center font-inter text-[80px] font-bold leading-[88px] tracking-[-1.6px]">
            Wander. Explore. Discover.
          </h1>
          <p className="w-[606px] text-white text-center font-nunito text-xl font-normal leading-8 tracking-[0.8px]">
            Golio gives you everything you need to create your website in minutes.
          </p>
          <div className="flex w-[1200px] h-[166px] pt-[21px] flex-col justify-end items-center">
            <AntologaSearch />
          </div>
        </div>
      </section>

      {/* EMPTY (grey blocks) */}
      <section className="w-full h-[1080px] bg-gray-100 dark:bg-dark-surface" />

      {/* FEATURED PROJECTS */}
      <section className="flex flex-col items-center gap-[72px] bg-white dark:bg-dark-bg py-[124px] w-full">
        <div className="w-[1320px] flex flex-col gap-[72px]">
          <header className="flex items-center gap-[72px]">
            <h2 className="flex-1 text-[#078282] font-inter text-[56px] font-bold leading-[72px] tracking-[-1.12px]">
              Our featured projects
            </h2>
            <div className="flex flex-col items-start gap-6">
              <p className="w-[536px] text-[#42526B] dark:text-gray-300 font-inter text-lg leading-[26px]">
                Cras imperdiet est eget nulla fringilla, sit amet volutpat sem tristique.
              </p>
              <ArrowButton variant="outline">View all portfolio</ArrowButton>
            </div>
          </header>

          <div className="flex flex-col gap-[72px]">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="w-full bg-[#F8F8F8] dark:bg-dark-surface flex flex-col justify-center items-center py-[200px]">
        <div className="w-[1320px] flex flex-col gap-16">
          <div className="flex items-start justify-between gap-10">
            <div className="flex flex-col gap-6 max-w-[560px]">
              <h2 className="text-[#078282] font-inter text-[64px] font-bold leading-[82px]">
                Explore our Gilio team services.
              </h2>
              <p className="text-[#282828] dark:text-gray-300 font-inter text-lg leading-[26px]">
                Nunc convallis semper justo quis tempor. Praesent molestie,
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 w-[580px]">
              {services.slice(0, 2).map((service, i) => (
                <ServiceCard key={i} {...service} icon={() => <div className="w-6 h-6 bg-white opacity-20 rounded" />} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {services.slice(2, 6).map((service, i) => (
              <ServiceCard key={i} {...service} icon={() => <div className="w-6 h-6 bg-white opacity-20 rounded" />} />
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center w-full bg-[#F8F8F8] dark:bg-dark-surface flex-shrink-0">
        <div className="w-full max-w-[1920px]">
          <Footer5 />
        </div>
      </div>

      {/* TRUSTED COMPANIES (FINAL) */}
      <section className="w-full bg-[#F8F8F8] dark:bg-dark-surface flex justify-center py-[124px]">
        <div className="max-w-[1320px] w-full flex items-center gap-20 px-[80px]">
          
          {/* LEFT TEXT */}
          <div className="flex flex-col gap-6 max-w-[380px]">
            <h2 className="text-[#078282] font-inter font-bold text-[36px] leading-[48px]">
              We're just keep<br />growing with 6.3k<br />trusted companies
            </h2>

            <p className="text-[#42526B] dark:text-gray-300 font-nunito text-[16px] leading-[24px]">
              Nullam nec ipsum luctus, vehicula massa in, dictum sapien. Aenean quis luctus ert nulla quam augue.
            </p>
          </div>

          {/* LOGO GRID */}
          <div className="grid grid-cols-4 gap-6">
            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/youtube.svg" alt="YouTube" className="dark:invert dark:brightness-200" /></div>
            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/slack.svg" alt="Slack" className="dark:invert dark:brightness-200" /></div>
            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/amazon.svg" alt="Amazon" className="dark:invert dark:brightness-200" /></div>
            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/microsoft.svg" alt="Microsoft" className="dark:invert dark:brightness-200" /></div>

            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/lenovo.svg" alt="Lenovo" className="dark:invert dark:brightness-200" /></div>
            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/netflix.svg" alt="Netflix" className="dark:invert dark:brightness-200" /></div>
            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/google.svg" alt="Google" className="dark:invert dark:brightness-200" /></div>
            <div className="w-[170px] h-[100px] bg-white dark:bg-dark-bg rounded-xl flex justify-center items-center shadow-sm dark:shadow-gray-800"><img src="/public/logos/dribbble.svg" alt="Dribbble" className="dark:invert dark:brightness-200" /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
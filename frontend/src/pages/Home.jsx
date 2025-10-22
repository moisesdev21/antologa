// src/pages/Home.jsx
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import AntologaSearch from '../components/AntologaSearch';

// Componente reutilizable para botones
const ArrowButton = ({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "" 
}) => {
  const baseClasses = "flex py-0 px-8 justify-center items-center gap-3 rounded-lg font-inter text-base font-bold leading-[48px] uppercase transition-all duration-300 hover:scale-105";
  
  const variants = {
    primary: "bg-[#078282] text-[#F8F8F8] border-2 border-[#078282]",
    outline: "border-2 border-[#078282] text-[#078282] bg-transparent"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transform rotate-180"
        aria-hidden="true"
      >
        <path 
          d="M5 12H19M19 12L12 5M19 12L12 19" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

// Componente para tarjetas de servicios
const ServiceCard = ({ 
  title, 
  description, 
  icon: IconComponent 
}) => (
  <div className="flex flex-col items-start gap-5 p-6 rounded-[16px] border-2 border-[#078282] bg-[#F8F8F8] hover:shadow-lg transition-all duration-300">
    <div className="flex p-4 items-start gap-2.5 rounded-lg bg-[#078282]">
      <IconComponent />
    </div>
    <div className="flex flex-col items-start gap-3 pt-1">
      <h3 className="w-full text-[#078282] font-montserrat text-lg font-bold leading-[26px] tracking-[0.36px]">
        {title}
      </h3>
      <p className="w-full text-[#242424] font-lexend text-sm font-light leading-5">
        {description}
      </p>
    </div>
  </div>
);

// Componente de proyecto reutilizable
const ProjectCard = ({ 
  image, 
  roles, 
  title, 
  description, 
  reverse = false 
}) => (
  <div className={`flex justify-between items-center gap-12 ${
    reverse ? 'flex-row-reverse' : ''
  }`}>
    {/* Imagen del proyecto */}
    <div 
      className="w-[660px] h-[424px] flex-shrink-0 rounded-[32px] bg-cover bg-no-repeat bg-center bg-gray-300 hover:scale-105 transition-transform duration-500"
      style={{ backgroundImage: `url(${image})` }}
      role="img"
      aria-label={`Imagen del proyecto ${title}`}
    />
    
    {/* Información del proyecto */}
    <div className="flex flex-col items-start gap-8 flex-1">
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-start gap-1.5 text-[#42526B] font-inter text-sm">
          {roles}
        </div>
        
        <h3 className="w-full text-[#061C3D] font-inter text-[32px] font-bold leading-[40px] tracking-[-0.64px]">
          {title}
        </h3>
        
        <p className="w-full text-[#42526B] font-inter text-lg font-normal leading-[26px]">
          {description}
        </p>
      </div>
      
      <ArrowButton>
        View Case Study
      </ArrowButton>
    </div>
  </div>
);

const Home = () => {
  // Datos de proyectos para hacer el código más mantenible
  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=660&h=424&q=80",
      roles: "Creative Direction/UX/UI/Website Design/Icon Design",
      title: "PMR — online platform & responsive website design",
      description: "Less Doing, More Living was a conference about productivity and entrepreneurship hosted by Ari Meisel, author of two bestselling books: 'The Art of Less Doing' and 'The Replaceable Founder'."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=660&h=424&q=80",
      roles: "Brand Strategy/Visual Identity/Web Development",
      title: "EcoLife — Sustainable Brand Identity",
      description: "A comprehensive brand identity for an eco-friendly startup focusing on sustainable living products and environmental awareness campaigns.",
      reverse: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=660&h=424&q=80",
      roles: "Mobile App Design/User Research/Prototyping",
      title: "FitTrack — Fitness Mobile Application",
      description: "A mobile fitness application that helps users track workouts, nutrition, and progress with intuitive UI and personalized recommendations."
    }
  ];

  // Datos de servicios
  const services = [
    {
      title: "UI/UX Design",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna."
    },
    {
      title: "Web Development",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna."
    },
    {
      title: "Mobile App Development",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna."
    },
    {
      title: "Brand Strategy",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna."
    },
    {
      title: "Digital Marketing",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna."
    },
    {
      title: "E-commerce Solutions",
      description: "Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section - Ocupa todas las 12 columnas */}
      <div className="col-span-12">
        <section 
          className="flex flex-col items-center w-full gap-[118px] self-stretch h-[1080px] bg-cover bg-no-repeat bg-center"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.80) 100%), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80) lightgray 50% / cover no-repeat'
          }}
          aria-label="Hero section with search functionality"
        >
          {/* Header Navigation */}
          <header className="flex w-full py-6 items-start gap-2.5">
            <div className="flex flex-col justify-center items-center h-20 flex-1 w-full">
              {/* MainLayout maneja la navegación */}
            </div>
          </header>

          {/* Hero Content */}
          <div className="flex flex-col justify-center items-center gap-9 w-full">
            <h1 className="w-[1320px] text-white text-center font-inter text-[80px] font-bold leading-[88px] tracking-[-1.6px]">
              Wander. Explore. Discover.
            </h1>
            
            <p className="w-[606px] text-white text-center font-nunito text-xl font-normal leading-8 tracking-[0.8px]">
              Golio gives you everything you need to create your website in minutes. Bootstrap code with a well-organized Figma file to design & develop your next websites in minutes.
            </p>

            {/* Search Component */}
            <div className="flex w-[1200px] h-[166px] pt-[21px] flex-col justify-end items-center gap-[21px] flex-shrink-0">
              <AntologaSearch />
            </div>
          </div>
        </section>
      </div>

      {/* Empty Section (para futura implementación) - Ocupa todas las 12 columnas */}
      <div className="col-span-12">
        <section 
          className="w-full h-[1080px] bg-gray-100"
          aria-hidden="true"
        />
      </div>

      {/* Portfolio Section - Ocupa todas las 12 columnas */}
      <div className="col-span-12">
        <section className="flex flex-col items-center gap-[72px] bg-white py-[124px] w-full">
          <div className="w-[1320px] flex flex-col gap-[72px]">
            
            {/* Section Header */}
            <header className="flex items-center gap-[72px]">
              <h2 className="flex-1 text-[#078282] font-inter text-[56px] font-bold leading-[72px] tracking-[-1.12px]">
                Our featured projects
              </h2>
              
              <div className="flex flex-col items-start gap-6">
                <p className="w-[536px] text-[#42526B] font-inter text-lg font-normal leading-[26px]">
                  Cras imperdiet est eget nulla fringilla, sit amet volutpat sem tristique. Pellentesque quis augue ac mauris posuere vehicula.
                </p>
                
                <ArrowButton variant="outline">
                  View all portfolio
                </ArrowButton>
              </div>
            </header>

            {/* Projects List */}
            <div className="flex flex-col gap-[72px]">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  roles={project.roles}
                  title={project.title}
                  description={project.description}
                  reverse={project.reverse}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Services Section - Ocupa todas las 12 columnas */}
      <div className="col-span-12">
        <section className="w-full min-h-[960px] bg-[#F8F8F8] flex flex-col justify-center items-center gap-12 py-[200px] px-[300px]">
          <div className="w-[1320px] flex flex-col gap-12">
            
            {/* First Row - Header + 2 Cards */}
            <div className="flex justify-between items-start gap-6">
              {/* Info Section */}
              <div className="flex flex-col items-start gap-6 flex-1">
                <h2 className="text-[#078282] font-inter text-[64px] font-bold leading-[82px]">
                  Explore our Gilio team services.
                </h2>
                <p className="text-[#282828] font-inter text-lg font-normal leading-[26px] max-w-[536px]">
                  Nunc convallis semper justo quis tempor. Praesent molestie, lorem sed imperdiet tempor,
                </p>
              </div>
              
              {/* First two service cards */}
              <div className="flex gap-6">
                {services.slice(0, 2).map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    icon={() => (
                      <div className="w-8 h-8 flex justify-center items-center">
                        {/* Icono simplificado - puedes reemplazar con SVG real */}
                        <div className="w-6 h-6 bg-white opacity-20 rounded" />
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Second Row - 4 Cards */}
            <div className="flex justify-between items-start gap-6">
              {services.slice(2, 6).map((service, index) => (
                <ServiceCard
                  key={index + 2}
                  title={service.title}
                  description={service.description}
                  icon={() => (
                    <div className="w-8 h-8 flex justify-center items-center">
                      {/* Icono simplificado - puedes reemplazar con SVG real */}
                      <div className="w-6 h-6 bg-white opacity-20 rounded" />
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
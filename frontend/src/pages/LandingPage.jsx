// pages/LandingPage.jsx
import React, { useState } from 'react';

const LandingPage = ({ onSkip, onComplete }) => {
  // Estado para el scroll de destinos
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para manejar el click en "Get Started"
  const handleGetStarted = () => {
    // Establecer la cookie y navegar al home
    if (onComplete) {
      onComplete();
    }
    window.location.href = '/home';
  };

  // Función para manejar el skip
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
    window.location.href = '/home';
  };

  // Datos de las tarjetas de destinos
  const destinations = [
    {
      id: 1,
      location: "Rome, Italy",
      title: "Paradise Beach, Bantayan Island",
      price: "$550.16",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      location: "Paris, France",
      title: "Eiffel Tower Experience",
      price: "$620.00",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      location: "Tokyo, Japan",
      title: "Mount Fuji Adventure",
      price: "$480.50",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1540959733332-8abdfc6b1c87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      location: "Bali, Indonesia",
      title: "Ubud Rice Terrace Tour",
      price: "$320.75",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      location: "New York, USA",
      title: "Central Park Exploration",
      price: "$450.00",
      rating: "4.6",
      image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      location: "Sydney, Australia",
      title: "Sydney Opera House Tour",
      price: "$580.25",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      location: "Santorini, Greece",
      title: "Sunset Caldera Views",
      price: "$720.40",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      location: "Dubai, UAE",
      title: "Burj Khalifa Sky Deck",
      price: "$890.00",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 9,
      location: "London, UK",
      title: "Thames River Cruise",
      price: "$380.75",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Mostrar solo 3 tarjetas a la vez
  const visibleDestinations = destinations.slice(currentIndex, currentIndex + 3);

  // Función para scroll hacia la izquierda
  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // Función para scroll hacia la derecha
  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(prev + 1, destinations.length - 3));
  };

  return (
    <div className="w-full bg-white">
      {/* Contenedor principal */}
      <div className="w-full max-w-[100%] min-h-[100vh] mx-auto bg-white relative overflow-hidden">
        
        {/* Botón Skip flotante en la esquina superior derecha */}
        <button 
          onClick={handleSkip}
          className="absolute top-[1rem] right-[1rem] z-50 px-[1.5rem] py-[0.75rem] bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-colors duration-200 text-[0.875rem]"
        >
          Skip Intro
        </button>
        
        {/* OBJECTS.svg flotante */}
        <div className="absolute top-[20rem] right-[25%] w-[6.563rem] h-[10.622rem] flex-shrink-0 z-90">
          <img 
            src="/icons/OBJECTS.SVG" 
            alt="Objects" 
            className="w-full h-full"
          />
        </div>

        {/* Ellipse 24 - Efecto de brillo */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[31.25rem] h-[31.25rem] flex-shrink-0 rounded-full opacity-50 bg-[#E1A951] blur-[15.625rem] z-0">
        </div>

        {/* Primer container - Frame 82 */}
        <div className="flex justify-center w-full py-[4rem] relative z-10">
          <div className="w-[75%] max-w-[75rem] flex items-center">
            
            {/* Frame 15 - Contenedor principal del hero */}
            <div className="inline-flex items-center gap-[2rem] w-full relative">
              
              {/* Contenedor de texto - Frame 81 */}
              <div className="flex flex-col items-start gap-[2.688rem] flex-1">
  
                {/* Frame 10 - Explore the world! */}
                <div className="flex px-[2rem] py-[1rem] items-center gap-[1rem] bg-white rounded-full border border-gray-200 text-[1rem]">
                  <img 
                    src="/icons/work 1.svg" 
                    alt="Explore" 
                    className="w-[1.5rem] h-[1.5rem]"
                  />
                  <span className="text-black font-medium">
                    Explore the world!
                  </span>
                </div>

                {/* Título principal */}
                <h1 className="self-stretch text-[#000] font-inter text-[4rem] font-bold leading-[4.8rem]">
                  Travel <span className="text-[#078282]">top destination</span> <br />
                  of the world
                </h1>

                {/* Descripción */}
                <p className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem]">
                  We always make our customer happy by providing <br />
                  as many choices as possible
                </p>

                {/* Botones */}
                <div className="flex gap-[1rem]">
                  {/* Botón Get Started */}
                  <button 
                    onClick={handleGetStarted}
                    className="flex px-[2rem] py-[1rem] items-start gap-[0.5rem] rounded-full bg-[#078282] shadow-[0_7.875rem_2.188rem_0_rgba(0,0,0,0),0_5.063rem_2rem_0_rgba(0,0,0,0.01),0_2.813rem_1.688rem_0_rgba(0,0,0,0.05),0_1.25rem_1.25rem_0_rgba(0,0,0,0.09),0_0.313rem_0.688rem_0_rgba(0,0,0,0.1),0_0_0_0_rgba(0,0,0,0.1)] hover:bg-[#066666] transition-colors duration-200"
                  >
                    <span className="text-[#F8F8F8] font-inter text-[0.875rem] font-bold leading-[1.05rem]">
                      Get Started
                    </span>
                  </button>

                  {/* Botón Business */}
                  <button className="flex px-[2rem] py-[1rem] items-center gap-[0.5rem] rounded-full border border-[#EEE] bg-[#C45A32] hover:bg-[#A84A28] transition-colors duration-200">
                    <span className="text-[#F8F8F8] font-inter text-[0.875rem] font-bold leading-[1.05rem]">
                      Business
                    </span>
                  </button>
                </div>
              </div>

              {/* Sección de imágenes a la derecha */}
              <div className="relative flex-1">
                
                {/* Layer de fondo - MÁS ARRIBA */}
                <div className="absolute -top-[6rem] left-1/2 transform -translate-x-1/2 w-[48.25rem] h-[17.961rem] flex-shrink-0 z-10">
                  <img 
                    src="/icons/layer.svg" 
                    alt="Background layer" 
                    className="w-full h-full"
                  />
                </div>

                {/* Contenedor de imágenes */}
                <div className="flex gap-[2rem] relative z-20 items-start">
                  
                  {/* Columna de imágenes pequeñas - Frame 14 */}
                  <div className="flex flex-col items-start gap-[2rem]">
                    {/* Rectangle 1.svg */}
                    <div className="w-[17rem] h-[18.75rem] rounded-[2rem] bg-gray-300 bg-cover bg-center bg-no-repeat overflow-hidden">
                      <img 
                        src="/icons/Rectangle 1.svg" 
                        alt="Destination 2" 
                        className="w-full h-full rounded-[2rem] object-cover"
                      />
                    </div>
                    
                    {/* Rectangle 2.svg */}
                    <div className="w-[17rem] h-[18.75rem] rounded-[2rem] bg-gray-300 bg-cover bg-center bg-no-repeat overflow-hidden">
                      <img 
                        src="/icons/Rectangle 2.svg" 
                        alt="Destination 3" 
                        className="w-full h-full rounded-[2rem] object-cover"
                      />
                    </div>
                  </div>

                  {/* Rectangle 3.svg - Imagen vertical grande MÁS ABAJO */}
                  <div className="w-[17rem] h-[25rem] rounded-[2rem] bg-gray-300 bg-cover bg-center bg-no-repeat overflow-hidden mt-[4rem]">
                    <img 
                      src="/icons/Rectangle 3.svg" 
                      alt="Destination 1" 
                      className="w-full h-full rounded-[2rem] object-cover"
                    />
                  </div>
                </div>

                {/* Frame 18 - Top Places - Más a la derecha */}
                <div className="absolute left-[calc(100%+0px)] top-[20rem] inline-flex px-[2.5rem] py-[1.25rem] items-center gap-[0.5rem] rounded-full bg-white shadow-[0_7.5rem_2.125rem_0_rgba(0,0,0,0),0_4.813rem_1.938rem_0_rgba(0,0,0,0.01),0_2.688rem_1.625rem_0_rgba(0,0,0,0.05)] z-30">
                  <span className="text-[#393E46] font-montserrat text-[0.875rem] font-bold leading-[1.05rem]">
                    Top Places
                  </span>
                  <img 
                    src="/icons/location 1.svg" 
                    alt="Location" 
                    className="w-[1.5rem] h-[1.5rem]"
                  />
                </div>
              </div>

              {/* Frame 16 - En la esquina izquierda de Rectangle 1 */}
              <div className="absolute left-[47%] top-[45%] transform -translate-y-1/2 inline-flex p-[1rem] items-start gap-[0.5rem] rounded-full bg-[#078282] shadow-[0_7.5rem_2.125rem_0_rgba(0,0,0,0),0_4.813rem_1.938rem_0_rgba(0,0,0,0.01),0_2.688rem_1.625rem_0_rgba(0,0,0,0.05),0_1.188rem_1.188rem_0_rgba(0,0,0,0.09)] z-30">
                <img 
                  src="/icons/send 1.svg" 
                  alt="Send" 
                  className="w-[2rem] h-[2rem]"
                />
              </div>

              {/* Frame 17 - Abajo de Rectangle 3 */}
              <div className="absolute left-[80%] top-[85%] transform -translate-y-1/2 inline-flex p-[1rem] items-start gap-[0.5rem] rounded-full bg-[#C45A32] shadow-[0_7.5rem_2.125rem_0_rgba(0,0,0,0),0_4.813rem_1.938rem_0_rgba(0,0,0,0.01),0_2.688rem_1.625rem_0_rgba(0,0,0,0.05),0_1.188rem_1.188rem_0_rgba(0,0,0,0.09)] z-30">
                <img 
                  src="/icons/add-user 1.svg" 
                  alt="Add user" 
                  className="w-[2rem] h-[2rem]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Segundo container - Frame 89 */}
        <div className="flex w-full py-[4rem] justify-center items-center">
          <div className="w-full max-w-[100%] flex justify-center items-center">
            <div className="flex items-start gap-[4rem]">
              
              {/* Frame 22 - Texto al lado izquierdo, centrado verticalmente con las tarjetas */}
              <div className="flex w-[15.609rem] flex-col items-start gap-[1rem] self-center">
                <div className="self-stretch text-[#078282] font-montserrat text-[1.438rem] font-bold leading-[1.725rem] tracking-[0.288rem] uppercase">
                  SERVICES
                </div>
                <div className="self-stretch text-[#191825] font-montserrat text-[2.75rem] font-bold leading-[3.3rem]">
                  Our top value categories for you
                </div>
              </div>

              {/* Frame 88 - Contenedor de las tres tarjetas */}
              <div className="flex w-[59.391rem] items-start gap-[1.313rem]">
                
                {/* Frame 23 - Primera tarjeta */}
                <div className="flex h-[27.688rem] p-[4rem] flex-col items-center gap-[4rem] flex-1 rounded-[2rem] border border-[#191825] border-opacity-10 bg-white">
                  <img 
                    src="/icons/destination 1.svg" 
                    alt="Destination" 
                    className="w-[4rem] h-[4rem] flex-shrink-0"
                  />
                  
                  <div className="flex flex-col items-center gap-[2rem] self-stretch">
                    <div className="self-stretch text-[#191825] font-montserrat text-[1.75rem] font-bold leading-[2.1rem] text-center">
                      Best Tour Guide
                    </div>
                    <div className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem] text-center">
                      What looked like a small patch of purple grass, above five feet.
                    </div>
                  </div>
                </div>

                {/* Frame 24 - Segunda tarjeta con sombra */}
                <div className="flex h-[27.688rem] p-[4rem] flex-col items-center gap-[4rem] flex-1 rounded-[2rem] bg-white shadow-[0_2.563rem_5.563rem_0_rgba(0,0,0,0.1),0_0_0_0_rgba(0,0,0,0.1)]">
                  <img 
                    src="/icons/booking 1.svg" 
                    alt="Booking" 
                    className="w-[4rem] h-[4rem] flex-shrink-0"
                  />
                  
                  <div className="flex flex-col items-center gap-[2rem] self-stretch">
                    <div className="self-stretch text-[#191825] font-montserrat text-[1.75rem] font-bold leading-[2.1rem] text-center">
                      Easy Booking
                    </div>
                    <div className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem] text-center">
                      Square, was moving across the sand in their direction.
                    </div>
                  </div>
                </div>

                {/* Frame 25 - Tercera tarjeta */}
                <div className="flex h-[27.688rem] p-[4rem] flex-col items-center gap-[4rem] flex-1 rounded-[2rem] border border-[#191825] border-opacity-10 bg-white">
                  <img 
                    src="/icons/cloudy 1.svg" 
                    alt="Weather" 
                    className="w-[4rem] h-[4rem] flex-shrink-0"
                  />
                  
                  <div className="flex flex-col items-center gap-[2rem] self-stretch">
                    <div className="self-stretch text-[#191825] font-montserrat text-[1.75rem] font-bold leading-[2.1rem] text-center">
                      Weather Forecast
                    </div>
                    <div className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem] text-center">
                      What looked like a small patch of purple grass, above five feet.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Tercer container - Frame 109 - CENTRADO */}
        <div className="flex justify-center w-full py-[4rem]">
          <div className="flex flex-col items-start gap-[4rem] w-[75%] max-w-[75rem]">
            
            {/* Frame 22 - Encabezado */}
            <div className="flex flex-col items-start gap-[1rem] flex-1 w-full">
              <div className="self-stretch text-[#078282] font-montserrat text-[1.438rem] font-bold leading-[1.725rem] tracking-[0.288rem] uppercase">
                Top Destination
              </div>
              <div className="self-stretch text-[#191825] font-montserrat text-[2.75rem] font-bold leading-[3.3rem]">
                Explore top destination
              </div>
            </div>

            {/* Frame 90 - Botones de navegación UNO AL LADO DEL OTRO */}
            <div className="flex w-full items-center justify-end gap-[1rem]">
              
              {/* Rectangle 4 - Botón izquierdo */}
              <button 
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                className="flex w-[6.25rem] h-[6.25rem] flex-shrink-0 rounded-full border border-[#191825] border-opacity-10 bg-white items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img 
                  src="/icons/arrow-left 1.svg" 
                  alt="Previous" 
                  className="w-[1.5rem] h-[1.5rem] flex-shrink-0"
                />
              </button>

              {/* Rectangle 5 - Botón derecho */}
              <button 
                onClick={scrollRight}
                disabled={currentIndex >= destinations.length - 3}
                className="flex w-[6.25rem] h-[6.25rem] flex-shrink-0 rounded-[0.5rem] bg-[#078282] items-center justify-center hover:bg-[#066666] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img 
                  src="/icons/arrow-left 2.svg" 
                  alt="Next" 
                  className="w-[1.5rem] h-[1.5rem] flex-shrink-0"
                />
              </button>

            </div>

            {/* Frame 91 - Contenedor de tarjetas SIN SCROLL */}
            <div className="flex w-full items-start gap-[2rem]">
              {visibleDestinations.map((destination) => (
                <div 
                  key={destination.id}
                  className="flex h-[35.938rem] flex-col items-start flex-1"
                >
                  {/* Rectangle 6 - Imagen */}
                  <div className="flex-1 self-stretch rounded-t-[2rem] overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.location} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Frame 31 - Contenido */}
                  <div className="flex p-[2rem] flex-col items-start gap-[2rem] self-stretch bg-white rounded-b-[2rem] border border-t-0 border-[#191825] border-opacity-10">
                    
                    <div className="self-stretch text-[#191825] text-opacity-75 font-inter text-[1.125rem] font-normal leading-[1.8rem]">
                      {destination.location}
                    </div>

                    {/* Frame 36 */}
                    <div className="flex flex-col items-start gap-[1rem] self-stretch">
                      
                      {/* Frame 32 - Precio y título */}
                      <div className="flex items-start self-stretch">
                        <div className="flex-1 text-[#191825] font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                          {destination.title}
                        </div>
                        <div className="text-[#078282] font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                          {destination.price}
                        </div>
                      </div>

                      {/* Frame 30 - Rating */}
                      <div className="flex items-center gap-[0.5rem]">
                        <div className="text-[#078282] font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                          {destination.rating}
                        </div>
                        <img 
                          src="/icons/star 1.svg" 
                          alt="Star" 
                          className="w-[1.5rem] h-[1.5rem]"
                        />
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Cuarto container - Frame 103 */}
        <div className="flex justify-center w-full py-[4rem]">
          <div className="flex w-[75%] max-w-[75rem] h-[57rem] items-start gap-[4.375rem] flex-shrink-0">
            
            {/* Frame 102 - Contenido a la izquierda */}
            <div className="flex flex-col justify-center items-start gap-[4rem] flex-1">
              
              {/* Frame 100 - Encabezado */}
              <div className="flex flex-col items-start gap-[2rem] self-stretch">
                <div className="flex flex-col items-start gap-[1rem] self-stretch">
                  <div className="self-stretch text-[#078282] font-montserrat text-[1.438rem] font-bold leading-[1.725rem] tracking-[0.288rem] uppercase">
                    Key features
                  </div>
                  <div className="self-stretch text-[#191825] font-montserrat text-[2.75rem] font-bold leading-[3.3rem]">
                    We offer best services
                  </div>
                </div>
                <div className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem]">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature<br/>from 45 BC.
                </div>
              </div>

              {/* Frame 40 - Primera tarjeta */}
              <div className="flex p-[2rem] items-center gap-[2rem] self-stretch rounded-[2rem] bg-white">
                <div className="flex w-[6.25rem] h-[6.25rem] flex-shrink-0 rounded-[2rem] bg-[#078282] items-center justify-center">
                  <img 
                    src="/icons/location 2.svg" 
                    alt="Location" 
                    className="w-[3rem] h-[3rem] flex-shrink-0"
                  />
                </div>
                
                <div className="flex flex-col items-start gap-[1rem] self-stretch">
                  <div className="self-stretch text-[#191825] font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                    We offer best services
                  </div>
                  <div className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem]">
                    Lorem Ipsum is not simply random text
                  </div>
                </div>
              </div>

              {/* Frame 41 - Segunda tarjeta */}
              <div className="flex p-[2rem] items-center gap-[2rem] self-stretch rounded-[2rem] border border-[#191825] border-opacity-10 bg-white">
                <div className="flex w-[6.25rem] h-[6.25rem] flex-shrink-0 rounded-[2rem] bg-[#E1A951] items-center justify-center">
                  <img 
                    src="/icons/calendar 1.svg" 
                    alt="Calendar" 
                    className="w-[3rem] h-[3rem] flex-shrink-0"
                  />
                </div>
                
                <div className="flex flex-col items-start gap-[1rem] self-stretch">
                  <div className="self-stretch text-[#191825] font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                    Schedule your trip
                  </div>
                  <div className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem]">
                    It has roots in a piece of classical
                  </div>
                </div>
              </div>

              {/* Frame 42 - Tercera tarjeta */}
              <div className="flex p-[2rem] items-center gap-[2rem] self-stretch rounded-[2rem] bg-white">
                <div className="flex w-[6.25rem] h-[6.25rem] flex-shrink-0 rounded-[2rem] bg-[#C45A32] items-center justify-center">
                  <img 
                    src="/icons/ticket 1.svg" 
                    alt="Ticket" 
                    className="w-[3rem] h-[3rem] flex-shrink-0"
                  />
                </div>
                
                <div className="flex flex-col items-start gap-[1rem] self-stretch">
                  <div className="self-stretch text-[#191825] font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                    Get discounted coupons
                  </div>
                  <div className="self-stretch text-[#191825] text-opacity-50 font-inter text-[1.125rem] font-normal leading-[1.8rem]">
                    Lorem Ipsum is not simply random text
                  </div>
                </div>
              </div>

            </div>

            {/* BACKGROUND.svg - A LA DERECHA */}
            <div className="w-[38.5rem] h-[48.25rem] flex-shrink-0">
              <img 
                src="/icons/BACKGROUND.svg" 
                alt="Background" 
                className="w-full h-full"
              />
            </div>

          </div>
        </div>

        {/* Elementos decorativos - POSICIONES CORREGIDAS */}
        
        {/* Graphic Elements - A LA IZQUIERDA y en la esquina de arriba del container 5 */}
        <div className="absolute left-[5rem] top-[212.5rem] w-[11.491rem] h-[11.022rem] flex-shrink-0 z-30">
          <img 
            src="/icons/Graphic_Elements.svg" 
            alt="Graphic Elements" 
            className="w-full h-full"
          />
        </div>

        {/* Cuchara - MÁS ABAJO */}
        <div className="absolute right-[-31.25rem] top-[218.75rem] w-[156.637rem] h-[59.915rem] flex-shrink-0 opacity-20 z-10">
          <img 
            src="/icons/cuchara.svg" 
            alt="Spoon" 
            className="w-full h-full"
          />
        </div>

        {/* Estrella - En la esquina derecha de abajo del container 5 */}
        <div className="absolute right-[2.5rem] top-[237.5rem] w-[20.75rem] h-[21.997rem] flex-shrink-0 z-30">
          <img 
            src="/icons/estrella.svg" 
            alt="Star" 
            className="w-full h-full"
          />
        </div>

        {/* Quinto container - Frame 39 */}
        <div className="flex justify-center w-full py-[4rem] relative z-20">
          <div className="flex w-[75%] max-w-[75rem] px-[4rem] py-[8rem] bg-[#078282] bg-opacity-5 rounded-[2rem] flex-col justify-center items-center gap-[4rem]">
            
            {/* Contenido del newsletter */}
            <div className="flex flex-col items-start gap-[4rem] self-stretch">
              
              {/* Texto del encabezado */}
              <div className="flex flex-col items-start gap-[2rem] self-stretch">
                <div className="self-stretch text-[#078282] font-montserrat text-[1.438rem] font-bold leading-[1.725rem] tracking-[0.288rem] uppercase text-center">
                  subscribe to our newsletter
                </div>
                <div className="self-stretch text-[#191825] font-montserrat text-[3.438rem] font-bold leading-[4.125rem] text-center">
                  Prepare yourself & let's explore the beauty of the world
                </div>
              </div>

              {/* Formulario de suscripción */}
              <div className="flex items-start gap-[4rem] self-stretch">
                
                {/* Campo de email */}
                <div className="flex-1 self-stretch p-[2rem] bg-white rounded-[2rem] flex items-center gap-[1rem]">
                  <img 
                    src="/icons/message 1.svg" 
                    alt="Email" 
                    className="w-[2rem] h-[2rem] flex-shrink-0"
                  />
                  <div className="text-center text-[#191825] text-opacity-75 font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                    Your Email
                  </div>
                </div>

                {/* Botón de suscripción */}
                <div className="self-stretch px-[4rem] py-[2rem] bg-[#078282] rounded-[2rem] flex justify-center items-center gap-[1rem]">
                  <div className="text-center text-white font-montserrat text-[1.438rem] font-bold leading-[1.725rem]">
                    Subscribe
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Sexto container - Why Flypass */}
        <div className="flex justify-center w-full py-[4rem]">
          <div className="w-[85%] max-w-[85rem] px-[2.5rem] py-[3rem] bg-gray-50 rounded-[1.25rem] inline-flex justify-start items-center gap-[2rem]">
            
            {/* Tarjetas de características */}
            <div className="flex-1 flex justify-start items-start gap-[1rem]">
              
              {/* Tarjeta 1 - Seamless Booking Experience */}
              <div className="flex-1 p-[1rem] bg-white rounded-[1.25rem] shadow-[0px_0px_0.5rem_0px_rgba(0,0,0,0.15)] inline-flex flex-col justify-start items-start gap-[1.5rem]">
                <div className="p-[0.75rem] bg-teal-600 rounded inline-flex justify-start items-start gap-[0.625rem]">
                  <img 
                    src="/icons/rayo.svg" 
                    alt="Lightning" 
                    className="w-[1.5rem] h-[1.5rem] flex-shrink-0"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-[0.25rem]">
                  <div className="w-[13rem] justify-start text-zinc-800 text-[1rem] font-semibold font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                    Seamless Booking Experience
                  </div>
                  <div className="w-[13rem] justify-start text-zinc-800 text-[0.875rem] font-normal font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                    With Flypass, booking your flights is effortless and convenient.
                  </div>
                </div>
              </div>

              {/* Tarjeta 2 - Best Pricing and Deals */}
              <div className="flex-1 p-[1rem] bg-white rounded-[1.25rem] shadow-[0px_0px_0.5rem_0px_rgba(0,0,0,0.15)] inline-flex flex-col justify-start items-start gap-[1.5rem]">
                <div className="p-[0.75rem] bg-teal-600 rounded inline-flex justify-start items-start gap-[0.625rem]">
                  <img 
                    src="/icons/Subtract.svg" 
                    alt="Price" 
                    className="w-[1.25rem] h-[1.25rem] flex-shrink-0"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-[0.25rem]">
                  <div className="w-[13rem] justify-start text-zinc-800 text-[1rem] font-semibold font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                    Best Pricing and <br/>Deals
                  </div>
                  <div className="w-[13rem] justify-start text-zinc-800 text-[0.875rem] font-normal font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                    Flypass is committed to offering you the best possible value for your travel budget.
                  </div>
                </div>
              </div>

              {/* Tarjeta 3 - Personalized Travel Recommendations */}
              <div className="flex-1 p-[1rem] bg-white rounded-[1.25rem] shadow-[0px_0px_0.5rem_0px_rgba(0,0,0,0.15)] inline-flex flex-col justify-start items-start gap-[1.5rem]">
                <div className="p-[0.75rem] bg-teal-600 rounded inline-flex justify-start items-start gap-[0.625rem]">
                  <img 
                    src="/icons/foco.svg" 
                    alt="Personalized" 
                    className="w-[0.938rem] h-[1.25rem] flex-shrink-0"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-[0.25rem]">
                  <div className="w-[13rem] justify-start text-zinc-800 text-[1rem] font-semibold font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                    Personalized Travel Recommendations
                  </div>
                  <div className="w-[13rem] justify-start text-zinc-800 text-[0.875rem] font-normal font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                    Flypass offers personalized travel recommendations tailored to your preferences.
                  </div>
                </div>
              </div>

            </div>

            {/* Contenido de texto a la derecha */}
            <div className="inline-flex flex-col justify-start items-end gap-[1rem]">
              <div className="flex flex-col justify-start items-start gap-[0.5rem]">
                <div className="self-stretch text-right justify-start text-zinc-400 text-[1rem] font-normal font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                  WHY
                </div>
                <div className="w-[32.25rem] text-right justify-start text-[#078282] text-[2rem] font-semibold font-['Plus_Jakarta_Sans'] leading-[2.4rem]">
                  Discover Why Flypass is Your Ultimate Travel Companion!
                </div>
              </div>
              <div className="w-[28.813rem] text-right justify-start text-zinc-800 text-[1rem] font-normal font-['Plus_Jakarta_Sans'] leading-[1.25rem]">
                As your trusted travel companion, we're dedicated to elevating every aspect of your travel experience. We're here to ensure your journey is nothing short of extraordinary.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
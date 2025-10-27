import { useState } from "react";

const Destinations = () => {
  const [activeProvince, setActiveProvince] = useState("Bocas del Toro");
  const [currentRecommendIndex, setCurrentRecommendIndex] = useState(0);
  const [email, setEmail] = useState("");

  // Obtener el dominio base correcto
 

  // Provinces of Panama
  const provinces = [
    "Bocas del Toro",
    "Chiriquí",
    "Coclé",
    "Colón",
    "Darién",
    "Herrera",
    "Los Santos",
    "Panamá",
    "Veraguas",
    "Panamá Oeste",
    "Guna Yala",
    "Emberá-Wounaan",
    "Naso Tjër Di",
  ];

  // Destination data with original design (Explore + Trips Available)
  const destinations = [
    { id: 1, name: "Bocas del Toro", image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=400&h=500", available: 23, height: "h-80" },
    { id: 2, name: "Chiriquí", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&h=300", available: 45, height: "h-64" },
    { id: 3, name: "Coclé", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&h=400", available: 32, height: "h-72" },
    { id: 4, name: "Colón", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&h=600", available: 28, height: "h-96" },
    { id: 5, name: "Darién", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&h=350", available: 15, height: "h-68" },
    { id: 6, name: "Herrera", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&h=450", available: 21, height: "h-76" },
    { id: 7, name: "Los Santos", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=320", available: 19, height: "h-66" },
    { id: 8, name: "Panamá", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=400&h=550", available: 67, height: "h-88" },
    { id: 9, name: "Veraguas", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&h=380", available: 38, height: "h-70" },
    { id: 10, name: "Panamá Oeste", image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=400&h=420", available: 29, height: "h-74" },
    { id: 11, name: "Guna Yala", image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=400&h=480", available: 12, height: "h-84" },
    { id: 12, name: "Emberá-Wounaan", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&h=360", available: 8, height: "h-68" },
    { id: 13, name: "Naso Tjër Di", image: "https://images.unsplash.com/photo-1464822759844-dfa37c0ce6c3?auto=format&fit=crop&w=400&h=520", available: 5, height: "h-92" },
  ];

  // Recommended locations data - Todas de Panamá con diseño de tours
  const recommendedLocations = [
    {
      id: 1,
      title: "Bocas del Toro",
      description: "A lot of amazing experiences",
      distance: "452km",
      tours: "23 Tours",
      image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=300&h=400",
    },
    {
      id: 2,
      title: "San Blas Islands",
      description: "A lot of amazing experiences",
      distance: "150km",
      tours: "18 Tours",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=300&h=400",
    },
    {
      id: 3,
      title: "Volcán Barú",
      description: "A lot of amazing experiences",
      distance: "387km",
      tours: "12 Tours",
      image: "https://images.unsplash.com/photo-1464822759844-dfa37c0ce6c3?auto=format&fit=crop&w=300&h=400",
    },
    {
      id: 4,
      title: "Pearl Islands",
      description: "A lot of amazing experiences",
      distance: "80km",
      tours: "15 Tours",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&h=400",
    },
    {
      id: 5,
      title: "Santa Catalina",
      description: "A lot of amazing experiences",
      distance: "365km",
      tours: "9 Tours",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&h=400",
    },
    {
      id: 6,
      title: "El Valle de Antón",
      description: "A lot of amazing experiences",
      distance: "125km",
      tours: "21 Tours",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=300&h=400",
    }
  ];

  // Navigation functions for recommended section
  const nextRecommendation = () => {
    setCurrentRecommendIndex((prev) => 
      prev >= recommendedLocations.length - 4 ? 0 : prev + 1
    );
  };

  const prevRecommendation = () => {
    setCurrentRecommendIndex((prev) => 
      prev === 0 ? recommendedLocations.length - 4 : prev - 1
    );
  };

  // Get visible recommendations based on current index
  const getVisibleRecommendations = () => {
    return recommendedLocations.slice(currentRecommendIndex, currentRecommendIndex + 4);
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="relative bg-white dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* CONTENIDO PRINCIPAL - Sin navbar duplicado */}
      <div className="pt--16"> {/* Reducido el padding-top ya que el navbar es global */}
        {/* MAIN */}
        <main className="flex flex-col items-center w-full">
          {/* Destinations Section - Diseño original con Explore y Trips Available */}
          <div className="py-24 flex flex-col items-center gap-20 w-full max-w-[1200px] mx-auto">
            {/* Title */}
            <div className="flex flex-col items-center gap-10 text-center">
              <h1 className="text-[#078282] text-center font-montserrat text-[48px] font-bold leading-[56px] tracking-[-0.96px] w-[544px]">
                Destinations
              </h1>
              
              <p className="text-[#777E90] dark:text-gray-300 text-center font-nunito text-[16px] font-normal leading-[24px] max-w-[544px]">
                Explore the beauty of Panama's provinces and plan your next adventure.
              </p>

              {/* Sub Navigation - Botones de provincias */}
              <div className="w-full flex justify-center flex-wrap gap-2">
                {provinces.map((province) => (
                  <button
                    key={province}
                    onClick={() => setActiveProvince(province)}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-300 text-center 
                      font-nunito text-[16px] leading-[16px]
                      ${activeProvince === province
                        ? 'bg-[#078282] text-[#FCFCFD] font-black'
                        : 'bg-transparent text-[#777E90] dark:text-gray-300 font-normal hover:bg-gray-100 dark:hover:bg-dark-surface'
                      }
                    `}
                  >
                    {province}
                  </button>
                ))}
              </div>
            </div>

            {/* Destinations Grid - Masonry Layout ORIGINAL */}
            <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className={`relative break-inside-avoid rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${destination.height}`}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Text Overlay ORIGINAL - Explore + Trips Available */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-medium mb-1 opacity-90">
                      Explore
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        fill="none"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M1.33325 25.3333V5.33325H3.99992V18.6666H14.6666V7.99992H25.3333C26.7999 7.99992 28.0555 8.52214 29.0999 9.56659C30.1444 10.611 30.6666 11.8666 30.6666 13.3333V25.3333H27.9999V21.3333H3.99992V25.3333H1.33325ZM9.33325 17.3333C8.22214 17.3333 7.2777 16.9444 6.49992 16.1666C5.72214 15.3888 5.33325 14.4444 5.33325 13.3333C5.33325 12.2221 5.72214 11.2777 6.49992 10.4999C7.2777 9.72214 8.22214 9.33325 9.33325 9.33325C10.4444 9.33325 11.3888 9.72214 12.1666 10.4999C12.9444 11.2777 13.3333 12.2221 13.3333 13.3333C13.3333 14.4444 12.9444 15.3888 12.1666 16.1666C11.3888 16.9444 10.4444 17.3333 9.33325 17.3333Z"
                          fill="#FCFCFD"
                        />
                      </svg>
                      <span className="text-base font-normal leading-6">
                        {destination.available} Trips Available
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommend Section - Diseño original con Tours y Distancia */}
          <div className="flex w-full max-w-[1200px] py-[100px] flex-col justify-center items-center gap-2.5 bg-[#FCFCFD] dark:bg-dark-surface mx-auto transition-colors duration-300">
            {/* Container */}
            <div className="flex flex-col items-start gap-16 w-full">
              
              {/* Header */}
              <div className="flex justify-between items-end w-full">
                {/* Text Content */}
                <div className="flex flex-col items-start gap-4">
                  <h2 
                    className="text-[#078282] font-dm-sans text-[48px] font-bold leading-[56px] tracking-[-0.96px] w-[544px]"
                  >
                    Recommended pickup locations
                  </h2>
                  <p 
                    className="text-[#777E90] dark:text-gray-300 font-poppins text-[20px] font-normal leading-[32px] tracking-[-0.2px] w-[544px]"
                  >
                    A lot of amazing experiences
                  </p>
                </div>

                {/* Arrows - Flechas blancas */}
                <div className="flex w-[88px] justify-between items-start">
                  {/* Left Arrow */}
                  <button 
                    onClick={prevRecommendation}
                    className="flex p-2 items-center justify-center w-10 h-10 rounded-[40px] border-2 border-[#E6E8EC] dark:border-gray-600 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.90906 7.26521C9.50324 6.8906 8.87058 6.9159 8.49597 7.32172L5.2652 10.8217C4.9116 11.2047 4.9116 11.7952 5.26519 12.1782L8.49597 15.6783C8.87057 16.0841 9.50323 16.1094 9.90905 15.7348C10.3149 15.3602 10.3402 14.7276 9.96558 14.3217L8.28397 12.5L18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5L8.284 10.5L9.96557 8.67829C10.3402 8.27247 10.3149 7.63981 9.90906 7.26521Z" fill="#078282"/>
                    </svg>
                  </button>

                  {/* Right Arrow - Flecha blanca */}
                  <button 
                    onClick={nextRecommendation}
                    className="flex p-2 items-center justify-center w-10 h-10 rounded-[40px] border-2 border-[#E6E8EC] dark:border-gray-600 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44772 12.5 5 12.0523 5 11.5C5 10.9477 5.44772 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z" fill="#078282"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Images Container - Diseño ORIGINAL con Tours badge y distancia */}
              <div className="flex gap-6 w-full overflow-hidden">
                {getVisibleRecommendations().map((location) => (
                  <div
                    key={location.id}
                    className="flex-shrink-0 w-[282px] h-[344px] rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    {/* Image */}
                    <img
                      src={location.image}
                      alt={location.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Content Overlay ORIGINAL - Tours badge + distancia */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      {/* Tours Badge */}
                      <div className="flex px-4 py-1 items-center gap-2.5 rounded-[40px] border border-[#FCFCFD] bg-[rgba(20,20,22,0.20)] w-fit mb-4">
                        <span className="text-[#FCFCFD] font-poppins text-[14px] font-medium leading-[24px]">
                          {location.tours}
                        </span>
                      </div>

                      {/* Title and Distance */}
                      <h3 className="text-[#FCFCFD] font-dm-sans text-[24px] font-bold leading-[32px] mb-2">
                        {location.title}
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20ZM19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z" fill="#FCFCFD"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M15.5 4C14.1193 4 13 5.11929 13 6.5V17.5C13 19.9853 10.9853 22 8.5 22C6.01472 22 4 19.9853 4 17.5V10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10V17.5C6 18.8807 7.11929 20 8.5 20C9.88071 20 11 18.8807 11 17.5V6.5C11 4.01472 13.0147 2 15.5 2C17.9853 2 20 4.01472 20 6.5V13C20 13.5523 19.5523 14 19 14C18.4477 14 18 13.5523 18 13V6.5C18 5.11929 16.8807 4 15.5 4Z" fill="#FCFCFD"/>
                          <path d="M4.13619 2.48099C4.52207 1.81949 5.47787 1.81949 5.86375 2.48099L7.62271 5.49636C8.0116 6.16302 7.53073 7.00023 6.75893 7.00023H3.24101C2.46922 7.00023 1.98835 6.16301 2.37723 5.49636L4.13619 2.48099Z" fill="#FCFCFD"/>
                        </svg>
                        <span className="text-[#FCFCFD] font-poppins text-[16px] font-normal leading-[24px]">
                          {location.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section - Imagen a la derecha */}
          <div className="flex w-full max-w-[1200px] h-[702px] bg-white dark:bg-dark-bg mx-auto transition-colors duration-300">
            <div className="flex w-full h-full">
              {/* Content Section - Ahora a la izquierda */}
              <div className="flex w-[548px] flex-col justify-center items-start gap-8 px-8">
                {/* Headline */}
                <div className="flex flex-col items-start gap-4 w-full">
                  <span className="text-[#777E90] dark:text-gray-300 font-poppins text-[12px] font-bold leading-[12px] uppercase">
                    Take A Tour
                  </span>
                  <h2 className="text-[#078282] font-dm-sans text-[48px] font-bold leading-[56px] tracking-[-0.96px] w-[394px]">
                    Join our newsletter
                  </h2>
                  <p className="text-[#777E90] dark:text-gray-300 font-poppins text-[16px] font-normal leading-[24px] w-full">
                    Discover the hidden gems of Panama and get exclusive travel tips and offers directly to your inbox.
                  </p>
                </div>

                {/* Email Input Form */}
                <form onSubmit={handleSubscribe} className="w-full">
                  <div className="flex p-2 pl-4 items-center gap-4 rounded-lg border-2 border-[#078282]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 text-[#777E90] dark:text-gray-300 font-poppins text-[14px] font-normal leading-[24px] bg-transparent outline-none placeholder:text-[#777E90] dark:placeholder:text-gray-400"
                      required
                    />
                    <button
                      type="submit"
                      className="flex p-1 justify-center items-center gap-2.5 rounded-lg bg-[#078282] hover:bg-[#066a6a] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44772 12.5 5 12.0523 5 11.5C5 10.9477 5.44772 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z" fill="#FCFCFD"/>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              {/* Image Section - Ahora a la derecha */}
              <div className="w-[800px] h-[702px] bg-white dark:bg-dark-bg flex items-center justify-center transition-colors duration-300">
                <div className="w-[739px] h-[613px] bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1513415277900-a62401e19be4?auto=format&fit=crop&w=800&h=613"
                    alt="Panama Adventure"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER - Eliminado ya que el footer es global desde App.jsx */}
      </div>
    </div>
  );
};

export default Destinations;
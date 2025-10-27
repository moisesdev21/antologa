import { useState } from "react";

// Experiencias
const experiencias = [
  { id: 1, tipo: "Hiking", titulo: "Senderismo en Volcán Barú", distance: "5 km", imagen: "https://i0.wp.com/holidayfromwhere.com/wp-content/uploads/2020/01/The-Lost-Waterfalls-Trail-Hike-Boquete-header.jpg?fit=1170%2C780&ssl=1", height: "h-[430px]" },
  { id: 2, tipo: "Snorkeling", titulo: "Corales de Guna Yala", distance: "12 km", imagen: "https://stri.si.edu/sites/default/files/styles/stri-fpp__content-slider/public/fpp/images/content-slide/5_1_colorless_coral.jpg?itok=VsbFBCSk", height: "h-[380px]" },
  { id: 3, tipo: "Surfing", titulo: "Olas en Santa Catalina", distance: "20 km", imagen: "https://res.cloudinary.com/simpleview/image/upload/v1631971605/clients/panama/_8500415_8dec5e82-7f16-4e45-aa73-2e7a14260ff6.jpg", height: "h-[450px]" },
  { id: 4, tipo: "Bird Watching", titulo: "Avistamiento en Darién", distance: "15 km", imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pteroglossus-torquatus-001.jpg/1200px-Pteroglossus-torquatus-001.jpg", height: "h-[400px]" },
  { id: 5, tipo: "Kayaking", titulo: "Manglares de Bocas del Toro", distance: "8 km", imagen: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_325,q_65,w_640/v1/clients/panama/temp_9960b2f3-7697-4d49-a913-bdded9e5fce9.jpg", height: "h-[410px]" },
  { id: 6, tipo: "Cultural", titulo: "Casco Antiguo de Panamá", distance: "2 km", imagen: "https://cdn.prod.website-files.com/5efa2cf76690196c83784c64/671464bbeaadd3e4d0319145_Casco%20Viejo%20Panama%20City.jpg" },
  { id: 7, tipo: "Adventure", titulo: "Rafting en Chiriquí Viejo", distance: "14 km", imagen: "https://www.thevisitorpanama.info/eng/wp-content/uploads/2022/05/Compress_20220525_140428_8776.jpg", height: "h-[440px]" },
  { id: 8, tipo: "Nature", titulo: "Laguna de San Carlos", distance: "6 km", imagen: "https://www.heypanama.com/content/20210326113218-1.jpg", height: "h-[400px]" },
  { id: 9, tipo: "Cultural", titulo: "Festival de la Pollera en Las Tablas", distance: "3 km", imagen: "https://lacabanga.com/wp-content/uploads/2020/01/DSC06905-1350x1080.jpg", height: "h-[380px]" },
  { id: 10, tipo: "Surfing", titulo: "Playa Venao, Los Santos", distance: "10 km", imagen: "https://i0.wp.com/venaoguide.com/wp-content/uploads/2023/01/Venao-Guide-Casey-Experience-1014x1024.jpg?resize=1014%2C1024&ssl=1", height: "h-[420px]" },
  { id: 11, tipo: "Hiking", titulo: "Cerro Picacho en Veraguas", distance: "9 km", imagen: "https://www.heypanama.com/content/gallery2783/2020-12-01-12-3216270357991606843921.jpg", height: "h-[400px]" },
  { id: 12, tipo: "Nature", titulo: "Reserva La Yeguada, Veraguas", distance: "7 km", imagen: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Fotograf%C3%ADa_A%C3%A9rea_de_La_Yeguada_Panam%C3%A1.jpg", height: "h-[420px]" },
  { id: 13, tipo: "Snorkeling", titulo: "Islas Secas, Chiriquí", distance: "18 km", imagen: "https://d2j6dbq0eux0bg.cloudfront.net/images/68058289/2717858599.jpg", height: "h-[380px]" },
];

// Recomendaciones (carrusel)
const recomendaciones = [
  { title: "Volcán Barú Hiking", distance: "5 km", image: "https://i0.wp.com/holidayfromwhere.com/wp-content/uploads/2020/01/The-Lost-Waterfalls-Trail-Hike-Boquete-header.jpg?fit=1170%2C780&ssl=1" },
  { title: "Guna Yala Snorkeling", distance: "12 km", image: "https://stri.si.edu/sites/default/files/styles/stri-fpp__content-slider/public/fpp/images/content-slide/5_1_colorless_coral.jpg?itok=VsbFBCSk" },
  { title: "Santa Catalina Surf", distance: "20 km", image: "https://res.cloudinary.com/simpleview/image/upload/v1631971605/clients/panama/_8500415_8dec5e82-7f16-4e45-aa73-2e7a14260ff6.jpg" },
];

const actividades = [...new Set(experiencias.map((e) => e.tipo))];

export default function Experiences() {
  const [filtro, setFiltro] = useState("All");
  const [currentRec, setCurrentRec] = useState(0);

  const prevRec = () => setCurrentRec((prev) => (prev === 0 ? recomendaciones.length - 1 : prev - 1));
  const nextRec = () => setCurrentRec((prev) => (prev === recomendaciones.length - 1 ? 0 : prev + 1));

  const experienciasFiltradas = filtro === "All" ? experiencias : experiencias.filter((e) => e.tipo === filtro);

  return (
    <div className="relative bg-white dark:bg-dark-bg min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Título y Subtítulo */}
        <div className="flex flex-col items-center justify-center w-full mb-[40px] gap-4">
          <h1 className="text-teal-600 text-5xl font-bold font-['Montserrat'] leading-[56px] text-center">
            Experiences
          </h1>
          <p className="text-slate-500 dark:text-gray-300 text-base font-normal font-['Nunito'] leading-normal text-center max-w-[600px]">
            Explore the beauty of Panama's provinces and plan your next adventure.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center flex-wrap gap-4">
          <button
            onClick={() => setFiltro("All")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filtro === "All"
                ? "bg-[#078282] text-white"
                : "bg-transparent text-slate-500 dark:text-gray-300 text-base font-normal font-['Nunito'] leading-none tracking-wide hover:bg-gray-100 dark:hover:bg-dark-surface"
            }`}
          >
            All
          </button>

          {actividades.map((act) => (
            <button
              key={act}
              onClick={() => setFiltro(act)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filtro === act
                  ? "bg-[#078282] text-white"
                  : "bg-transparent text-slate-500 dark:text-gray-300 text-base font-normal font-['Nunito'] leading-none tracking-wide hover:bg-gray-100 dark:hover:bg-dark-surface"
              }`}
            >
              {act}
            </button>
          ))}
        </div>

        {/* Experiences Grid - Masonry Layout */}
        <div className="w-full max-w-7xl mx-auto px-4 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {experienciasFiltradas.map((exp) => (
            <div
              key={exp.id}
              className={`relative break-inside-avoid rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${exp.height}`}
            >
              {/* Imagen */}
              <img
                src={exp.imagen}
                alt={exp.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay oscuro con degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Texto e información */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-semibold mb-1">{exp.titulo}</h3>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20ZM19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z"
                      fill="#FCFCFD"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.5 4C14.1193 4 13 5.11929 13 6.5V17.5C13 19.9853 10.9853 22 8.5 22C6.01472 22 4 19.9853 4 17.5V10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10V17.5C6 18.8807 7.11929 20 8.5 20C9.88071 20 11 18.8807 11 17.5V6.5C11 4.01472 13.0147 2 15.5 2C17.9853 2 20 4.01472 20 6.5V13C20 13.5523 19.5523 14 19 14C18.4477 14 18 13.5523 18 13V6.5C18 5.11929 16.8807 4 15.5 4Z"
                      fill="#FCFCFD"
                    />
                    <path
                      d="M4.13619 2.48099C4.52207 1.81949 5.47787 1.81949 5.86375 2.48099L7.62271 5.49636C8.0116 6.16302 7.53073 7.00023 6.75893 7.00023H3.24101C2.46922 7.00023 1.98835 6.16301 2.37723 5.49636L4.13619 2.48099Z"
                      fill="#FCFCFD"
                    />
                  </svg>
                  <span>{exp.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recomendaciones (Carrusel) */}
        <div className="flex w-full max-w-[1200px] py-[100px] flex-col justify-center items-center gap-2.5 bg-[#FCFCFD] dark:bg-dark-surface mx-auto transition-colors duration-300">
          <div className="flex flex-col items-start gap-16 w-full">
            {/* Header */}
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-[#078282] font-dm-sans text-[48px] font-bold leading-[56px] tracking-[-0.96px] w-[544px]">Recommended pickup locations</h2>
                <p className="text-[#777E90] dark:text-gray-300 font-poppins text-[20px] font-normal leading-[32px] tracking-[-0.2px] w-[544px]">A lot of amazing experiences</p>
              </div>
              {/* Flechas */}
              <div className="flex w-[88px] justify-between items-start">
                <button onClick={prevRec} className="flex p-2 items-center justify-center w-10 h-10 rounded-[40px] border-2 border-[#E6E8EC] dark:border-gray-600 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9.90906 7.26521C9.50324 6.8906 8.87058 6.9159 8.49597 7.32172L5.2652 10.8217C4.9116 11.2047 4.9116 11.7952 5.26519 12.1782L8.49597 15.6783C8.87057 16.0841 9.50323 16.1094 9.90905 15.7348C10.3149 15.3602 10.3402 14.7276 9.96558 14.3217L8.28397 12.5L18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5L8.284 10.5L9.96557 8.67829C10.3402 8.27247 10.3149 7.63981 9.90906 7.26521Z" fill="#078282"/></svg>
                </button>
                <button onClick={nextRec} className="flex p-2 items-center justify-center w-10 h-10 rounded-[40px] border-2 border-[#E6E8EC] dark:border-gray-600 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44772 12.5 5 12.0523 5 11.5C5 10.9477 5.44772 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z" fill="#078282"/></svg>
                </button>
              </div>
            </div>

            {/* Tarjetas Carrusel */}
            <div className="flex gap-6 w-full overflow-hidden">
              {recomendaciones.map((location, i) => (
                <div key={i} className={`flex-shrink-0 w-[282px] h-[344px] rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:scale-105 ${i === currentRec ? "" : "opacity-80"}`}>
                  <img src={location.image} alt={location.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-[#FCFCFD] font-dm-sans text-[24px] font-bold leading-[32px] mb-2">{location.title}</h3>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20ZM19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z" fill="#FCFCFD"/><path fillRule="evenodd" clipRule="evenodd" d="M15.5 4C14.1193 4 13 5.11929 13 6.5V17.5C13 19.9853 10.9853 22 8.5 22C6.01472 22 4 19.9853 4 17.5V10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10V17.5C6 18.8807 7.11929 20 8.5 20C9.88071 20 11 18.8807 11 17.5V6.5C11 4.01472 13.0147 2 15.5 2C17.9853 2 20 4.01472 20 6.5V13C20 13.5523 19.5523 14 19 14C18.4477 14 18 13.5523 18 13V6.5C18 5.11929 16.8807 4 15.5 4Z" fill="#FCFCFD"/><path d="M4.13619 2.48099C4.52207 1.81949 5.47787 1.81949 5.86375 2.48099L7.62271 5.49636C8.0116 6.16302 7.53073 7.00023 6.75893 7.00023H3.24101C2.46922 7.00023 1.98835 6.16301 2.37723 5.49636L4.13619 2.48099Z" fill="#FCFCFD"/></svg>
                      <span className="text-[#FCFCFD] font-poppins text-[16px] font-normal">{location.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter + Collage */}
        <div className="w-[1200px] h-[702px] relative bg-white dark:bg-dark-bg overflow-visible mx-auto mt-32 flex transition-colors duration-300">
          {/* Newsletter */}
          <div className="w-[548px] flex flex-col justify-center items-start gap-8">
            <div className="flex flex-col gap-4 w-full">
              <div className="text-slate-500 dark:text-gray-300 text-xs font-bold font-poppins uppercase">Take A Tour</div>
              <div className="text-teal-600 text-5xl font-bold font-dm-sans leading-[56px]">Join our newsletter</div>
            </div>
            <div className="text-slate-500 dark:text-gray-300 text-base font-normal font-poppins">
              Descubre las mejores experiencias, aventuras y cultura de Panamá — directamente en tu bandeja de entrada.
            </div>

            {/* Input email + Flecha */}
            <div className="w-80 h-12 relative rounded-lg outline outline-2 outline-offset-[-2px] outline-teal-600">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-full pl-4 pr-12 text-slate-500 dark:text-gray-300 text-sm font-normal font-poppins bg-transparent outline-none placeholder:text-slate-500 dark:placeholder:text-gray-400"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-teal-600 rounded-full flex justify-center items-center hover:bg-teal-700 transition-colors text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h10m0 0l-4-4m4 4l-4 4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Collage */}
          <div className="w-[652px] h-[702px] relative ml-8">
            <div className="relative w-full h-full">
              <div className="w-44 h-40 absolute left-[20px] top-[50px] rounded-[40px] overflow-hidden shadow-lg">
                <img className="w-full h-full object-cover" src="https://s7g10.scene7.com/is/image/barcelo/turismo-en-panama-san-blas?fmt=webp&qlt=80" alt="Isla Mamey"/>
              </div>
              <div className="w-48 h-56 absolute left-[200px] top-[20px] rounded-[40px] overflow-hidden shadow-lg">
                <img className="w-full h-full object-cover" src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/qduuuf8dzmbg9dxhwdkr" alt="Playa Blanca"/>
              </div>
              <div className="w-52 h-48 absolute left-[50px] top-[250px] rounded-[40px] overflow-hidden shadow-lg">
                <img className="w-full h-full object-cover" src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/yqqgg29yes0xdyoawlr4" alt="Isla Monos"/>
              </div>
              <div className="w-60 h-48 absolute left-[220px] top-[270px] rounded-[40px] overflow-hidden shadow-lg">
                <img className="w-full h-full object-cover" src="https://transporteturisticopanama.com/wp-content/uploads/2015/02/transporte-turistico-panam%C3%A1.jpg" alt="Isla Bastimentos"/>
              </div>
              <div className="w-40 h-36 absolute left-[300px] top-[150px] rounded-[40px] overflow-hidden shadow-lg">
                <img className="w-full h-full object-cover" src="https://mediaim.expedia.com/destination/1/1d8a91c9ba3e2729b384542dbcd5f2f4.jpg" alt="Aventura Panamá"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
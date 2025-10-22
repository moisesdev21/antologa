import React from "react";

const Blog = () => {
  return (
    <div className="relative bg-white min-h-screen">
      {/* Contenido principal - Sin navbar duplicado */}
      <div className="pt-16 px-6 pb-10 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icono de construcción */}
          <div className="mb-8">
            <svg 
              className="w-24 h-24 mx-auto text-teal-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>

          {/* Título */}
          <h1 
            className="mb-6"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "56px",
              letterSpacing: "-2%",
              color: "#078282",
            }}
          >
            Blog en Construcción
          </h1>

          {/* Mensaje */}
          <p 
            className="mb-8 text-gray-600 text-lg leading-relaxed"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
            }}
          >
            Estamos trabajando duro para traerte contenido increíble sobre los destinos 
            más fascinantes de Panamá. Muy pronto podrás descubrir historias, tips de viaje 
            y experiencias únicas en nuestro blog.
          </p>

          {/* Contador regresivo o mensaje adicional */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <p className="text-teal-800 font-medium">
              📍 <strong>Próximamente:</strong> Guías de viaje, historias locales y recomendaciones exclusivas
            </p>
          </div>

          {/* Botón para volver al inicio */}
          <button
            onClick={() => window.location.href = "/"}
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Volver al Inicio
          </button>

          {/* Footer simple - Eliminado ya que el footer es global */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
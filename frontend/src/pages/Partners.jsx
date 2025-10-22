import React from "react";

const Partners = () => {
  return (
    <div className="relative bg-white min-h-screen">
      <div className="pt-16 px-6 pb-10 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🤝</div>
          </div>
          
          <h1 className="text-4xl font-bold text-teal-600 mb-6">
            Partners en Mantenimiento
          </h1>
          
          <p className="mb-8 text-gray-600 text-lg leading-relaxed">
            Estamos construyendo una red sólida de socios y colaboradores 
            para ofrecerte las mejores experiencias en Panamá.
          </p>
          
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <p className="text-teal-800 font-medium">
              🌟 <strong>Próximamente:</strong> Programa de socios, beneficios exclusivos y colaboraciones
            </p>
          </div>
          
          <button
            onClick={() => window.location.href = "/"}
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-3 rounded-lg transition duration-300"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
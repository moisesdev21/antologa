import React from "react";

const Pricing = () => {
  return (
    <div className="relative bg-white dark:bg-dark-bg min-h-screen transition-colors duration-300">
      <div className="pt-16 px-6 pb-10 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">💎</div>
          </div>
          
          <h1 className="text-4xl font-bold text-teal-600 mb-6">
            Pricing en Mantenimiento
          </h1>
          
          <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Estamos diseñando planes flexibles y transparentes para que encuentres 
            la opción perfecta según tus necesidades de viaje.
          </p>
          
          <div className="bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg p-6 mb-8 transition-colors duration-300">
            <p className="text-teal-800 dark:text-teal-200 font-medium">
              💰 <strong>Próximamente:</strong> Planes flexibles, descuentos y promociones exclusivas
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

export default Pricing;
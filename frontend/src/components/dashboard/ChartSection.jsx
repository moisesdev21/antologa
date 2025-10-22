// ChartSection.jsx
// Sección reutilizable para gráficos en el dashboard

const ChartSection = ({ title, loading, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[400px] flex flex-col w-full">
      {/* Encabezado */}
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h3>
      )}

      {/* Contenido gráfico */}
      <div className="flex-1 flex items-center justify-center">
        {loading ? (
          // Skeleton loader (mientras carga)
          <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-[280px] w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : children ? (
          // Gráfico cargado
          <div className="w-full h-full">{children}</div>
        ) : (
          // Mensaje por defecto si no hay gráfico
          <p className="text-gray-500">Gráfico en desarrollo</p>
        )}
      </div>
    </div>
  );
};

export default ChartSection;

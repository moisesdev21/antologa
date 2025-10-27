import React from "react";

const DataTable = ({ 
  data = [], 
  columns = [], 
  loading = false, 
  title, 
  emptyMessage = "No hay datos disponibles" 
}) => {

  const minHeight = "min-h-[600px]";

  // Función auxiliar para acceder a propiedades anidadas
  const getValue = (item, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], item);
  };

  if (loading) {
    return (
      <div className={`dashboard-card flex flex-col ${minHeight} animate-pulse bg-white dark:bg-gray-800 transition-colors duration-300`}>
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="flex flex-col justify-start p-4 space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`dashboard-card flex flex-col items-center justify-center ${minHeight} p-6 bg-white dark:bg-gray-800 transition-colors duration-300`}>
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`dashboard-card flex flex-col ${minHeight} bg-white dark:bg-gray-800 transition-colors duration-300`}>
      {title && (
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {data.length} registros</p>
        </div>
      )}

      <div className="w-full  overflow-x-auto">
        <table className="table-fixed w-full border-collapse">
          <colgroup>
            {columns.map((column) => (
              <col key={column.key} style={{ width: column.width || 'auto' }} />
            ))}
          </colgroup>

          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider break-words whitespace-normal"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 break-words whitespace-normal align-top"
                  >
                    {column.key === 'actions' ? (
                      <div className="flex flex-wrap gap-2">
                        {column.render ? column.render(item) : getValue(item, column.key)}
                      </div>
                    ) : (
                      column.render ? column.render(item) : getValue(item, column.key)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
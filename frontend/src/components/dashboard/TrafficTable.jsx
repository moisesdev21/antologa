// src/components/dashboard/TrafficTable.jsx
import DataTable from './DataTable';

const TrafficTable = ({ trafficData = [], loading = false }) => {
  // Normalizamos los datos para manejar tanto visitsByMonth como devicesUsage
  const normalizedTraffic = trafficData.map((t, index) => ({
    index: index + 1,
    label: t.month || t.device || 'No disponible',
    count: t.count ?? 0,
    type: t.month ? 'month' : 'device'
  }));

  const columns = [
    { 
      key: 'index', 
      title: '#',
      width: '60px',
      render: (item) => <span className="text-gray-600 dark:text-gray-400 ">{item.index}</span>
    },
    { 
      key: 'label', 
      title: 'Mes / Dispositivo',
      render: (item) => (
        <div className="flex items-center">
          {item.type === 'month' && (
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          )}
          {item.type === 'device' && (
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          )}
          <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
        </div>
      )
    },
    { 
      key: 'count', 
      title: 'Visitas',
      width: '100px',
      render: (item) => (
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {item.count.toLocaleString()}
        </span>
      )
    },
  ];

  return (
    <DataTable
      data={normalizedTraffic}
      columns={columns}
      loading={loading}
      title={`Estadísticas de Tráfico (${trafficData.length})`}
      emptyMessage="No hay datos de tráfico disponibles"
    />
  );
};

export default TrafficTable;
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
      width: '60px'
    },
    { 
      key: 'label', 
      title: 'Mes / Dispositivo' 
    },
    { 
      key: 'count', 
      title: 'Visitas',
      width: '100px'
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
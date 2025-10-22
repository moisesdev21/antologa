// src/components/dashboard/StatsGrid.jsx
import StatsCard from './StatsCard';
import { FaUsers, FaBuilding, FaDollarSign, FaChartLine } from 'react-icons/fa';

const StatsGrid = ({ metrics, loading }) => {
  const gridHeight = "h-[200px]";

  const metricsData = [
    { title: 'Usuarios Registrados', value: metrics.totalUsers?.toString(), icon: FaUsers, color: 'blue' },
    { title: 'Negocios Afiliados', value: metrics.totalBusinesses?.toString(), icon: FaBuilding, color: 'green' },
    { title: 'Ingresos Totales', value: `$${metrics.totalRevenue?.toFixed(2)}`, icon: FaDollarSign, color: 'purple' },
    { title: 'Experiencias Activas', value: metrics.totalExperiences?.toString(), icon: FaChartLine, color: 'orange' }
  ];

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${gridHeight}`}>
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse flex flex-col justify-between">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${gridHeight}`}>
      {metricsData.map((metric, index) => (
        <StatsCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          color={metric.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;

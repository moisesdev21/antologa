const StatsCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  
  const colorClasses = {
    blue: 'border-blue-200 text-blue-600',
    green: 'border-green-200 text-green-600',
    purple: 'border-purple-200 text-purple-600',
    orange: 'border-orange-200 text-orange-600',
    gray: 'border-gray-200 text-gray-600'
  };

  const iconBgClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100', 
    purple: 'bg-purple-100',
    orange: 'bg-orange-100',
    gray: 'bg-gray-100'
  };

  return (
    <div className={`bg-white rounded-lg border ${colorClasses[color]} p-6 shadow-sm w-full h-full`}>
      <div className="flex items-center justify-between h-full">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        </div>

        {Icon && (
          <div className={`p-3 rounded-full ${iconBgClasses[color]}`}>
            <Icon className="text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
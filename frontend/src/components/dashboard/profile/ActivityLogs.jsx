import { useState } from 'react';
import { FaSearch, FaFilter, FaDownload, FaUser, FaStore, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const ActivityLogs = ({ activityLogs, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedAdmin, setSelectedAdmin] = useState('all');

  const admins = ['Admin Principal', 'Editor Content', 'Analista Datos'];
  const actions = [
    { value: 'all', label: 'Todas las acciones' },
    { value: 'user_suspended', label: 'Usuario Suspendido' },
    { value: 'business_approved', label: 'Negocio Aprobado' },
    { value: 'report_generated', label: 'Reporte Generado' },
    { value: 'role_updated', label: 'Rol Actualizado' },
    { value: 'destination_created', label: 'Destino Creado' }
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'user_suspended': return <FaUser className="text-red-500" />;
      case 'business_approved': return <FaStore className="text-green-500" />;
      case 'destination_created': return <FaMapMarkerAlt className="text-blue-500" />;
      default: return <FaCalendarAlt className="text-gray-500" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'user_suspended': return 'bg-red-100 text-red-800';
      case 'business_approved': return 'bg-green-100 text-green-800';
      case 'report_generated': return 'bg-blue-100 text-blue-800';
      case 'role_updated': return 'bg-purple-100 text-purple-800';
      case 'destination_created': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionLabel = (action) => {
    const actionMap = {
      'user_suspended': 'Usuario Suspendido',
      'business_approved': 'Negocio Aprobado',
      'report_generated': 'Reporte Generado',
      'role_updated': 'Rol Actualizado',
      'destination_created': 'Destino Creado'
    };
    return actionMap[action] || action;
  };

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesAdmin = selectedAdmin === 'all' || log.admin === selectedAdmin;

    return matchesSearch && matchesAction && matchesAdmin;
  });

  const handleExport = () => {
    console.log('Exportando logs...');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Historial de Actividad</h3>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <FaDownload className="mr-2" />
            Exportar Logs
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Cargando historial de actividad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Historial de Actividad</h3>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaDownload className="mr-2" />
          Exportar Logs
        </button>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en actividades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtro por acción */}
          <div>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {actions.map(action => (
                <option key={action.value} value={action.value}>
                  {action.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por administrador */}
          <div>
            <select
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los administradores</option>
              {admins.map(admin => (
                <option key={admin} value={admin}>{admin}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Actividades */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-semibold">
            {filteredLogs.length} actividad{filteredLogs.length !== 1 ? 'es' : ''} registrada{filteredLogs.length !== 1 ? 's' : ''}
          </h4>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getActionIcon(log.action)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                        {getActionLabel(log.action)}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {log.admin}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString('es-ES')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-900 mt-1 font-medium">
                    {log.target}
                  </p>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {log.details}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">
                      IP: {log.ip}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No se encontraron actividades que coincidan con los filtros
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
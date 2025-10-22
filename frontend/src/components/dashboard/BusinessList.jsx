// src/components/dashboard/BusinessList.jsx
import { useState, useEffect } from 'react';
import DataTable from './DataTable';

const BusinessList = ({ businesses = [], loading = false, onRefresh, onViewProfile, onEditSubscription, businessStatsFromHook }) => {
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    location: '',
    subscriptionStatus: '',
    searchTerm: ''
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(businesses.map(b => b.category).filter(Boolean))];
    const uniqueLocations = [...new Set(businesses.map(b => b.location).filter(Boolean))];
    setCategories(uniqueCategories);
    setLocations(uniqueLocations);
  }, [businesses]);

  const filteredBusinesses = businesses.filter(business => {
    const matchesStatus = !filters.status || business.status === filters.status;
    const matchesCategory = !filters.category || business.category === filters.category;
    const matchesLocation = !filters.location || business.location === filters.location;
    const matchesSubscription = !filters.subscriptionStatus || 
                                business.subscriptionStatus === filters.subscriptionStatus;
    const matchesSearch = !filters.searchTerm || 
                           business.businessName.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesLocation && 
           matchesSubscription && matchesSearch;
  });

  const normalizedBusinesses = filteredBusinesses.map((business, index) => ({
    number: index + 1,
    id: business.id,
    businessName: business.businessName || 'Sin nombre',
    category: business.category || 'No categorizado',
    location: business.location || 'No especificada',
    currentPlan: business.currentPlan || 'Sin plan',
    renewalDate: business.renewalDate,
    status: business.status,
    subscriptionStatus: business.subscriptionStatus,
    _original: business
  }));

  const businessColumns = [
  { key: 'number', title: '#', width: '70px' },
  { 
    key: 'businessName', 
    title: 'Nombre del Negocio',
    render: (b) => (
      <div>
        <div className="font-semibold text-gray-900">{b.businessName}</div>
        <div className="text-xs text-gray-500">ID: {b.id}</div>
      </div>
    )
  },
  { 
    key: 'category', 
    title: 'Categoría',
    render: (b) => (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {b.category}
      </span>
    )
  },
  { key: 'location', title: 'Ubicación' },
  { 
    key: 'currentPlan', 
    title: 'Plan Actual',
    render: (b) => (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        b.currentPlan === 'Premium' ? 'bg-purple-100 text-purple-800' :
        b.currentPlan === 'Básico' ? 'bg-green-100 text-green-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {b.currentPlan}
      </span>
    )
  },
  { 
  key: 'nextBillingDate', 
  title: 'Próxima Renovación',
  render: (b) => {
    const date = b.nextBillingDate || b._original?.nextBillingDate;
    return date ? (
      <div>
        <div className="font-medium">{new Date(date).toLocaleDateString('es-ES')}</div>
        <div className="text-xs text-gray-500">
          {Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24))} días
        </div>
      </div>
    ) : 'No programada';
  }
}
  
,
  { 
    key: 'status', 
    title: 'Estado General',
    render: (b) => (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        b.status === 'active' ? 'bg-green-100 text-green-800' :
        b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        b.status === 'suspended' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {b.status === 'active' ? 'Activo' :
         b.status === 'pending' ? 'Pendiente' :
         b.status === 'suspended' ? 'Suspendido' : b.status}
      </span>
    )
  },
  { 
    key: 'subscriptionStatus', 
    title: 'Estado Suscripción',
    render: (b) => (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        b.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
        b.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-800' :
        b.subscriptionStatus === 'trial' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {b.subscriptionStatus === 'active' ? 'Activa' :
         b.subscriptionStatus === 'expired' ? 'Vencida' :
         b.subscriptionStatus === 'trial' ? 'Prueba' : b.subscriptionStatus}
      </span>
    )
  },
  {
    key: 'actions',
    title: 'Acciones',
    render: (b) => (
      <div className="flex space-x-2">
        <button
          onClick={() => onViewProfile(b._original)}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs"
        >
          Ver Perfil
        </button>
        <button
          onClick={() => onEditSubscription(b._original)}
          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
        >
          Suscripción
        </button>
      </div>
    )
  }
];


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      category: '',
      location: '',
      subscriptionStatus: '',
      searchTerm: ''
    });
  };

  // 🔹 Usar stats del hook si vienen, sino calcular temporalmente
  const businessStats = businessStatsFromHook || {
    total: businesses.length,
    active: businesses.filter(b => b.status === 'active').length,
    pending: businesses.filter(b => b.status === 'pending').length,
    suspended: businesses.filter(b => b.status === 'suspended').length
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-gray-900">{businessStats.total || 0}</div>
          <div className="text-sm text-gray-600">Total Negocios</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-green-600">{businessStats.active || 0}</div>
          <div className="text-sm text-gray-600">Activos</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-yellow-600">{businessStats.pending || 0}</div>
          <div className="text-sm text-gray-600">Pendientes</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-red-600">{businessStats.suspended || 0}</div>
          <div className="text-sm text-gray-600">Suspendidos</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filtros de Búsqueda</h3>
          <button
            onClick={clearFilters}
            className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
          >
            Limpiar Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar Negocio
            </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Nombre del negocio..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="active">Activo</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado Suscripción
            </label>
            <select
              value={filters.subscriptionStatus}
              onChange={(e) => handleFilterChange('subscriptionStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="active">Activa</option>
              <option value="expired">Vencida</option>
              <option value="trial">Prueba Gratuita</option>
              <option value="canceled">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredBusinesses.length} de {businesses.length} negocios
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Negocios Afiliados ({filteredBusinesses.length})
            </h3>
            <p className="text-sm text-gray-600">
              Sistema de gestión completa de negocios afiliados
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Exportar Excel
            </button>
            <button 
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
            >
              {loading ? 'Actualizando...' : 'Actualizar Datos'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <DataTable
            data={normalizedBusinesses}
            columns={businessColumns}
            loading={loading}
            emptyMessage="No se encontraron negocios con los filtros aplicados"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessList;

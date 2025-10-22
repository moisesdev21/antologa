// src/components/dashboard/BusinessDB.jsx
import { useState, useMemo, useEffect } from 'react';
import DataTable from './DataTable';

const VIEW_TITLES = {
  list: 'Business DB - Negocios Afiliados',
  profile: 'Perfil del Negocio',
  subscription: 'Gestión de Suscripción',
  verification: 'Verificación de Negocio',
  pricing: 'Gestión de Precios'
};

const BusinessDB = ({ businesses = [], loading = false, onRefresh }) => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    location: '',
    subscriptionStatus: '',
    searchTerm: ''
  });

  // Estados para modales
  const [verificationModal, setVerificationModal] = useState({ open: false, business: null });
  const [pricingModal, setPricingModal] = useState({ open: false, business: null });

  // Categorías y ubicaciones únicas
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(businesses.map(b => b.category).filter(Boolean))];
    const uniqueLocations = [...new Set(businesses.map(b => b.location).filter(Boolean))];
    setCategories(uniqueCategories);
    setLocations(uniqueLocations);
  }, [businesses]);

  // 🔍 FUNCIÓN: Filtrar negocios
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
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
  }, [businesses, filters]);

  // 📊 FUNCIÓN: Estadísticas de negocios
  const businessStats = useMemo(() => {
    return {
      total: businesses.length,
      active: businesses.filter(b => b.status === 'active').length,
      pending: businesses.filter(b => b.status === 'pending').length,
      suspended: businesses.filter(b => b.status === 'suspended').length
    };
  }, [businesses]);

  // 🎯 FUNCIONES DE NAVEGACIÓN
  const handleViewProfile = (business) => {
    setSelectedBusiness(business);
    setCurrentView('profile');
  };

  const handleManageSubscription = (business) => {
    setSelectedBusiness(business);
    setCurrentView('subscription');
  };

  const handleVerification = (business) => {
    setVerificationModal({ open: true, business });
  };

  const handlePricing = (business) => {
    setPricingModal({ open: true, business });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedBusiness(null);
    onRefresh();
  };

  const handleEditProfile = () => {
    console.log(`[Admin Action] Iniciando edición de perfil para: ${selectedBusiness.businessName}`);
  };

  // 🔧 FUNCIONES DE FILTROS
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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

  // 📋 COLUMNAS PARA LA TABLA
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
    },
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
            onClick={() => handleViewProfile(b._original)}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs"
          >
            Ver Perfil
          </button>
          <button
            onClick={() => handleManageSubscription(b._original)}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
          >
            Suscripción
          </button>
        </div>
      )
    }
  ];

  // 📊 NORMALIZAR DATOS PARA LA TABLA
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

  // 🎨 COMPONENTE: BusinessList (ahora integrado)
  const BusinessList = () => (
    <div className="w-full">
      {/* Estadísticas */}
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

      {/* Filtros */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar Negocio</label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Nombre del negocio..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado Suscripción</label>
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

      {/* Tabla de Negocios */}
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

  // 🎨 COMPONENTE: BusinessProfile (ahora integrado)
  const BusinessProfile = () => {
    const [activeTab, setActiveTab] = useState('info');

    const businessData = {
      ...selectedBusiness,
      contactInfo: {
        ownerName: `${selectedBusiness.user?.name || ''} ${selectedBusiness.user?.lastName || ''}`.trim() || 'No especificado',
        ownerNametag: selectedBusiness.user?.nametag || 'N/A',
        email: selectedBusiness.user?.email || 'contacto@ejemplo.com',
        phone: '+52 55 1234 5678',
        address: selectedBusiness.businessAddress || 'Dirección no especificada',
        legalName: 'Razón Social S.A. de C.V.',
        taxId: 'ABC123456789',
        documents: ['INE', 'Comprobante de domicilio', 'Constitución de empresa']
      },
      experiences: [
        { id: 1, name: 'Tour Gastronómico', status: 'active', bookings: 45, rating: 4.8 },
        { id: 2, name: 'Clase de Cocina', status: 'active', bookings: 23, rating: 4.9 },
        { id: 3, name: 'Cata de Vinos', status: 'pending', bookings: 0, rating: 0 }
      ],
      destinations: [
        { id: 1, name: 'Restaurante Principal', status: 'active', visits: 120 },
        { id: 2, name: 'Sucursal Centro', status: 'active', visits: 85 }
      ],
      performance: {
        totalBookings: 68,
        totalRevenue: 12500,
        averageRating: 4.85,
        monthlyGrowth: 15.2
      },
      subscription: {
        plan: selectedBusiness.currentPlan || 'Básico',
        status: selectedBusiness.subscriptionStatus || 'active',
        renewalDate: selectedBusiness.nextBillingDate || '2024-12-31',
        daysRemaining: 45
      }
    };

    const handleStatusChange = (newStatus) => {
      console.log(`Cambiando estado a: ${newStatus} para negocio: ${selectedBusiness.id}`);
      alert(`Estado cambiado a: ${newStatus}`);
    };

    const handleAudit = () => {
      console.log(`Marcando para auditoría: ${selectedBusiness.id}`);
      alert('Negocio marcado para revisión de calidad');
    };

    const formatKey = (key) => {
      const titles = {
        ownerName: 'Nombre del Dueño',
        ownerNametag: 'Nametag Dueño',
        email: 'Email de Contacto',
        phone: 'Teléfono',
        address: 'Dirección del Negocio',
        legalName: 'Razón Social',
        taxId: 'ID Fiscal (RFC/NIT)'
      };
      return titles[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
    };

    const renderTabContent = () => {
      switch (activeTab) {
        case 'info':
          return (
            <div className="space-y-6 overflow-x-hidden">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Información de Contacto y Legal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(businessData.contactInfo).filter(([key]) => key !== 'documents').map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700">{formatKey(key)}</label>
                      <p className="mt-1 text-sm text-gray-900 truncate">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Documentos Subidos</label>
                  <div className="space-y-2">
                    {businessData.contactInfo.documents.map((doc, index) => (
                      <div key={index} className="flex flex-wrap justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700 truncate">{doc}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap">
                          Ver Documento
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Historial de Modificaciones</h3>
                <div className="space-y-3">
                  <div className="flex flex-wrap justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="truncate">
                      <p className="text-sm font-medium">Registro inicial</p>
                      <p className="text-xs text-gray-500">15 Nov 2024 - 10:30 AM</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                      Completado
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="truncate">
                      <p className="text-sm font-medium">Verificación de documentos</p>
                      <p className="text-xs text-gray-500">16 Nov 2024 - 14:20 PM</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
                      En revisión
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'content':
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Experiencias ({businessData.experiences.length})</h3>
                <div className="space-y-4">
                  {businessData.experiences.map(exp => (
                    <div key={exp.id} className="flex flex-wrap justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div className="truncate">
                        <h4 className="font-medium text-gray-900 truncate">{exp.name}</h4>
                        <div className="flex space-x-4 mt-2 text-sm text-gray-600 flex-wrap">
                          <span>Reservas: {exp.bookings}</span>
                          <span>Rating: {exp.rating}/5</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        exp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {exp.status === 'active' ? 'Activo' : 'Pendiente'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Destinos ({businessData.destinations.length})</h3>
                <div className="space-y-4">
                  {businessData.destinations.map(dest => (
                    <div key={dest.id} className="flex flex-wrap justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div className="truncate">
                        <h4 className="font-medium text-gray-900 truncate">{dest.name}</h4>
                        <div className="mt-2 text-sm text-gray-600 truncate">
                          Visitas: {dest.visits}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium whitespace-nowrap">
                        Activo
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'performance':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Reservas Totales</h3>
                  <p className="text-3xl font-bold text-blue-600">{businessData.performance.totalBookings}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Ingresos Generados</h3>
                  <p className="text-3xl font-bold text-green-600">${businessData.performance.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Calificación Promedio</h3>
                  <p className="text-3xl font-bold text-yellow-600">{businessData.performance.averageRating}/5</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Crecimiento Mensual</h3>
                  <p className="text-3xl font-bold text-purple-600">+{businessData.performance.monthlyGrowth}%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 h-64 flex items-center justify-center">
                <p className="text-gray-500">Gráfico de rendimiento en desarrollo</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Análisis Detallado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Reservas por Experiencia</h4>
                    <ul className="space-y-2">
                      {businessData.experiences.map(exp => (
                        <li key={exp.id} className="flex justify-between text-sm">
                          <span className="truncate">{exp.name}</span>
                          <span className="font-medium">{exp.bookings} reservas</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tendencias</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Factor de Conversión</span>
                        <span className="font-medium text-green-600">12.5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tasa de Retención</span>
                        <span className="font-medium text-green-600">78%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Clientes Recurrentes</span>
                        <span className="font-medium text-blue-600">45%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="space-y-6 px-2 sm:px-4">
        {/* Header del Perfil */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
            <div className="flex-1 min-w-0">
              <button 
                onClick={handleBackToList}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-2 whitespace-nowrap"
              >
                ← Volver al listado
              </button>
              <h1 className="text-2xl font-bold text-gray-900 truncate">{businessData.businessName}</h1>
              <p className="text-gray-600 truncate">{businessData.businessDescription}</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm whitespace-nowrap"
              >
                📝 Editar Perfil
              </button>
              <button
                onClick={handleAudit}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm whitespace-nowrap"
              >
                Marcar para Auditoría
              </button>
              <button
                onClick={() => handleManageSubscription(selectedBusiness)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm whitespace-nowrap"
              >
                Gestionar Suscripción
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg truncate">
              <div className="text-sm text-gray-600">Estado del Negocio</div>
              <div className={`text-lg font-semibold ${
                businessData.status === 'active' ? 'text-green-600' :
                businessData.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {businessData.status === 'active' ? 'Activo' :
                 businessData.status === 'pending' ? 'Pendiente' : 'Suspendido'}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg truncate">
              <div className="text-sm text-gray-600">Plan Actual</div>
              <div className="text-lg font-semibold text-purple-600">{businessData.subscription.plan}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg truncate">
              <div className="text-sm text-gray-600">Próxima Renovación</div>
              <div className="text-lg font-semibold text-blue-600">
                {new Date(businessData.subscription.renewalDate).toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleStatusChange('approved')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Aprobar Negocio
            </button>
            <button
              onClick={() => handleStatusChange('rejected')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Rechazar
            </button>
            <button
              onClick={() => handleStatusChange('suspended')}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Suspender
            </button>
          </div>
        </div>

        {/* Navegación por Pestañas */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap space-x-4 px-6">
              {[
                { id: 'info', name: 'Información General' },
                { id: 'content', name: 'Contenido Asociado' },
                { id: 'performance', name: 'Desempeño' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    );
  };

  // 🎨 COMPONENTE: SubscriptionManager (simplificado)
  const SubscriptionManager = () => (
    <div className="space-y-6 px-2 sm:px-4">
      <div className="bg-white rounded-lg shadow p-6">
        <button 
          onClick={() => setCurrentView('profile')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Volver al perfil
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Gestión de Suscripción - {selectedBusiness.businessName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Actual</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan Actual:</span>
                <span className="font-semibold">{selectedBusiness.currentPlan || 'Básico'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className={`font-semibold ${
                  selectedBusiness.subscriptionStatus === 'active' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedBusiness.subscriptionStatus === 'active' ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Próxima Renovación:</span>
                <span className="font-semibold">
                  {selectedBusiness.nextBillingDate ? 
                    new Date(selectedBusiness.nextBillingDate).toLocaleDateString('es-ES') : 
                    'No programada'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cambiar Plan</h3>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="basic">Plan Básico - $99/mes</option>
              <option value="premium">Plan Premium - $199/mes</option>
              <option value="enterprise">Plan Enterprise - $299/mes</option>
            </select>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Actualizar Plan
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Historial de Pagos</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Pago Mensual - Noviembre 2024</p>
                <p className="text-sm text-gray-500">15 Nov 2024</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$99.00</p>
                <p className="text-sm text-green-600">Completado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 🎯 RENDER PRINCIPAL
  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return <BusinessProfile />;
      case 'subscription':
        return <SubscriptionManager />;
      default:
        return <BusinessList />;
    }
  };

  return (
    <div className="business-db-container h-auto max-w-full px-2 sm:px-4 overflow-hidden">
      {/* Header con navegación */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
        <nav className="flex flex-wrap items-center space-x-1 text-sm text-gray-500 w-full">
          <button onClick={handleBackToList} className="hover:text-blue-600">
            Business DB
          </button>

          {currentView !== 'list' && selectedBusiness && (
            <>
              <span className="mx-1">›</span>
              <span className="text-gray-700">{VIEW_TITLES[currentView]}</span>
              <span className="mx-1">›</span>
              <span className="font-medium">{selectedBusiness.businessName}</span>
            </>
          )}
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 w-full mt-2 sm:mt-0">
          {VIEW_TITLES[currentView]}
        </h1>
      </div>

      {/* Contenido principal */}
      <div className="w-full overflow-hidden">{renderCurrentView()}</div>
    </div>
  );
};

export default BusinessDB;
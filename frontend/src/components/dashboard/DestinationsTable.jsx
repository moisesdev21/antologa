// src/components/dashboard/DestinationsDB.jsx
import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import LodgingFilters from './LodgingFilters';
import VerificationModal from './VerificationModal';
import PricingCommissionPanel from './PricingCommissionPanel';
import InteractiveMap from './InteractiveMap';
import RegionManager from './RegionManager';

const DestinationsDB = ({ destinations = [], loading = false, onRefresh }) => {
  const [filters, setFilters] = useState({
    lodgingType: '',
    region: '',
    priceRange: { min: 0, max: 1000 },
    status: '',
    verificationStatus: '',
    searchTerm: ''
  });

  const [selectedLodging, setSelectedLodging] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPricingPanel, setShowPricingPanel] = useState(false);
  const [showRegionManager, setShowRegionManager] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  // Estadísticas en tiempo real
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    active: 0,
    inactive: 0
  });

  useEffect(() => {
    // Calcular estadísticas
    const newStats = {
      total: destinations.length,
      verified: destinations.filter(d => d.verificationStatus === 'verified').length,
      pending: destinations.filter(d => d.verificationStatus === 'pending').length,
      active: destinations.filter(d => d.status === 'active').length,
      inactive: destinations.filter(d => d.status === 'inactive').length
    };
    setStats(newStats);
  }, [destinations]);

  // Normalizar datos con estructura completa para hospedajes
  const normalizedDestinations = destinations.map((d, index) => ({
    index: index + 1,
    id: d.id,
    name: d.name || 'Sin nombre',
    lodgingType: d.lodgingType || d.category?.name || 'No especificado',
    category: d.category?.name || 'Sin categoría',
    region: d.region || d.location || 'No especificada',
    zone: d.zone || 'No asignada',
    business: d.business?.businessName || 'Sin negocio',
    basePrice: d.basePrice || 0,
    commission: d.commission || 0,
    finalPrice: (d.basePrice || 0) + ((d.basePrice || 0) * (d.commission || 0) / 100),
    status: d.status || 'inactive',
    verificationStatus: d.verificationStatus || 'pending',
    coordinates: d.coordinates || null,
    photos: d.photos || [],
    description: d.description || 'Sin descripción',
    amenities: d.amenities || [],
    createdAt: d.createdAt,
    lastVerified: d.lastVerified,
    _original: d
  }));

  // Aplicar filtros
  const filteredDestinations = normalizedDestinations.filter(lodging => {
    const matchesType = !filters.lodgingType || lodging.lodgingType === filters.lodgingType;
    const matchesRegion = !filters.region || lodging.region === filters.region;
    const matchesPrice = lodging.finalPrice >= filters.priceRange.min && 
                        lodging.finalPrice <= filters.priceRange.max;
    const matchesStatus = !filters.status || lodging.status === filters.status;
    const matchesVerification = !filters.verificationStatus || 
                               lodging.verificationStatus === filters.verificationStatus;
    const matchesSearch = !filters.searchTerm || 
                         lodging.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesType && matchesRegion && matchesPrice && 
           matchesStatus && matchesVerification && matchesSearch;
  });

  // Columnas de la tabla
  const destinationColumns = [
    { 
      key: 'index', 
      title: '#',
      width: '70px'
    },
    { 
      key: 'name', 
      title: 'Nombre del Hospedaje',
      render: (d) => (
        <div className="min-w-[200px]">
          <div className="font-semibold text-gray-900">{d.name}</div>
          <div className="text-xs text-gray-500">ID: {d.id}</div>
          {d.zone && d.zone !== 'No asignada' && (
            <div className="text-xs text-purple-600">🏴 Zona Tesoro</div>
          )}
        </div>
      )
    },
    { 
      key: 'lodgingType', 
      title: 'Tipo',
      render: (d) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          d.lodgingType === 'Hotel' ? 'bg-blue-100 text-blue-800' :
          d.lodgingType === 'B&B' ? 'bg-green-100 text-green-800' :
          d.lodgingType === 'Hostal' ? 'bg-orange-100 text-orange-800' :
          d.lodgingType === 'Apartamento' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {d.lodgingType}
        </span>
      )
    },
    { 
      key: 'region', 
      title: 'Región',
      render: (d) => (
        <div className="min-w-[120px]">
          {d.region}
        </div>
      )
    },
    { 
      key: 'finalPrice', 
      title: 'Precio Final',
      render: (d) => (
        <div className="min-w-[100px]">
          <div className="font-semibold text-green-600">${d.finalPrice.toFixed(2)}</div>
          <div className="text-xs text-gray-500">
            Base: ${d.basePrice} + {d.commission}%
          </div>
        </div>
      )
    },
    { 
      key: 'status', 
      title: 'Estado',
      render: (d) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          d.status === 'active' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {d.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    { 
      key: 'verificationStatus', 
      title: 'Verificación',
      render: (d) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          d.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
          d.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {d.verificationStatus === 'verified' ? 'Verificado' :
           d.verificationStatus === 'pending' ? 'Pendiente' : 'Rechazado'}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Acciones',
      render: (d) => (
        <div className="flex space-x-2 min-w-[200px]">
          <button
            onClick={() => {
              setSelectedLodging(d);
              setShowVerificationModal(true);
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs whitespace-nowrap"
          >
            Verificar
          </button>
          <button
            onClick={() => {
              // Navegar al mapa con este hospedaje seleccionado
              setActiveTab('map');
              setSelectedLodging(d);
            }}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs whitespace-nowrap"
          >
            Mapa
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
      lodgingType: '',
      region: '',
      priceRange: { min: 0, max: 1000 },
      status: '',
      verificationStatus: '',
      searchTerm: ''
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header con Navegación por Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'list', name: '📋 Lista de Hospedajes', icon: '📋' },
              { id: 'map', name: '🗺️ Mapa Interactivo', icon: '🗺️' },
              { id: 'regions', name: '🏴 Gestión de Zonas', icon: '🏴' },
              { id: 'pricing', name: '💰 Precios & Comisiones', icon: '💰' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Hospedajes</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
          <div className="text-sm text-gray-600">Verificados</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pendientes</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Activos</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          <div className="text-sm text-gray-600">Inactivos</div>
        </div>
      </div>

      {/* CONTENIDO POR TAB */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {/* Filtros Especializados */}
          <LodgingFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            filteredCount={filteredDestinations.length}
            totalCount={destinations.length}
          />

          {/* Tabla de Hospedajes */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Base de Datos de Hospedajes ({filteredDestinations.length})
                </h3>
                <p className="text-sm text-gray-600">
                  Sistema de gestión completa de alojamientos afiliados
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  📊 Exportar Reporte
                </button>
                <button 
                  onClick={onRefresh}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? '🔄 Actualizando...' : '🔄 Actualizar Datos'}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <DataTable
                data={filteredDestinations}
                columns={destinationColumns}
                loading={loading}
                emptyMessage="No se encontraron hospedajes con los filtros aplicados"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <InteractiveMap
          destinations={filteredDestinations}
          selectedLodging={selectedLodging}
          onLodgingSelect={setSelectedLodging}
        />
      )}

      {activeTab === 'regions' && (
        <RegionManager
          destinations={destinations}
          onRegionUpdate={() => {/* Lógica para actualizar regiones */}}
        />
      )}

      {activeTab === 'pricing' && (
        <PricingCommissionPanel
          destinations={destinations}
          onPricingUpdate={() => {/* Lógica para actualizar precios */}}
        />
      )}

      {/* Modales */}
      {showVerificationModal && (
        <VerificationModal
          lodging={selectedLodging}
          onClose={() => {
            setShowVerificationModal(false);
            setSelectedLodging(null);
          }}
          onVerify={(verificationData) => {
            // Lógica para actualizar verificación
            console.log('Datos de verificación:', verificationData);
            setShowVerificationModal(false);
          }}
        />
      )}
    </div>
  );
};

export default DestinationsDB;
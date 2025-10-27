// src/components/dashboard/DestinationsDB.jsx
import { useState, useEffect } from 'react';
import { Building2, Map, Globe2, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('list');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Normalizar datos
  const normalizedDestinations = destinations.map((d, index) => ({
    index: index + 1,
    id: d.id,
    name: d.name || 'Sin nombre',
    lodgingType: d.type || d.category?.name || 'No especificado',
    category: d.category?.name || 'Sin categoría',
    region: d.region || d.location || 'No especificada',
    business: d.business?.businessName || d.businessName || 'Sin negocio',
    basePrice: d.basePrice || d.price || 0,
    commissionRate: d.commissionRate || 0,
    finalPrice: (d.basePrice || d.price || 0) + ((d.basePrice || d.price || 0) * (d.commissionRate || 0) / 100),
    status: d.status || 'inactive',
    verificationStatus: d.verificationStatus || 'pending',
    coordinates: d.coordinates,
    description: d.description || 'Sin descripción',
    contactEmail: d.contactEmail || d.business?.email,
    contactPhone: d.contactPhone || d.business?.phone,
    createdAt: d.createdAt,
    lastVerified: d.lastVerified,
    _original: d
  }));

  // Filtro de hospedajes
  useEffect(() => {
    const filtered = normalizedDestinations.filter(lodging => {
      const matchesType = !filters.lodgingType || lodging.lodgingType === filters.lodgingType;
      const matchesRegion = !filters.region || lodging.region === filters.region;
      const matchesPrice = lodging.finalPrice >= filters.priceRange.min &&
        lodging.finalPrice <= filters.priceRange.max;
      const matchesStatus = !filters.status || lodging.status === filters.status;
      const matchesVerification = !filters.verificationStatus ||
        lodging.verificationStatus === filters.verificationStatus;
      const matchesSearch = !filters.searchTerm ||
        lodging.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (lodging.description && lodging.description.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      return matchesType && matchesRegion && matchesPrice &&
        matchesStatus && matchesVerification && matchesSearch;
    });
    setFilteredDestinations(filtered);
  }, [filters, destinations, normalizedDestinations]);

  // Actualización de verificación
  const handleVerificationUpdate = async (lodgingId, verificationData) => {
    console.log('Actualizando verificación:', lodgingId, verificationData);
    return true;
  };

  // Actualización de precios
  const handlePricingUpdate = async (lodgingId, pricingData) => {
    console.log('Actualizando precios:', lodgingId, pricingData);
    return true;
  };

  // Actualización de coordenadas
  const handleCoordinateUpdate = async (lodgingId, coordinates) => {
    console.log('Actualizando coordenadas:', lodgingId, coordinates);
    return true;
  };

  // ===== NUEVO: Gestión de regiones =====
  const handleRegionUpdate = async (action, regionData) => {
    try {
      let response;
      const token = localStorage.getItem('token');

      if (action === 'create') {
        response = await fetch('/api/admin/regions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(regionData)
        });
      } else if (action === 'update') {
        response = await fetch(`/api/admin/regions/${regionData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(regionData)
        });
      } else if (action === 'delete') {
        response = await fetch(`/api/admin/regions/${regionData.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }

      if (!response.ok) throw new Error('Error en la petición');

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Error en RegionManager action:', error);
      return { success: false, error };
    }
  };
  // ===== FIN gestión de regiones =====

  // Columnas de tabla de hospedajes
  const destinationColumns = [
    { key: 'index', title: '#', width: '70px' },
    { 
      key: 'name', 
      title: 'Nombre del Hospedaje', 
      render: d => (
        <div className="min-w-[200px]">
          <div className="font-semibold text-gray-900 dark:text-white">{d.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">ID: {d.id}</div>
        </div>
      ) 
    },
    { 
      key: 'lodgingType', 
      title: 'Tipo', 
      render: d => {
        const type = d._original?.lodgingType || d.lodgingType || 'No especificado';
        const colorClass = {
          'Hotel': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
          'B&B': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
          'Hostal': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
          'Apartamento': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
          'Hospedaje': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200',
          'Atraccion': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
        }[type] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
        return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{type}</span>;
      }
    },
    { 
      key: 'region', 
      title: 'Región', 
      render: d => <div className="min-w-[120px] text-gray-900 dark:text-gray-100">{d.region}</div> 
    },
    { 
      key: 'finalPrice', 
      title: 'Precio Final', 
      render: d => (
        <div className="min-w-[100px]">
          <div className="font-semibold text-green-600 dark:text-green-400">${d.finalPrice.toFixed(2)}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Base: ${d.basePrice} + {d.commissionRate}%</div>
        </div>
      ) 
    },
    { 
      key: 'status', 
      title: 'Estado', 
      render: d => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          d.status === 'active' 
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        }`}>
          {d.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      ) 
    },
    { 
      key: 'verificationStatus', 
      title: 'Verificación', 
      render: d => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          d.verificationStatus === 'verified' 
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
            : d.verificationStatus === 'pending' 
            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' 
            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        }`}>
          {d.verificationStatus === 'verified' ? 'Verificado' : d.verificationStatus === 'pending' ? 'Pendiente' : 'Rechazado'}
        </span>
      ) 
    },
    { 
      key: 'actions', 
      title: 'Acciones', 
      render: d => (
        <div className="flex space-x-2 min-w-[200px]">
          <button 
            onClick={() => { setSelectedLodging(d); setShowVerificationModal(true); }} 
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-xs whitespace-nowrap transition-colors duration-200"
          >
            Verificar
          </button>
          <button 
            onClick={() => { setActiveTab('map'); setSelectedLodging(d); }} 
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-xs whitespace-nowrap transition-colors duration-200"
          >
            Mapa
          </button>
        </div>
      )
    }
  ];

  const stats = {
    total: destinations.length,
    verified: destinations.filter(d => d.verificationStatus === 'verified').length,
    pending: destinations.filter(d => d.verificationStatus === 'pending').length,
    active: destinations.filter(d => d.status === 'active').length,
    inactive: destinations.filter(d => d.status === 'inactive').length
  };

  return (
    <div className="w-full space-y-6 bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Destinations DB</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Base de datos de hospedajes - Gestión completa de alojamientos afiliados</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors flex items-center gap-2">
            Exportar Excel
          </button>
          <button 
            onClick={onRefresh} 
            disabled={loading} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 transition-colors duration-200"
          >
            {loading ? 'Actualizando...' : 'Actualizar Datos'}
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Hospedajes</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.verified}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Verificados</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pendientes</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Activos</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center transition-colors duration-300">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.inactive}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Inactivos</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-300">
        <nav className="flex justify-around bg-gray-100 dark:bg-gray-700 p-2 transition-colors duration-300">
          {[
            {id:'list', name:'Lista de Hospedajes', icon:<Building2 size={16}/>},
            {id:'map', name:'Mapa Interactivo', icon:<Map size={16}/>},
            {id:'regions', name:'Gestión de Zonas', icon:<Globe2 size={16}/>},
            {id:'pricing', name:'Precios y Comisiones', icon:<DollarSign size={16}/>}
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={()=>setActiveTab(tab.id)} 
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab===tab.id 
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tabs Content */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {/* Filtros */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
            <button 
              onClick={()=>setFiltersOpen(prev=>!prev)} 
              className="w-full px-6 py-3 flex justify-between items-center text-gray-700 dark:text-gray-300 font-medium text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Filtros {filtersOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
            </button>
            {filtersOpen && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                <LodgingFilters
                  filters={filters}
                  onFilterChange={(key, value)=>setFilters(prev=>({...prev,[key]:value}))}
                  onClearFilters={()=>setFilters({lodgingType:'',region:'',priceRange:{min:0,max:1000},status:'',verificationStatus:'',searchTerm:''})}
                  filteredCount={filteredDestinations.length}
                  totalCount={destinations.length}
                />
              </div>
            )}
          </div>

          {/* Tabla */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Base de Datos de Hospedajes ({filteredDestinations.length})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sistema de gestión completa de alojamientos afiliados
              </p>
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
          onUpdateCoordinates={handleCoordinateUpdate}
        />
      )}

      {activeTab === 'regions' && (
        <RegionManager
          destinations={destinations}
          onRegionUpdate={handleRegionUpdate}
        />
      )}

      {activeTab === 'pricing' && (
        <PricingCommissionPanel
          destinations={destinations}
          onPricingUpdate={handlePricingUpdate}
        />
      )}

      {/* Modal */}
      {showVerificationModal && (
        <VerificationModal
          lodging={selectedLodging}
          onClose={()=>{setShowVerificationModal(false); setSelectedLodging(null);}}
          onVerify={handleVerificationUpdate}
        />
      )}
    </div>
  );
};

export default DestinationsDB;
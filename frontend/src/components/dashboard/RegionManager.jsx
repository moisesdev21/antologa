// src/components/dashboard/RegionManager.jsx
import { useState, useEffect } from 'react';

const RegionManager = ({ destinations, onRegionUpdate }) => {
  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState({
    name: '',
    description: '',
    type: 'hidden_treasure',
    coordinates: { ne: { lat: '', lng: '' }, sw: { lat: '', lng: '' } },
    radius: 5,
    status: 'active'
  });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar regiones desde la API
  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/regions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setRegions(result.data);
        }
      }
    } catch (error) {
      console.error('Error loading regions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Crear nueva región
  const handleCreateRegion = async () => {
    if (!newRegion.name || !newRegion.description) {
      alert('Nombre y descripción son requeridos');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/regions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newRegion)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setRegions(prev => [...prev, result.data]);
          setNewRegion({
            name: '',
            description: '',
            type: 'hidden_treasure',
            coordinates: { ne: { lat: '', lng: '' }, sw: { lat: '', lng: '' } },
            radius: 5,
            status: 'active'
          });
          alert('Región creada exitosamente');
        }
      }
    } catch (error) {
      console.error('Error creating region:', error);
      alert('Error al crear la región');
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar región
  const handleUpdateRegion = async (regionId, updates) => {
    try {
      const response = await fetch(`/api/admin/regions/${regionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setRegions(prev => prev.map(r => r.id === regionId ? result.data : r));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error updating region:', error);
      return false;
    }
  };

  // Eliminar región
  const handleDeleteRegion = async (regionId) => {
    if (!confirm('¿Estás seguro de eliminar esta región?')) return;

    try {
      const response = await fetch(`/api/admin/regions/${regionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setRegions(prev => prev.filter(r => r.id !== regionId));
        alert('Región eliminada exitosamente');
      }
    } catch (error) {
      console.error('Error deleting region:', error);
      alert('Error al eliminar la región');
    }
  };

  // Calcular estadísticas reales
  const regionStats = regions.reduce((stats, region) => {
    stats.totalRegions++;
    if (region.status === 'active') stats.activeRegions++;
    
    // Contar destinos en esta región
    const regionDestinations = destinations.filter(dest => 
      dest.region === region.name || 
      (dest.coordinates && isInRegion(dest.coordinates, region.coordinates))
    );
    region.destinationCount = regionDestinations.length;
    stats.totalDestinations += regionDestinations.length;
    
    return stats;
  }, { totalRegions: 0, activeRegions: 0, totalDestinations: 0 });

  // Función para verificar si un punto está en una región
  const isInRegion = (point, regionBounds) => {
    if (!regionBounds || !regionBounds.ne || !regionBounds.sw) return false;
    
    return point.lat <= regionBounds.ne.lat && 
           point.lat >= regionBounds.sw.lat && 
           point.lng <= regionBounds.ne.lng && 
           point.lng >= regionBounds.sw.lng;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gestión de Zonas Geográficas</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Administra las "Zonas de Tesoros Escondidos" y regiones turísticas
        </p>
      </div>

      <div className="p-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center transition-colors duration-300">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{regionStats.totalRegions}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total de Zonas</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg text-center transition-colors duration-300">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{regionStats.activeRegions}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Zonas Activas</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg text-center transition-colors duration-300">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{regionStats.totalDestinations}</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Hospedajes en Zonas</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Formulario de Nueva Zona */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Crear Nueva Zona
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre de la Zona *
                  </label>
                  <input
                    type="text"
                    value={newRegion.name}
                    onChange={(e) => setNewRegion(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Ej: Zona Cafetera Oculta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    value={newRegion.description}
                    onChange={(e) => setNewRegion(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Describe las características únicas de esta zona..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tipo de Zona
                    </label>
                    <select
                      value={newRegion.type}
                      onChange={(e) => setNewRegion(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200"
                    >
                      <option value="hidden_treasure">Tesoro Escondido</option>
                      <option value="cultural">Cultural</option>
                      <option value="natural">Natural</option>
                      <option value="adventure">Aventura</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Radio (km)
                    </label>
                    <input
                      type="number"
                      value={newRegion.radius}
                      onChange={(e) => setNewRegion(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white transition-colors duration-200"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                {/* Coordenadas de la zona */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Coordenadas del Área
                  </label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Noreste - Lat</label>
                      <input
                        type="number"
                        step="any"
                        value={newRegion.coordinates.ne.lat}
                        onChange={(e) => setNewRegion(prev => ({
                          ...prev,
                          coordinates: {
                            ...prev.coordinates,
                            ne: { ...prev.coordinates.ne, lat: e.target.value }
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-600 dark:text-white transition-colors duration-200"
                        placeholder="Latitud"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Noreste - Lng</label>
                      <input
                        type="number"
                        step="any"
                        value={newRegion.coordinates.ne.lng}
                        onChange={(e) => setNewRegion(prev => ({
                          ...prev,
                          coordinates: {
                            ...prev.coordinates,
                            ne: { ...prev.coordinates.ne, lng: e.target.value }
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-600 dark:text-white transition-colors duration-200"
                        placeholder="Longitud"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Suroeste - Lat</label>
                      <input
                        type="number"
                        step="any"
                        value={newRegion.coordinates.sw.lat}
                        onChange={(e) => setNewRegion(prev => ({
                          ...prev,
                          coordinates: {
                            ...prev.coordinates,
                            sw: { ...prev.coordinates.sw, lat: e.target.value }
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-600 dark:text-white transition-colors duration-200"
                        placeholder="Latitud"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Suroeste - Lng</label>
                      <input
                        type="number"
                        step="any"
                        value={newRegion.coordinates.sw.lng}
                        onChange={(e) => setNewRegion(prev => ({
                          ...prev,
                          coordinates: {
                            ...prev.coordinates,
                            sw: { ...prev.coordinates.sw, lng: e.target.value }
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-600 dark:text-white transition-colors duration-200"
                        placeholder="Longitud"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreateRegion}
                  disabled={isLoading || !newRegion.name || !newRegion.description}
                  className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? 'Creando Zona...' : 'Crear Nueva Zona'}
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Zonas Existentes */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Zonas Existentes ({regions.length})
            </h4>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Cargando zonas...</p>
              </div>
            ) : regions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400">No hay zonas creadas aún</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {regions.map(region => (
                  <div key={region.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white">{region.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{region.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        region.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                      }`}>
                        {region.status === 'active' ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{region.destinationCount || 0} hospedajes</span>
                      <span>{region.type}</span>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleUpdateRegion(region.id, { 
                          status: region.status === 'active' ? 'inactive' : 'active' 
                        })}
                        className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
                      >
                        {region.status === 'active' ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => setSelectedRegion(region)}
                        className="px-3 py-1 bg-green-500 dark:bg-green-600 text-white rounded-lg text-xs hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteRegion(region.id)}
                        className="px-3 py-1 bg-red-500 dark:bg-red-600 text-white rounded-lg text-xs hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionManager;
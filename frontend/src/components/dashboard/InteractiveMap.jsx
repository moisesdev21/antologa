// src/components/dashboard/InteractiveMap.jsx
import { useState, useEffect, useRef } from 'react';

const InteractiveMap = ({ destinations, selectedLodging, onLodgingSelect, onUpdateCoordinates }) => {
  const [mapView, setMapView] = useState('all');
  const [editingCoords, setEditingCoords] = useState(null);
  const [newCoords, setNewCoords] = useState({ lat: '', lng: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null);
  const [newZone, setNewZone] = useState({
    name: '',
    description: '',
    coordinates: []
  });
  const [zones, setZones] = useState([]);
  const mapContainerRef = useRef(null);

  // Coordenadas de Panamá para centrar el mapa
  const panamaCenter = { lat: 8.537981, lng: -80.782127 };

  // Zonas predefinidas de Panamá
  const panamaZones = [
    {
      id: 1,
      name: 'Archipiélago de San Blas',
      description: 'Islas paradisíacas del Caribe panameño',
      type: 'hidden_treasure',
      coordinates: [
        { lat: 9.57, lng: -78.82 },
        { lat: 9.52, lng: -78.87 },
        { lat: 9.48, lng: -78.92 }
      ],
      color: '#10B981'
    },
    {
      id: 2,
      name: 'Valle de Antón',
      description: 'Valle crater único en América',
      type: 'hidden_treasure', 
      coordinates: [
        { lat: 8.63, lng: -80.13 },
        { lat: 8.60, lng: -80.10 },
        { lat: 8.58, lng: -80.15 }
      ],
      color: '#8B5CF6'
    },
    {
      id: 3,
      name: 'Islas de Bocas del Toro',
      description: 'Arrecifes de coral y playas vírgenes',
      type: 'hidden_treasure',
      coordinates: [
        { lat: 9.34, lng: -82.25 },
        { lat: 9.30, lng: -82.20 },
        { lat: 9.27, lng: -82.15 }
      ],
      color: '#F59E0B'
    }
  ];

  useEffect(() => {
    setZones(panamaZones);
    initializeMap();
  }, []);

  const initializeMap = () => {
    // Mapa de Panamá centrado con OpenStreetMap
    const mapFrame = document.createElement('iframe');
    mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${panamaCenter.lng-2}%2C${panamaCenter.lat-1}%2C${panamaCenter.lng+2}%2C${panamaCenter.lat+1}&layer=mapnik&marker=${panamaCenter.lat}%2C${panamaCenter.lng}`;
    mapFrame.style.width = '100%';
    mapFrame.style.height = '100%';
    mapFrame.style.border = 'none';
    mapFrame.referrerPolicy = 'no-referrer-when-downgrade';
    
    if (mapContainerRef.current) {
      mapContainerRef.current.innerHTML = '';
      mapContainerRef.current.appendChild(mapFrame);
    }
  };

  const getFilteredDestinations = () => {
    switch (mapView) {
      case 'verified':
        return destinations.filter(d => d.verificationStatus === 'verified');
      case 'pending':
        return destinations.filter(d => d.verificationStatus === 'pending');
      case 'zones':
        return destinations.filter(d => 
          zones.some(zone => isInZone(d.coordinates, zone.coordinates))
        );
      default:
        return destinations;
    }
  };

  // Verificar si un punto está dentro de una zona
  const isInZone = (point, zoneCoordinates) => {
    if (!point || !zoneCoordinates || zoneCoordinates.length < 3) return false;
    
    // Simulación simple de detección de punto en polígono
    const avgLat = zoneCoordinates.reduce((sum, coord) => sum + coord.lat, 0) / zoneCoordinates.length;
    const avgLng = zoneCoordinates.reduce((sum, coord) => sum + coord.lng, 0) / zoneCoordinates.length;
    
    return Math.abs(point.lat - avgLat) < 0.5 && Math.abs(point.lng - avgLng) < 0.5;
  };

  const filteredDestinations = getFilteredDestinations();

  const handleSaveCoordinates = async (lodgingId, coordinates) => {
    try {
      setIsSaving(true);
      
      const lat = parseFloat(coordinates.lat);
      const lng = parseFloat(coordinates.lng);
      
      if (isNaN(lat) || isNaN(lng)) {
        alert('Coordenadas inválidas');
        return false;
      }

      const success = await onUpdateCoordinates(lodgingId, { lat, lng });
      
      if (success) {
        setEditingCoords(null);
        setNewCoords({ lat: '', lng: '' });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving coordinates:', error);
      alert('Error al guardar coordenadas');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const startCoordinateEdit = (lodging) => {
    setEditingCoords(lodging);
    setNewCoords({
      lat: lodging.coordinates?.lat || '',
      lng: lodging.coordinates?.lng || ''
    });
  };

  const startZoneCreation = () => {
    setDrawingMode('zone');
    setNewZone({
      name: '',
      description: '',
      coordinates: []
    });
  };

  const addZoneCoordinate = (lat, lng) => {
    if (drawingMode === 'zone') {
      setNewZone(prev => ({
        ...prev,
        coordinates: [...prev.coordinates, { lat, lng }]
      }));
    }
  };

  const saveNewZone = () => {
    if (newZone.coordinates.length < 3) {
      alert('Se necesitan al menos 3 coordenadas para definir una zona');
      return;
    }

    const zone = {
      id: zones.length + 1,
      ...newZone,
      type: 'hidden_treasure',
      color: ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6'][zones.length % 5]
    };

    setZones(prev => [...prev, zone]);
    setDrawingMode(null);
    setNewZone({ name: '', description: '', coordinates: [] });
  };

  // Estadísticas reales
  const destinationsWithCoords = destinations.filter(d => d.coordinates && d.coordinates.lat && d.coordinates.lng).length;
  const accuracyPercentage = destinations.length > 0 ? Math.round((destinationsWithCoords / destinations.length) * 100) : 0;

  // Función para abrir ubicación en Google Maps
  const openInGoogleMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  // Función para abrir ubicación en OpenStreetMap
  const openInOSM = (lat, lng) => {
    window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Mapa Interactivo - Panamá</h3>
            <p className="text-sm text-gray-600">
              Defina zonas de tesoros escondidos y corrija coordenadas
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">
              {filteredDestinations.length} hospedajes visibles
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Controles del Mapa */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setMapView('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              mapView === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos los Hospedajes
          </button>
          <button
            onClick={() => setMapView('verified')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              mapView === 'verified' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Solo Verificados
          </button>
          <button
            onClick={() => setMapView('zones')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              mapView === 'zones' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Zonas Tesoro
          </button>
          <button
            onClick={startZoneCreation}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm font-medium"
          >
            🏴 Definir Nueva Zona
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Mapa Real de Panamá */}
          <div className="xl:col-span-2">
            <div 
              ref={mapContainerRef}
              className="bg-gray-100 rounded-lg h-96 border-2 border-gray-300 overflow-hidden relative"
            >
              {/* Overlay para zonas dibujadas */}
              {drawingMode === 'zone' && (
                <div className="absolute inset-0 bg-blue-50 bg-opacity-20 border-2 border-dashed border-blue-400 flex items-center justify-center">
                  <div className="text-center bg-white p-4 rounded-lg shadow-lg">
                    <div className="text-lg font-semibold text-blue-700 mb-2">
                      Modo Definición de Zona
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Haga clic en el mapa para agregar puntos. Mínimo 3 puntos.
                    </p>
                    <div className="text-xs text-gray-500">
                      Puntos agregados: {newZone.coordinates.length}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Herramientas de Mapa */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                onClick={initializeMap}
                className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                Centrar en Panamá
              </button>
              <button 
                onClick={() => window.open('https://www.openstreetmap.org', '_blank')}
                className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                Abrir OSM Completo
              </button>
              <button className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Corregir Todas
              </button>
              <button className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Exportar Zonas
              </button>
            </div>

            {/* Información de Zona en Creación */}
            {drawingMode === 'zone' && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Definiendo Nueva Zona</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-yellow-700 mb-1">
                      Nombre de la Zona
                    </label>
                    <input
                      type="text"
                      value={newZone.name}
                      onChange={(e) => setNewZone(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                      placeholder="Ej: Costa Caribeña Secreta"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-yellow-700 mb-1">
                      Descripción
                    </label>
                    <input
                      type="text"
                      value={newZone.description}
                      onChange={(e) => setNewZone(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                      placeholder="Características únicas..."
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-yellow-700">
                    {newZone.coordinates.length} puntos definidos
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => setDrawingMode(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveNewZone}
                      disabled={newZone.coordinates.length < 3 || !newZone.name}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm disabled:bg-gray-300"
                    >
                      Guardar Zona
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel de Información */}
          <div className="space-y-6">
            {/* Hospedaje Seleccionado */}
            {selectedLodging && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Hospedaje Seleccionado
                </h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Nombre:</strong> {selectedLodging.name}</div>
                  <div><strong>Ubicación:</strong> {selectedLodging.region || selectedLodging.location}</div>
                  <div>
                    <strong>Coordenadas:</strong>{' '}
                    {selectedLodging.coordinates ? (
                      <div className="space-y-1">
                        <span className="text-green-600">
                          {selectedLodging.coordinates.lat.toFixed(6)}, {selectedLodging.coordinates.lng.toFixed(6)}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openInGoogleMaps(selectedLodging.coordinates.lat, selectedLodging.coordinates.lng)}
                            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Google Maps
                          </button>
                          <button
                            onClick={() => openInOSM(selectedLodging.coordinates.lat, selectedLodging.coordinates.lng)}
                            className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          >
                            OSM
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="text-red-600">No definidas</span>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <button
                      onClick={() => startCoordinateEdit(selectedLodging)}
                      className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
                    >
                      {selectedLodging.coordinates ? 'Corregir Coordenadas' : 'Agregar Coordenadas'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Zonas de Tesoros Escondidos */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Zonas de Tesoros Escondidos ({zones.length})
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {zones.map(zone => (
                  <div key={zone.id} className="p-3 rounded-lg border" style={{ borderLeftColor: zone.color, borderLeftWidth: '4px' }}>
                    <div className="font-medium text-sm">{zone.name}</div>
                    <div className="text-xs text-gray-500">{zone.description}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {zone.coordinates.length} puntos • {destinations.filter(d => isInZone(d.coordinates, zone.coordinates)).length} hospedajes
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Herramientas de Coordenadas */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Herramientas</h4>
              <div className="space-y-2 text-sm">
                <button className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                  Validar Todas las Coordenadas
                </button>
                <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                  Importar desde KML
                </button>
                <button className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm">
                  Exportar Zonas a GPS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edición de Coordenadas */}
      {editingCoords && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCoords.coordinates ? 'Corregir Coordenadas' : 'Agregar Coordenadas'}
              </h3>
              <p className="text-sm text-gray-600">{editingCoords.name}</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitud *
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={newCoords.lat}
                    onChange={(e) => setNewCoords(prev => ({ ...prev, lat: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: 8.537981"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitud *
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={newCoords.lng}
                    onChange={(e) => setNewCoords(prev => ({ ...prev, lng: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: -80.782127"
                    required
                  />
                </div>
              </div>

              {/* Ubicaciones comunes en Panamá */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Ubicaciones en Panamá:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setNewCoords({ lat: '8.537981', lng: '-80.782127' })}
                    className="px-2 py-1 bg-white text-blue-700 rounded text-xs border border-blue-200 hover:bg-blue-50"
                  >
                    Panamá Centro
                  </button>
                  <button
                    onClick={() => setNewCoords({ lat: '9.57', lng: '-78.82' })}
                    className="px-2 py-1 bg-white text-blue-700 rounded text-xs border border-blue-200 hover:bg-blue-50"
                  >
                    San Blas
                  </button>
                  <button
                    onClick={() => setNewCoords({ lat: '8.63', lng: '-80.13' })}
                    className="px-2 py-1 bg-white text-blue-700 rounded text-xs border border-blue-200 hover:bg-blue-50"
                  >
                    Valle de Antón
                  </button>
                  <button
                    onClick={() => setNewCoords({ lat: '9.34', lng: '-82.25' })}
                    className="px-2 py-1 bg-white text-blue-700 rounded text-xs border border-blue-200 hover:bg-blue-50"
                  >
                    Bocas del Toro
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditingCoords(null);
                  setNewCoords({ lat: '', lng: '' });
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveCoordinates(editingCoords.id, newCoords)}
                disabled={isSaving || !newCoords.lat || !newCoords.lng}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Guardando...' : 'Guardar Coordenadas'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
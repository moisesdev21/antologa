// src/components/dashboard/PricingCommissionPanel.jsx
import { useState } from 'react';

const PricingCommissionPanel = ({ destinations, onPricingUpdate }) => {
  const [selectedLodging, setSelectedLodging] = useState(null);
  const [pricingData, setPricingData] = useState({
    basePrice: 0,
    commissionRate: 0,
    seasonalPrices: [],
    specialRates: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Agrupar destinos por tipo para estadísticas
  const pricingStats = destinations.reduce((acc, destination) => {
    const type = destination.lodgingType || 'Otro';
    if (!acc[type]) {
      acc[type] = {
        count: 0,
        avgBasePrice: 0,
        avgCommission: 0,
        totalRevenue: 0
      };
    }
    
    acc[type].count++;
    acc[type].avgBasePrice += destination.basePrice || 0;
    acc[type].avgCommission += destination.commission || 0;
    acc[type].totalRevenue += destination.finalPrice || 0;
    
    return acc;
  }, {});

  // Calcular promedios
  Object.keys(pricingStats).forEach(type => {
    pricingStats[type].avgBasePrice = pricingStats[type].avgBasePrice / pricingStats[type].count;
    pricingStats[type].avgCommission = pricingStats[type].avgCommission / pricingStats[type].count;
  });

  const handleLodgingSelect = (lodging) => {
    setSelectedLodging(lodging);
    setPricingData({
      basePrice: lodging.basePrice || 0,
      commissionRate: lodging.commission || 0,
      seasonalPrices: lodging.seasonalPrices || [],
      specialRates: lodging.specialRates || []
    });
  };

  const handlePricingUpdate = async () => {
    if (!selectedLodging) return;

    try {
      setIsSubmitting(true);
      const success = await onPricingUpdate(selectedLodging.id, pricingData);
      
      if (success) {
        setSelectedLodging(null);
      }
    } catch (error) {
      console.error('Error updating pricing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSeasonalPrice = () => {
    setPricingData(prev => ({
      ...prev,
      seasonalPrices: [...prev.seasonalPrices, {
        season: '',
        startDate: '',
        endDate: '',
        price: 0
      }]
    }));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Estadísticas de Precios */}
      <div className="xl:col-span-1 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen de Precios
          </h3>
          <div className="space-y-4">
            {Object.entries(pricingStats).map(([type, stats]) => (
              <div key={type} className="border-b border-gray-200 pb-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{type}</span>
                  <span className="text-sm text-gray-500">{stats.count} hospedajes</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Precio base promedio: ${stats.avgBasePrice.toFixed(2)}</div>
                  <div>Comisión promedio: {stats.avgCommission.toFixed(1)}%</div>
                  <div>Ingreso potencial: ${stats.totalRevenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuración Global de Comisiones */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Comisiones por Tipo
          </h3>
          <div className="space-y-3">
            {Object.keys(pricingStats).map(type => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{type}</span>
                <span className="text-sm font-medium text-blue-600">
                  {pricingStats[type].avgCommission.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gestión Individual de Precios */}
      <div className="xl:col-span-2">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Gestión de Precios y Comisiones
            </h3>
            <p className="text-sm text-gray-600">
              Actualiza precios base y comisiones por hospedaje
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Selector de Hospedaje */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Hospedaje
              </label>
              <select
                value={selectedLodging?.id || ''}
                onChange={(e) => {
                  const lodging = destinations.find(d => d.id === e.target.value);
                  handleLodgingSelect(lodging);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecciona un hospedaje...</option>
                {destinations.map(lodging => (
                  <option key={lodging.id} value={lodging.id}>
                    {lodging.name} - ${lodging.finalPrice}
                  </option>
                ))}
              </select>
            </div>

            {selectedLodging && (
              <>
                {/* Información del Hospedaje Seleccionado */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedLodging.name}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>Tipo: {selectedLodging.lodgingType}</div>
                    <div>Región: {selectedLodging.region}</div>
                    <div>Estado: {selectedLodging.status}</div>
                    <div>Verificación: {selectedLodging.verificationStatus}</div>
                  </div>
                </div>

                {/* Precio Base */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Base (USD)
                  </label>
                  <input
                    type="number"
                    value={pricingData.basePrice}
                    onChange={(e) => setPricingData(prev => ({ 
                      ...prev, 
                      basePrice: parseFloat(e.target.value) 
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Tasa de Comisión */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tasa de Comisión (%)
                  </label>
                  <input
                    type="number"
                    value={pricingData.commissionRate}
                    onChange={(e) => setPricingData(prev => ({ 
                      ...prev, 
                      commissionRate: parseFloat(e.target.value) 
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Precio final: ${(pricingData.basePrice + (pricingData.basePrice * pricingData.commissionRate / 100)).toFixed(2)}
                  </p>
                </div>

                {/* Precios Estacionales */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Precios Estacionales
                    </label>
                    <button
                      onClick={addSeasonalPrice}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                    >
                      Agregar Temporada
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {pricingData.seasonalPrices.map((season, index) => (
                      <div key={index} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          value={season.season}
                          onChange={(e) => {
                            const newSeasons = [...pricingData.seasonalPrices];
                            newSeasons[index].season = e.target.value;
                            setPricingData(prev => ({ ...prev, seasonalPrices: newSeasons }));
                          }}
                          placeholder="Temporada"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="number"
                          value={season.price}
                          onChange={(e) => {
                            const newSeasons = [...pricingData.seasonalPrices];
                            newSeasons[index].price = parseFloat(e.target.value);
                            setPricingData(prev => ({ ...prev, seasonalPrices: newSeasons }));
                          }}
                          placeholder="Precio"
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de Guardar */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handlePricingUpdate}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCommissionPanel;
// src/components/dashboard/LodgingFilters.jsx
import { useState } from 'react';

const LodgingFilters = ({ filters, onFilterChange, onClearFilters, filteredCount, totalCount }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  // Opciones predefinidas para filtros
  const lodgingTypes = [
    'Hotel', 'B&B', 'Hostal', 'Apartamento', 'Resort', 
    'Villa', 'Cabaña', 'Eco-Lodge', 'Posada', 'Albergue'
  ];

  const regions = [
    'Caribe', 'Pacífico', 'Andina', 'Amazonía', 'Orinoquía',
    'Insular', 'Zona Cafetera', 'Caribe Norte', 'Caribe Sur'
  ];

  const handlePriceChange = (type, value) => {
    const newRange = {
      ...priceRange,
      [type]: parseInt(value) || 0
    };
    setPriceRange(newRange);
    onFilterChange('priceRange', newRange);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Filtros Avanzados de Hospedajes</h3>
          <p className="text-sm text-gray-600 mt-1">
            Mostrando {filteredCount} de {totalCount} hospedajes
          </p>
        </div>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Limpiar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Búsqueda por Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar Hospedaje
          </label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
            placeholder="Nombre, descripción..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tipo de Alojamiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Alojamiento
          </label>
          <select
            value={filters.lodgingType}
            onChange={(e) => onFilterChange('lodgingType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los tipos</option>
            {lodgingTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Región */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Región
          </label>
          <select
            value={filters.region}
            onChange={(e) => onFilterChange('region', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas las regiones</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Estado del Hospedaje */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado del Hospedaje
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="maintenance">En Mantenimiento</option>
          </select>
        </div>

        {/* Estado de Verificación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado de Verificación
          </label>
          <select
            value={filters.verificationStatus}
            onChange={(e) => onFilterChange('verificationStatus', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="verified">Verificado</option>
            <option value="pending">Pendiente</option>
            <option value="rejected">Rechazado</option>
            <option value="needs_review">Necesita Revisión</option>
          </select>
        </div>

        {/* Rango de Precio */}
        <div className="xl:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rango de Precio: ${priceRange.min} - ${priceRange.max}
          </label>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Mínimo</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="1000"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Máximo</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="1000"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodgingFilters;
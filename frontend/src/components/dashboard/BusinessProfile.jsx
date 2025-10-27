// src/components/dashboard/BusinessProfile.jsx
import { useState } from 'react';

// ⚠️ PROP AGREGADA: onEditProfile
const BusinessProfile = ({ business, onBack, onManageSubscription, onEditProfile }) => {
  const [activeTab, setActiveTab] = useState('info');

  const businessData = {
    ...business,
    // ⚠️ CAMBIO: Se agrega el nametag del usuario (dueño)
    contactInfo: {
      ownerName: `${business.user?.name || ''} ${business.user?.lastName || ''}`.trim() || 'No especificado',
      ownerNametag: business.user?.nametag || 'N/A', // ⬅️ CAMBIO CLAVE
      email: business.user?.email || 'contacto@ejemplo.com',
      phone: '+52 55 1234 5678', // Dato de ejemplo
      address: business.businessAddress || 'Dirección no especificada',
      legalName: 'Razón Social S.A. de C.V.', // Dato de ejemplo
      taxId: 'ABC123456789', // Dato de ejemplo
      documents: ['INE', 'Comprobante de domicilio', 'Constitución de empresa'] // Dato de ejemplo
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
      plan: business.currentPlan || 'Básico',
      status: business.subscriptionStatus || 'active',
      // Usar business.nextBillingDate para la renovación
      renewalDate: business.nextBillingDate || '2024-12-31', 
      daysRemaining: 45 // Dato de ejemplo
    }
  };

  const handleStatusChange = (newStatus) => {
    console.log(`Cambiando estado a: ${newStatus} para negocio: ${business.id}`);
    alert(`Estado cambiado a: ${newStatus}`);
  };

  const handleAudit = () => {
    console.log(`Marcando para auditoría: ${business.id}`);
    alert('Negocio marcado para revisión de calidad');
  };

  // Función auxiliar para formatear la clave de un objeto para mostrar en UI
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
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6 overflow-x-hidden">
            {/* Información de Contacto y Legal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Información de Contacto y Legal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(businessData.contactInfo).filter(([key]) => key !== 'documents').map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{formatKey(key)}</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 truncate">{value}</p>
                  </div>
                ))}
              </div>

              {/* Documentos */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Documentos Subidos</label>
                <div className="space-y-2">
                  {businessData.contactInfo.documents.map((doc, index) => (
                    <div key={index} className="flex flex-wrap justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{doc}</span>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm whitespace-nowrap transition-colors duration-200">
                        Ver Documento
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Historial de Modificaciones */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Historial de Modificaciones</h3>
              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Registro inicial</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">15 Nov 2024 - 10:30 AM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full whitespace-nowrap">
                    Completado
                  </span>
                </div>
                <div className="flex flex-wrap justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Verificación de documentos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">16 Nov 2024 - 14:20 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full whitespace-nowrap">
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
            {/* Experiencias */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Experiencias ({businessData.experiences.length})</h3>
              <div className="space-y-4">
                {businessData.experiences.map(exp => (
                  <div key={exp.id} className="flex flex-wrap justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                    <div className="truncate">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{exp.name}</h4>
                      <div className="flex space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                        <span>Reservas: {exp.bookings}</span>
                        <span>Rating: {exp.rating}/5</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      exp.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {exp.status === 'active' ? 'Activo' : 'Pendiente'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destinos */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Destinos ({businessData.destinations.length})</h3>
              <div className="space-y-4">
                {businessData.destinations.map(dest => (
                  <div key={dest.id} className="flex flex-wrap justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                    <div className="truncate">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{dest.name}</h4>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">
                        Visitas: {dest.visits}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium whitespace-nowrap">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Reservas Totales</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{businessData.performance.totalBookings}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Ingresos Generados</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">${businessData.performance.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Calificación Promedio</h3>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{businessData.performance.averageRating}/5</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Crecimiento Mensual</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">+{businessData.performance.monthlyGrowth}%</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-64 flex items-center justify-center transition-colors duration-300">
              <p className="text-gray-500 dark:text-gray-400">Gráfico de rendimiento en desarrollo</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Análisis Detallado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Reservas por Experiencia</h4>
                  <ul className="space-y-2">
                    {businessData.experiences.map(exp => (
                      <li key={exp.id} className="flex justify-between text-sm">
                        <span className="truncate text-gray-700 dark:text-gray-300">{exp.name}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{exp.bookings} reservas</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tendencias</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Factor de Conversión</span>
                      <span className="font-medium text-green-600 dark:text-green-400">12.5%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Tasa de Retención</span>
                      <span className="font-medium text-green-600 dark:text-green-400">78%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Clientes Recurrentes</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">45%</span>
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
        <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <button 
              onClick={onBack}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-2 whitespace-nowrap transition-colors duration-200"
            >
              ← Volver al listado
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">{businessData.businessName}</h1>
            <p className="text-gray-600 dark:text-gray-400 truncate">{businessData.businessDescription}</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* ⚠️ BOTÓN AGREGADO: Para edición del perfil */}
            <button
              onClick={onEditProfile} 
              className="px-4 py-2 bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 text-sm whitespace-nowrap transition-colors duration-200"
            >
              📝 Editar Perfil
            </button>
            <button
              onClick={handleAudit}
              className="px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 text-sm whitespace-nowrap transition-colors duration-200"
            >
              Marcar para Auditoría
            </button>
            <button
              onClick={onManageSubscription}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 text-sm whitespace-nowrap transition-colors duration-200"
            >
              Gestionar Suscripción
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg truncate transition-colors duration-300">
            <div className="text-sm text-gray-600 dark:text-gray-400">Estado del Negocio</div>
            <div className={`text-lg font-semibold ${
              businessData.status === 'active' ? 'text-green-600 dark:text-green-400' :
              businessData.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {businessData.status === 'active' ? 'Activo' :
               businessData.status === 'pending' ? 'Pendiente' : 'Suspendido'}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg truncate transition-colors duration-300">
            <div className="text-sm text-gray-600 dark:text-gray-400">Plan Actual</div>
            <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">{businessData.subscription.plan}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg truncate transition-colors duration-300">
            <div className="text-sm text-gray-600 dark:text-gray-400">Próxima Renovación</div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {new Date(businessData.subscription.renewalDate).toLocaleDateString('es-ES')}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleStatusChange('approved')}
            className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
          >
            Aprobar Negocio
          </button>
          <button
            onClick={() => handleStatusChange('rejected')}
            className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
          >
            Rechazar
          </button>
          <button
            onClick={() => handleStatusChange('suspended')}
            className="px-4 py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors duration-200"
          >
            Suspender
          </button>
        </div>
      </div>

      {/* Navegación por Pestañas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap space-x-4 px-6">
            {[
              { id: 'info', name: 'Información General' },
              { id: 'content', name: 'Contenido Asociado' },
              { id: 'performance', name: 'Desempeño' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
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

export default BusinessProfile;
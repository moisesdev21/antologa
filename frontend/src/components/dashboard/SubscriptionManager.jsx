// src/components/dashboard/SubscriptionManager.jsx
import { useState } from 'react';

const SubscriptionManager = ({ business, onBack, onSave }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedPlan, setSelectedPlan] = useState(business.currentPlan || 'Básico');
  const [subscriptionStatus, setSubscriptionStatus] = useState(business.subscriptionStatus || 'active');

  // Datos de ejemplo para simular la BD
  const subscriptionData = {
    currentPlan: business.currentPlan || 'Básico',
    subscriptionStatus: business.subscriptionStatus || 'active',
    renewalDate: business.renewalDate || '2024-12-31',
    daysRemaining: Math.ceil((new Date(business.renewalDate || '2024-12-31') - new Date()) / (1000 * 60 * 60 * 24)),
    billingHistory: [
      { id: 1, date: '2024-11-01', amount: 299.00, status: 'completed', method: 'Stripe ****4242' },
      { id: 2, date: '2024-10-01', amount: 299.00, status: 'completed', method: 'Stripe ****4242' },
      { id: 3, date: '2024-09-01', amount: 299.00, status: 'failed', method: 'Stripe ****4242' },
      { id: 4, date: '2024-08-01', amount: 299.00, status: 'completed', method: 'PayPal' },
    ],
    availablePlans: [
      { id: 'basic', name: 'Básico', price: 299, features: ['5 experiencias', '3 destinos', 'Soporte básico'] },
      { id: 'premium', name: 'Premium', price: 599, features: ['Experiencias ilimitadas', 'Destinos ilimitados', 'Soporte prioritario', 'Analytics avanzado'] },
      { id: 'enterprise', name: 'Enterprise', price: 999, features: ['Todo en Premium', 'API personalizada', 'Account manager', 'White-label'] }
    ],
    auditHistory: [
      { id: 1, date: '2024-11-15', type: 'Calidad', status: 'approved', notes: 'Cumple con estándares de calidad' },
      { id: 2, date: '2024-10-20', type: 'Documentación', status: 'pending', notes: 'Falta documento de constitución' },
      { id: 3, date: '2024-09-05', type: 'Contenido', status: 'approved', notes: 'Contenido verificado y aprobado' }
    ]
  };

  const handlePlanChange = (planId) => {
    const plan = subscriptionData.availablePlans.find(p => p.id === planId);
    setSelectedPlan(plan.name);
    console.log(`Cambiando plan a: ${plan.name}`);
  };

  const handleStatusChange = (newStatus) => {
    setSubscriptionStatus(newStatus);
    console.log(`Cambiando estado de suscripción a: ${newStatus}`);
  };

  const handleExtendTrial = (days) => {
    console.log(`Extendiendo prueba por ${days} días`);
    alert(`Prueba extendida por ${days} días`);
  };

  const handleSendReminder = () => {
    console.log('Enviando recordatorio de pago');
    alert('Recordatorio de pago enviado');
  };

  const handleForceRenewal = () => {
    console.log('Forzando renovación manual');
    alert('Renovación forzada exitosamente');
  };

  const handleMarkForAudit = (type) => {
    console.log(`Marcando para auditoría de: ${type}`);
    alert(`Marcado para auditoría de ${type}`);
  };

  // Renderizar contenido según la pestaña activa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'current':
        return (
          <div className="space-y-6">
            {/* Panel de Suscripción Actual */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Suscripción Actual</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-blue-600 dark:text-blue-400">Plan Actual</div>
                  <div className="text-xl font-bold text-blue-800 dark:text-blue-300">{subscriptionData.currentPlan}</div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-green-600 dark:text-green-400">Estado</div>
                  <div className="text-xl font-bold text-green-800 dark:text-green-300 capitalize">
                    {subscriptionData.subscriptionStatus === 'active' ? 'Activa' : 
                     subscriptionData.subscriptionStatus === 'expired' ? 'Vencida' : 
                     subscriptionData.subscriptionStatus === 'trial' ? 'Prueba' : subscriptionData.subscriptionStatus}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-purple-600 dark:text-purple-400">Días Restantes</div>
                  <div className="text-xl font-bold text-purple-800 dark:text-purple-300">{subscriptionData.daysRemaining} días</div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg transition-colors duration-300">
                  <div className="text-sm text-orange-600 dark:text-orange-400">Próxima Renovación</div>
                  <div className="text-xl font-bold text-orange-800 dark:text-orange-300">
                    {new Date(subscriptionData.renewalDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones Administrativas */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Acciones Administrativas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('change-plan')}
                  className="p-4 border-2 border-blue-200 dark:border-blue-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                >
                  <div className="font-semibold text-blue-700 dark:text-blue-400">Cambiar Plan</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Actualizar plan de suscripción</div>
                </button>
                
                <button
                  onClick={() => handleExtendTrial(14)}
                  className="p-4 border-2 border-green-200 dark:border-green-700 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors text-left"
                >
                  <div className="font-semibold text-green-700 dark:text-green-400">Extender Prueba</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">+14 días de prueba gratuita</div>
                </button>
                
                <button
                  onClick={() => handleStatusChange('paused')}
                  className="p-4 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors text-left"
                >
                  <div className="font-semibold text-yellow-700 dark:text-yellow-400">Pausar Suscripción</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Suspender temporalmente</div>
                </button>
                
                <button
                  onClick={handleForceRenewal}
                  className="p-4 border-2 border-purple-200 dark:border-purple-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors text-left"
                >
                  <div className="font-semibold text-purple-700 dark:text-purple-400">Forzar Renovación</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Renovación manual inmediata</div>
                </button>
                
                <button
                  onClick={handleSendReminder}
                  className="p-4 border-2 border-orange-200 dark:border-orange-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-400 transition-colors text-left"
                >
                  <div className="font-semibold text-orange-700 dark:text-orange-400">Recordatorio de Pago</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enviar notificación</div>
                </button>
                
                <button
                  onClick={() => setActiveTab('payment-method')}
                  className="p-4 border-2 border-red-200 dark:border-red-700 rounded-lg hover:border-red-500 dark:hover:border-red-400 transition-colors text-left"
                >
                  <div className="font-semibold text-red-700 dark:text-red-400">Actualizar Pago</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Método de pago</div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Historial de Facturación */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Historial de Facturación</h3>
              <div className="space-y-4">
                {subscriptionData.billingHistory.map(payment => (
                  <div key={payment.id} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {new Date(payment.date).toLocaleDateString('es-ES')} - ${payment.amount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{payment.method}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      payment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {payment.status === 'completed' ? 'Completado' :
                       payment.status === 'pending' ? 'Pendiente' : 'Fallido'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de Pagos */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resumen de Pagos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${subscriptionData.billingHistory.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Pagado</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {subscriptionData.billingHistory.filter(p => p.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pagos Exitosos</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {subscriptionData.billingHistory.filter(p => p.status === 'failed').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pagos Fallidos</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'change-plan':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Cambiar Plan de Suscripción</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionData.availablePlans.map(plan => (
                  <div
                    key={plan.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      selectedPlan === plan.name
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => handlePlanChange(plan.id)}
                  >
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h4>
                      <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">${plan.price}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">/mes</div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedPlan === plan.name
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {selectedPlan === plan.name ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setActiveTab('current')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert(`Plan cambiado a: ${selectedPlan}`);
                    setActiveTab('current');
                  }}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
                >
                  Confirmar Cambio
                </button>
              </div>
            </div>
          </div>
        );

      case 'audit':
        return (
          <div className="space-y-6">
            {/* Herramienta de Auditoría */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Herramienta de Auditoría</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => handleMarkForAudit('calidad')}
                  className="p-4 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors duration-200"
                >
                  <div className="font-semibold text-orange-700 dark:text-orange-400">Revisión de Calidad</div>
                </button>
                <button
                  onClick={() => handleMarkForAudit('documentacion')}
                  className="p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                >
                  <div className="font-semibold text-blue-700 dark:text-blue-400">Verificar Documentos</div>
                </button>
                <button
                  onClick={() => handleMarkForAudit('contenido')}
                  className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200"
                >
                  <div className="font-semibold text-green-700 dark:text-green-400">Auditar Contenido</div>
                </button>
                <button
                  onClick={() => handleMarkForAudit('cumplimiento')}
                  className="p-4 bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200"
                >
                  <div className="font-semibold text-purple-700 dark:text-purple-400">Cumplimiento</div>
                </button>
              </div>

              {/* Historial de Auditorías */}
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Historial de Auditorías</h4>
              <div className="space-y-3">
                {subscriptionData.auditHistory.map(audit => (
                  <div key={audit.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{audit.type}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{audit.notes}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(audit.date).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      audit.status === 'approved' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      audit.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {audit.status === 'approved' ? 'Aprobado' :
                       audit.status === 'pending' ? 'Pendiente' : 'Rechazado'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-2 transition-colors duration-200"
            >
              ← Volver al perfil
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestión de Suscripción - {business.businessName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Administra la suscripción y facturación del negocio
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* Navegación por Pestañas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'current', name: 'Suscripción Actual' },
              { id: 'billing', name: 'Historial de Facturación' },
              { id: 'change-plan', name: 'Cambiar Plan' },
              { id: 'audit', name: 'Auditoría' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
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

        {/* Contenido de la Pestaña */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;
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
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Suscripción Actual</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Plan Actual</div>
                  <div className="text-xl font-bold text-blue-800">{subscriptionData.currentPlan}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600">Estado</div>
                  <div className="text-xl font-bold text-green-800 capitalize">
                    {subscriptionData.subscriptionStatus === 'active' ? 'Activa' : 
                     subscriptionData.subscriptionStatus === 'expired' ? 'Vencida' : 
                     subscriptionData.subscriptionStatus === 'trial' ? 'Prueba' : subscriptionData.subscriptionStatus}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600">Días Restantes</div>
                  <div className="text-xl font-bold text-purple-800">{subscriptionData.daysRemaining} días</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-sm text-orange-600">Próxima Renovación</div>
                  <div className="text-xl font-bold text-orange-800">
                    {new Date(subscriptionData.renewalDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones Administrativas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Acciones Administrativas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('change-plan')}
                  className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 transition-colors text-left"
                >
                  <div className="font-semibold text-blue-700">Cambiar Plan</div>
                  <div className="text-sm text-gray-600 mt-1">Actualizar plan de suscripción</div>
                </button>
                
                <button
                  onClick={() => handleExtendTrial(14)}
                  className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 transition-colors text-left"
                >
                  <div className="font-semibold text-green-700">Extender Prueba</div>
                  <div className="text-sm text-gray-600 mt-1">+14 días de prueba gratuita</div>
                </button>
                
                <button
                  onClick={() => handleStatusChange('paused')}
                  className="p-4 border-2 border-yellow-200 rounded-lg hover:border-yellow-500 transition-colors text-left"
                >
                  <div className="font-semibold text-yellow-700">Pausar Suscripción</div>
                  <div className="text-sm text-gray-600 mt-1">Suspender temporalmente</div>
                </button>
                
                <button
                  onClick={handleForceRenewal}
                  className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 transition-colors text-left"
                >
                  <div className="font-semibold text-purple-700">Forzar Renovación</div>
                  <div className="text-sm text-gray-600 mt-1">Renovación manual inmediata</div>
                </button>
                
                <button
                  onClick={handleSendReminder}
                  className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-500 transition-colors text-left"
                >
                  <div className="font-semibold text-orange-700">Recordatorio de Pago</div>
                  <div className="text-sm text-gray-600 mt-1">Enviar notificación</div>
                </button>
                
                <button
                  onClick={() => setActiveTab('payment-method')}
                  className="p-4 border-2 border-red-200 rounded-lg hover:border-red-500 transition-colors text-left"
                >
                  <div className="font-semibold text-red-700">Actualizar Pago</div>
                  <div className="text-sm text-gray-600 mt-1">Método de pago</div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Historial de Facturación */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Historial de Facturación</h3>
              <div className="space-y-4">
                {subscriptionData.billingHistory.map(payment => (
                  <div key={payment.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(payment.date).toLocaleDateString('es-ES')} - ${payment.amount}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{payment.method}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status === 'completed' ? 'Completado' :
                       payment.status === 'pending' ? 'Pendiente' : 'Fallido'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de Pagos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Resumen de Pagos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${subscriptionData.billingHistory.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Total Pagado</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {subscriptionData.billingHistory.filter(p => p.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-600">Pagos Exitosos</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {subscriptionData.billingHistory.filter(p => p.status === 'failed').length}
                  </div>
                  <div className="text-sm text-gray-600">Pagos Fallidos</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'change-plan':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Cambiar Plan de Suscripción</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionData.availablePlans.map(plan => (
                  <div
                    key={plan.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      selectedPlan === plan.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePlanChange(plan.id)}
                  >
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                      <div className="mt-2 text-3xl font-bold text-blue-600">${plan.price}</div>
                      <div className="text-sm text-gray-600">/mes</div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full mt-4 py-2 rounded-lg font-medium ${
                        selectedPlan === plan.name
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert(`Plan cambiado a: ${selectedPlan}`);
                    setActiveTab('current');
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Herramienta de Auditoría</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => handleMarkForAudit('calidad')}
                  className="p-4 bg-orange-100 border border-orange-200 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  <div className="font-semibold text-orange-700">Revisión de Calidad</div>
                </button>
                <button
                  onClick={() => handleMarkForAudit('documentacion')}
                  className="p-4 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <div className="font-semibold text-blue-700">Verificar Documentos</div>
                </button>
                <button
                  onClick={() => handleMarkForAudit('contenido')}
                  className="p-4 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <div className="font-semibold text-green-700">Auditar Contenido</div>
                </button>
                <button
                  onClick={() => handleMarkForAudit('cumplimiento')}
                  className="p-4 bg-purple-100 border border-purple-200 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <div className="font-semibold text-purple-700">Cumplimiento</div>
                </button>
              </div>

              {/* Historial de Auditorías */}
              <h4 className="font-semibold mb-3">Historial de Auditorías</h4>
              <div className="space-y-3">
                {subscriptionData.auditHistory.map(audit => (
                  <div key={audit.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{audit.type}</div>
                      <div className="text-sm text-gray-600">{audit.notes}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(audit.date).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      audit.status === 'approved' ? 'bg-green-100 text-green-800' :
                      audit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
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
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
            >
              ← Volver al perfil
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Suscripción - {business.businessName}
            </h1>
            <p className="text-gray-600">
              Administra la suscripción y facturación del negocio
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* Navegación por Pestañas */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
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
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
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

        {/* Contenido de la Pestaña */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;

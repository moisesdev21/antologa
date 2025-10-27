import { useState } from 'react';
import BusinessList from './BusinessList';
import BusinessProfile from './BusinessProfile';
import SubscriptionManager from './SubscriptionManager';

const VIEW_TITLES = {
  list: 'Business DB - Negocios Afiliados',
  profile: 'Perfil del Negocio',
  subscription: 'Gestión de Suscripción',
  // Si añades una vista de edición separada, la pones aquí:
  // 'edit-profile': 'Editar Perfil del Negocio', 
};

const BusinessDB = ({ businesses = [], loading = false, onRefresh }) => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handleViewProfile = (business) => {
    setSelectedBusiness(business);
    setCurrentView('profile');
  };

  const handleManageSubscription = (business) => {
    setSelectedBusiness(business);
    setCurrentView('subscription');
  };

  // Función para manejar la acción de editar el perfil
  const handleEditProfile = () => {
    // Aquí puedes añadir lógica administrativa o cambiar a una vista de edición
    console.log(`[Admin Action] Iniciando edición de perfil para: ${selectedBusiness.businessName}`);
    // Por ahora, se asume que el componente BusinessProfile manejará la edición internamente.
    // Si tienes un componente 'BusinessEditForm', cambiarías la vista aquí:
    // setCurrentView('edit-profile'); 
  };
  
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedBusiness(null);
    onRefresh(); // Se recomienda refrescar la lista al volver
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return (
          <BusinessProfile
            business={selectedBusiness}
            onBack={handleBackToList}
            onManageSubscription={() => setCurrentView('subscription')}
            onEditProfile={handleEditProfile} // ⬅️ PROP AGREGADA
          />
        );
      case 'subscription':
        return (
          <SubscriptionManager
            business={selectedBusiness}
            onBack={() => setCurrentView('profile')}
            onSave={handleBackToList} // Volver a la lista después de guardar
          />
        );
      default:
        return (
          <BusinessList
            businesses={businesses}
            loading={loading}
            onRefresh={onRefresh}
            onViewProfile={handleViewProfile}
            onEditSubscription={handleManageSubscription}
          />
        );
    }
  };

  return (
    <div className="business-db-container h-auto max-w-full px-2 sm:px-4 overflow-hidden">
      {/* Header con navegación */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
        <nav className="flex flex-wrap items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 w-full transition-colors duration-300">
          {/* Botón de volver a la lista */}
          <button onClick={handleBackToList} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            Business DB
          </button>

          {currentView !== 'list' && selectedBusiness && (
            <>
              {/* Ruta dinámica */}
              <span className="mx-1">›</span>
              <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{VIEW_TITLES[currentView]}</span>
              <span className="mx-1">›</span>
              <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{selectedBusiness.businessName}</span>
            </>
          )}
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white w-full mt-2 sm:mt-0 transition-colors duration-300">
          {VIEW_TITLES[currentView]}
        </h1>
      </div>

      {/* Contenido principal */}
      <div className="w-full h-[1330px] overflow-hidden">{renderCurrentView()}</div>
    </div>
  );
};

export default BusinessDB;
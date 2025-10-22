// src/components/dashboard/VerificationModal.jsx
import { useState } from 'react';

const VerificationModal = ({ lodging, onClose, onVerify }) => {
  const [verificationData, setVerificationData] = useState({
    availability: false,
    photoQuality: false,
    contactInfo: false,
    pricingAccuracy: false,
    policiesClarity: false,
    coordinatesAccuracy: false,
    notes: '',
    verificationStatus: 'pending'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar datos de verificación cuando cambia el lodging
  useState(() => {
    if (lodging) {
      setVerificationData({
        availability: lodging.verificationData?.availability || false,
        photoQuality: lodging.verificationData?.photoQuality || false,
        contactInfo: lodging.verificationData?.contactInfo || false,
        pricingAccuracy: lodging.verificationData?.pricingAccuracy || false,
        policiesClarity: lodging.verificationData?.policiesClarity || false,
        coordinatesAccuracy: lodging.verificationData?.coordinatesAccuracy || false,
        notes: lodging.verificationData?.notes || '',
        verificationStatus: lodging.verificationStatus || 'pending'
      });
    }
  }, [lodging]);

  const handleCheckboxChange = (field) => {
    setVerificationData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleStatusChange = (status) => {
    setVerificationData(prev => ({
      ...prev,
      verificationStatus: status
    }));
  };

  const handleSubmit = async () => {
    if (!lodging) return;

    try {
      setIsSubmitting(true);
      
      // Calcular verificación automática basada en checks
      const allChecks = [
        verificationData.availability,
        verificationData.photoQuality,
        verificationData.contactInfo,
        verificationData.pricingAccuracy,
        verificationData.policiesClarity,
        verificationData.coordinatesAccuracy
      ];
      
      const passedChecks = allChecks.filter(Boolean).length;
      const autoStatus = passedChecks >= 4 ? 'verified' : 
                        passedChecks >= 2 ? 'needs_review' : 'rejected';

      const finalStatus = verificationData.verificationStatus !== 'pending' ? 
                         verificationData.verificationStatus : autoStatus;

      const verificationPayload = {
        verificationData: {
          ...verificationData,
          verifiedAt: new Date().toISOString(),
          verifiedBy: 'admin', // Esto debería venir del contexto de autenticación
          passedChecks,
          totalChecks: allChecks.length
        },
        verificationStatus: finalStatus,
        lastVerified: new Date().toISOString()
      };

      const success = await onVerify(lodging.id, verificationPayload);
      
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error submitting verification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lodging) return null;

  const allChecks = [
    verificationData.availability,
    verificationData.photoQuality,
    verificationData.contactInfo,
    verificationData.pricingAccuracy,
    verificationData.policiesClarity,
    verificationData.coordinatesAccuracy
  ];
  const passedChecks = allChecks.filter(Boolean).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Verificación de Hospedaje
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {lodging.name} - ID: {lodging.id}
          </p>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Información del Hospedaje */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Información Básica</h4>
              <p className="text-sm text-gray-600">Tipo: {lodging.lodgingType}</p>
              <p className="text-sm text-gray-600">Región: {lodging.region}</p>
              <p className="text-sm text-gray-600">Precio: ${lodging.finalPrice}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Contacto</h4>
              <p className="text-sm text-gray-600">Email: {lodging.contactEmail || 'No disponible'}</p>
              <p className="text-sm text-gray-600">Teléfono: {lodging.contactPhone || 'No disponible'}</p>
            </div>
          </div>

          {/* Checklist de Verificación */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Checklist de Verificación ({passedChecks}/6 aprobados)
            </h3>
            <div className="space-y-3">
              {[
                { key: 'availability', label: 'Disponibilidad en tiempo real verificada' },
                { key: 'photoQuality', label: 'Calidad y autenticidad de fotos aprobada' },
                { key: 'contactInfo', label: 'Información de contacto actualizada y funcional' },
                { key: 'pricingAccuracy', label: 'Precios coherentes y actualizados' },
                { key: 'policiesClarity', label: 'Políticas claras y transparentes' },
                { key: 'coordinatesAccuracy', label: 'Coordenadas geográficas precisas' }
              ].map((item) => (
                <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verificationData[item.key]}
                    onChange={() => handleCheckboxChange(item.key)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notas Adicionales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas de Verificación
            </label>
            <textarea
              value={verificationData.notes}
              onChange={(e) => setVerificationData(prev => ({ ...prev, notes: e.target.value }))}
              rows="3"
              placeholder="Observaciones, comentarios o detalles importantes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Estado Final de Verificación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Estado Final de Verificación
            </label>
            <div className="flex space-x-4">
              {[
                { value: 'verified', label: 'Aprobado', color: 'bg-green-100 text-green-800' },
                { value: 'needs_review', label: 'Necesita Revisión', color: 'bg-yellow-100 text-yellow-800' },
                { value: 'rejected', label: 'Rechazado', color: 'bg-red-100 text-red-800' }
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleStatusChange(status.value)}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium text-sm ${
                    verificationData.verificationStatus === status.value
                      ? `${status.color} border-${status.color.split('-')[1]}-300`
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Verificación'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
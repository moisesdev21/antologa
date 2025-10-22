// src/components/dashboard/ProfileSection.jsx
import { useState } from 'react';
import { 
  FaKey, 
  FaUsers, 
  FaShieldAlt, 
  FaHistory, 
  FaUserPlus, 
  FaEye, 
  FaEyeSlash, 
  FaSave, 
  FaEdit, 
  FaTrash, 
  FaBan, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock
} from 'react-icons/fa';

const ProfileSection = ({ 
  admins = [], 
  activityLogs = [], 
  loading = false,
  changePassword,
  createAdmin,
 
  toggleAdminStatus,
  deleteAdmin 
}) => {
  const [activeTab, setActiveTab] = useState('password');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'analyst'
  });


  const [showModal, setShowModal] = useState(false);

  // Configuración de roles
  const rolesConfig = {
    super_admin: {
      name: 'Super Admin',
      description: 'Acceso completo a todas las funcionalidades',
      color: 'bg-purple-100 text-purple-800'
    },
    content_manager: {
      name: 'Content Manager', 
      description: 'Gestiona usuarios, negocios y contenido',
      color: 'bg-blue-100 text-blue-800'
    },
    analyst: {
      name: 'Analyst',
      description: 'Acceso de solo lectura a reportes',
      color: 'bg-green-100 text-green-800'
    },
    moderator: {
      name: 'Moderator',
      description: 'Puede moderar usuarios y contenido',
      color: 'bg-orange-100 text-orange-800'
    }
  };

  const tabs = [
    { id: 'password', label: 'Cambiar Contraseña', icon: FaKey },
    { id: 'team', label: 'Gestión de Equipo', icon: FaUsers },
    { id: 'roles', label: 'Roles y Permisos', icon: FaShieldAlt },
    { id: 'activity', label: 'Historial de Actividad', icon: FaHistory }
  ];

  // Manejar cambio de contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsSubmitting(true);
    const result = await changePassword(passwordData);
    
    if (result.success) {
      alert('Contraseña actualizada correctamente');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      alert('Error: ' + result.message);
    }
    setIsSubmitting(false);
  };

  // Manejar creación de admin
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) {
      alert('Completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    const result = await createAdmin(newAdmin);
    
    if (result.success) {
      alert('Administrador creado exitosamente');
      setNewAdmin({ name: '', email: '', role: 'analyst' });
      setShowModal(false);
    } else {
      alert('Error: ' + result.message);
    }
    setIsSubmitting(false);
  };

  // Manejar suspensión/activación
  const handleToggleStatus = async (adminId) => {
    const admin = admins.find(a => a.id === adminId);
    const action = admin.status === 'active' ? 'suspender' : 'activar';
    
    if (window.confirm(`¿Estás seguro de ${action} a este administrador?`)) {
      await toggleAdminStatus(adminId);
    }
  };

  // Manejar eliminación
  const handleDeleteAdmin = async (adminId) => {
    if (window.confirm('¿Estás seguro de eliminar este administrador?')) {
      await deleteAdmin(adminId);
    }
  };

  // Obtener información de estado
  const getStatusInfo = (status) => {
    return status === 'active' 
      ? { color: 'bg-green-100 text-green-800', text: 'Activo' }
      : { color: 'bg-red-100 text-red-800', text: 'Suspendido' };
  };

  // Obtener información de acción
  const getActionInfo = (action) => {
    const actions = {
      user_suspended: { color: 'bg-red-100 text-red-800', label: 'Usuario Suspendido' },
      business_approved: { color: 'bg-green-100 text-green-800', label: 'Negocio Aprobado' },
      report_generated: { color: 'bg-blue-100 text-blue-800', label: 'Reporte Generado' }
    };
    return actions[action] || { color: 'bg-gray-100 text-gray-800', label: action };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Administración del Sistema</h2>
          <p className="text-gray-600">Gestiona seguridad, roles y actividades del equipo</p>
        </div>
      </div>

      {/* Navegación */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="mr-2 text-lg" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenido */}
      <div className="min-h-96">
        {/* PESTAÑA: CAMBIAR CONTRASEÑA */}
        {activeTab === 'password' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <FaKey className="mr-2 text-blue-500" />
                Cambiar Contraseña
              </h3>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña Actual
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingresa tu contraseña actual"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingresa tu nueva contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirma tu nueva contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                >
                  <FaSave className="mr-2" />
                  {isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PESTAÑA: GESTIÓN DE EQUIPO */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Equipo Administrativo</h3>
                <p className="text-gray-600">Gestiona los administradores del sistema</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {admins.length} administrador{admins.length !== 1 ? 'es' : ''}
                </span>
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaUserPlus className="mr-2" />
                  Agregar Admin
                </button>
              </div>
            </div>

            {/* Tabla de administradores */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Administrador
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Última Actividad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => {
                      const statusInfo = getStatusInfo(admin.status);
                      const roleInfo = rolesConfig[admin.role] || rolesConfig.analyst;
                      
                      return (
                        <tr key={admin.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                              <div className="text-sm text-gray-500">{admin.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleInfo.color}`}>
                              {roleInfo.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                              {statusInfo.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <FaClock className="mr-1 text-gray-400" />
                              {new Date(admin.lastActive).toLocaleDateString('es-ES')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleToggleStatus(admin.id)}
                                className={admin.status === 'active' 
                                  ? 'text-yellow-600 hover:text-yellow-800' 
                                  : 'text-green-600 hover:text-green-800'
                                }
                              >
                                {admin.status === 'active' ? <FaBan /> : <FaCheckCircle />}
                              </button>
                              {admin.role !== 'super_admin' && (
                                <button 
                                  onClick={() => handleDeleteAdmin(admin.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal para nuevo administrador */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Administrador</h3>
                  <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        value={newAdmin.name}
                        onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre del administrador"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="email@ejemplo.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rol
                      </label>
                      <select
                        value={newAdmin.role}
                        onChange={(e) => setNewAdmin(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Object.entries(rolesConfig).map(([key, role]) => (
                          <option key={key} value={key}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                      >
                        {isSubmitting ? 'Creando...' : 'Crear Administrador'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA: ROLES Y PERMISOS */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaShieldAlt className="mr-2 text-blue-500" />
                Sistema de Roles y Permisos
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(rolesConfig).map(([key, role]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{role.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                        {role.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    <div className="text-xs text-gray-500">
                      Permisos: {role.name === 'Super Admin' ? 'Todos los permisos' : 'Permisos específicos'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: HISTORIAL DE ACTIVIDAD */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Historial de Actividad</h3>
              <span className="text-sm text-gray-600">{activityLogs.length} actividades</span>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {activityLogs.map((log) => {
                  const actionInfo = getActionInfo(log.action);
                  return (
                    <div key={log.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${actionInfo.color}`}>
                              {actionInfo.label}
                            </span>
                            <span className="text-sm font-medium text-gray-900">{log.admin}</span>
                          </div>
                          <p className="text-sm text-gray-900 font-medium mb-1">{log.target}</p>
                          <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>IP: {log.ip}</span>
                            <span>{new Date(log.timestamp).toLocaleString('es-ES')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
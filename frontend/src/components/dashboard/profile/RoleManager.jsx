import { useState } from 'react';
import { FaSave, FaPlus, FaTrash, FaShield } from 'react-icons/fa';

const RoleManager = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Acceso completo a todas las funcionalidades del sistema',
      permissions: ['dashboard', 'users', 'businesses', 'destinations', 'experiences', 'reports', 'admin_management'],
      userCount: 1
    },
    {
      id: 2,
      name: 'Content Manager',
      description: 'Puede gestionar usuarios, negocios y contenido',
      permissions: ['dashboard', 'users', 'businesses', 'destinations', 'experiences'],
      userCount: 2
    },
    {
      id: 3,
      name: 'Analyst',
      description: 'Solo puede ver reportes y estadísticas',
      permissions: ['dashboard', 'reports'],
      userCount: 1
    },
    {
      id: 4,
      name: 'Moderator',
      description: 'Gestiona usuarios y contenido',
      permissions: ['dashboard', 'users', 'reviews'],
      userCount: 0
    }
  ]);

  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] });

  const permissionsList = [
    { id: 'dashboard', label: 'Ver Dashboard', description: 'Acceso al panel principal' },
    { id: 'users', label: 'Gestionar Usuarios', description: 'Crear, editar y eliminar usuarios' },
    { id: 'businesses', label: 'Gestionar Negocios', description: 'Aprobar y administrar negocios' },
    { id: 'destinations', label: 'Gestionar Destinos', description: 'Administrar destinos turísticos' },
    { id: 'experiences', label: 'Gestionar Experiencias', description: 'Administrar experiencias' },
    { id: 'reports', label: 'Ver Reportes', description: 'Acceso a reportes y estadísticas' },
    { id: 'admin_management', label: 'Gestión de Admins', description: 'Administrar equipo administrativo' },
    { id: 'reviews', label: 'Moderar Reseñas', description: 'Aprobar y eliminar reseñas' }
  ];

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setSelectedRole({
        ...selectedRole,
        permissions: [...selectedRole.permissions, permissionId]
      });
    } else {
      setSelectedRole({
        ...selectedRole,
        permissions: selectedRole.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const handleSaveRole = () => {
    const updatedRoles = roles.map(role =>
      role.id === selectedRole.id ? selectedRole : role
    );
    setRoles(updatedRoles);
    // Aquí iría la llamada a la API para guardar los cambios
  };

  const handleAddRole = () => {
    if (newRole.name && newRole.permissions.length > 0) {
      const role = {
        id: roles.length + 1,
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
        userCount: 0
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowAddRole(false);
    }
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este rol?')) {
      setRoles(roles.filter(role => role.id !== roleId));
      if (selectedRole.id === roleId) {
        setSelectedRole(roles[0]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <FaShield className="mr-2 text-blue-500" />
          Gestión de Roles y Permisos
        </h3>
        <button
          onClick={() => setShowAddRole(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <FaPlus className="mr-2" />
          Nuevo Rol
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Roles */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold">Roles del Sistema</h4>
            </div>
            <div className="divide-y divide-gray-200">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedRole.id === role.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{role.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {role.userCount} usuario{role.userCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {role.name !== 'Super Admin' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor de Permisos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h4 className="font-semibold">Permisos: {selectedRole.name}</h4>
              <button
                onClick={handleSaveRole}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <FaSave className="mr-2" />
                Guardar Cambios
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{selectedRole.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissionsList.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      id={`permission-${permission.id}`}
                      checked={selectedRole.permissions.includes(permission.id)}
                      onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label
                        htmlFor={`permission-${permission.id}`}
                        className="font-medium text-gray-900 cursor-pointer"
                      >
                        {permission.label}
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar nuevo rol */}
      {showAddRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">Agregar Nuevo Rol</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Rol
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Support Manager"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe las responsabilidades de este rol..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permisos
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {permissionsList.map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`new-${permission.id}`}
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewRole({
                              ...newRole,
                              permissions: [...newRole.permissions, permission.id]
                            });
                          } else {
                            setNewRole({
                              ...newRole,
                              permissions: newRole.permissions.filter(p => p !== permission.id)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={`new-${permission.id}`} className="text-sm">
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddRole(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddRole}
                disabled={!newRole.name || newRole.permissions.length === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                Crear Rol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManager;
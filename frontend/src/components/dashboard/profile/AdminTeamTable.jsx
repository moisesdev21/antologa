import { useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaCheckCircle, FaUserPlus } from 'react-icons/fa';

const AdminTeamTable = ({ admins, loading }) => {
  const [adminList, setAdminList] = useState(admins || []);

  const handleSuspend = (adminId) => {
    setAdminList(adminList.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'active' ? 'suspended' : 'active' }
        : admin
    ));
  };

  const handleDelete = (adminId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este administrador?')) {
      setAdminList(adminList.filter(admin => admin.id !== adminId));
    }
  };

  const columns = [
    { key: 'name', title: 'Nombre' },
    { key: 'email', title: 'Email' },
    { 
      key: 'role', 
      title: 'Rol',
      render: (admin) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          admin.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' :
          admin.role === 'Content Manager' ? 'bg-blue-100 text-blue-800' :
          admin.role === 'Analyst' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {admin.role}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Estado',
      render: (admin) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {admin.status === 'active' ? 'Activo' : 'Suspendido'}
        </span>
      )
    },
    { 
      key: 'lastActive', 
      title: 'Última Actividad',
      render: (admin) => new Date(admin.lastActive).toLocaleDateString('es-ES')
    },
    {
      key: 'actions',
      title: 'Acciones',
      render: (admin) => (
        <div className="flex space-x-2">
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <FaEdit />
          </button>
          <button 
            onClick={() => handleSuspend(admin.id)}
            className={`p-1 ${
              admin.status === 'active' ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'
            }`}
          >
            {admin.status === 'active' ? <FaBan /> : <FaCheckCircle />}
          </button>
          <button 
            onClick={() => handleDelete(admin.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Equipo Administrativo</h3>
          <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <FaUserPlus className="mr-2" />
            Agregar Administrador
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Cargando equipo administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Equipo Administrativo</h3>
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <FaUserPlus className="mr-2" />
          Agregar Administrador
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminList.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.render ? column.render(admin) : admin[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {adminList.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No hay administradores registrados
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeamTable;
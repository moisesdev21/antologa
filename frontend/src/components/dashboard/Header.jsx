// src/components/dashboard/Header.jsx - CORREGIDO
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = ({ sidebarOpen, setSidebarOpen, title }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Botón para toggle sidebar en móvil */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <FaBars className="text-lg" />
        </button>

        {/* Título de la página */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Iconos de usuario y notificaciones */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
            <FaBell className="text-lg" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-2xl text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
// src/components/dashboard/CategoriesManager.jsx
import { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Tag
} from 'lucide-react';

const CategoriesManager = ({ categories = [], experiences = [], loading, onRefresh, onCreateCategory, onUpdateCategory, onDeleteCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form según tu modelo Category de Prisma
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Filtrar categorías reales
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => 
      cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Contar experiencias por categoría
  const getExperiencesCount = (categoryId) => {
    return experiences.filter(exp => exp.categoryId === categoryId).length;
  };

  // Funciones REALES
  const handleCreateCategory = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || ''
    });
    setShowForm(true);
  };

  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        await onUpdateCategory(editingCategory.id, categoryForm);
      } else {
        await onCreateCategory(categoryForm);
      }
      setShowForm(false);
      setEditingCategory(null);
      onRefresh();
    } catch (error) {
      console.error('Error guardando categoría:', error);
      alert('Error al guardar la categoría');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const experiencesCount = getExperiencesCount(categoryId);
    if (experiencesCount > 0) {
      alert(`No puedes eliminar esta categoría porque tiene ${experiencesCount} experiencia(s) asociada(s).`);
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      try {
        await onDeleteCategory(categoryId);
        onRefresh();
      } catch (error) {
        console.error('Error eliminando categoría:', error);
        alert('Error al eliminar la categoría');
      }
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Categorías</h2>
          <p className="text-gray-600">Administra las categorías para experiencias y destinos</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onRefresh} 
            className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
          <button 
            onClick={handleCreateCategory}
            className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            Nueva Categoría
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Categorías</p>
          <p className="text-xl font-bold text-blue-600">{categories.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Con Experiencias</p>
          <p className="text-xl font-bold text-green-600">
            {categories.filter(cat => getExperiencesCount(cat.id) > 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Sin Experiencias</p>
          <p className="text-xl font-bold text-yellow-600">
            {categories.filter(cat => getExperiencesCount(cat.id) === 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Experiencias Totales</p>
          <p className="text-xl font-bold text-purple-600">{experiences.length}</p>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Categoría *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Aventura, Cultural, Gastronomía..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe esta categoría..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={loading || !categoryForm.name}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {loading ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Búsqueda */}
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="text-sm text-gray-600">
            {filteredCategories.length} categoría{filteredCategories.length !== 1 ? 's' : ''} encontrada{filteredCategories.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Tabla de Categorías REALES */}
      <div className="bg-white rounded-lg shadow overflow-hidden w-full">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-2">Cargando categorías...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No se encontraron categorías</p>
            <button 
              onClick={handleCreateCategory}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Crear primera categoría
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experiencias
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Creación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => {
                  const expCount = getExperiencesCount(category.id);
                  return (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Tag className="h-5 w-5 text-gray-400 mr-3" />
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {category.description || 'Sin descripción'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          expCount > 0 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {expCount} experiencia{expCount !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {category.createdAt 
                          ? new Date(category.createdAt).toLocaleDateString('es-ES')
                          : 'N/A'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                            disabled={expCount > 0}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesManager;
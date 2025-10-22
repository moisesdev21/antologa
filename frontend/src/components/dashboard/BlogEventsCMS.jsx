// src/components/dashboard/BlogEventsCMS.jsx
import { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Tag,
  Save,
  X
} from 'lucide-react';

const BlogEventsCMS = ({ articles = [], loading, onRefresh, onCreateArticle, onUpdateArticle, onDeleteArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingArticle, setEditingArticle] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // Estado para nuevo artículo según tu modelo Prisma
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    category: 'Noticias de Panamá',
    tags: '',
    status: 'draft',
    publishDate: ''
  });

  // Categorías basadas en tu modelo
  const categories = ['Noticias de Panamá', 'Eventos del Día', 'Guías de Viaje', 'Promociones'];

  // Filtrar artículos reales
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.tags?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      const matchesStatus = !statusFilter || article.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [articles, searchTerm, selectedCategory, statusFilter]);

  // Funciones REALES con tu API
  const handleCreateArticle = () => {
    setArticleForm({
      title: '',
      content: '',
      category: 'Noticias de Panamá',
      tags: '',
      status: 'draft',
      publishDate: ''
    });
    setEditingArticle(null);
    setShowEditor(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setArticleForm({
      title: article.title,
      content: article.content,
      category: article.category || 'Noticias de Panamá',
      tags: article.tags || '',
      status: article.status || 'draft',
      publishDate: article.publishDate ? article.publishDate.split('T')[0] : ''
    });
    setShowEditor(true);
  };

  const handleSaveArticle = async () => {
    try {
      const articleData = {
        title: articleForm.title,
        content: articleForm.content,
        category: articleForm.category,
        tags: articleForm.tags,
        status: articleForm.status,
        publishDate: articleForm.publishDate || null
      };

      if (editingArticle) {
        await onUpdateArticle(editingArticle.id, articleData);
      } else {
        await onCreateArticle(articleData);
      }

      setShowEditor(false);
      setEditingArticle(null);
      onRefresh(); // Actualizar la lista
    } catch (error) {
      console.error('Error guardando artículo:', error);
      alert('Error al guardar el artículo');
    }
  };

  const handleDeleteArticle = async (articleId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      try {
        await onDeleteArticle(articleId);
        onRefresh();
      } catch (error) {
        console.error('Error eliminando artículo:', error);
        alert('Error al eliminar el artículo');
      }
    }
  };

  const handlePublish = async (articleId) => {
    try {
      await onUpdateArticle(articleId, { status: 'published', publishDate: new Date().toISOString() });
      onRefresh();
    } catch (error) {
      console.error('Error publicando artículo:', error);
      alert('Error al publicar el artículo');
    }
  };

  // Estadísticas REALES
  const stats = useMemo(() => {
    const total = articles.length;
    const published = articles.filter(a => a.status === 'published').length;
    const drafts = articles.filter(a => a.status === 'draft').length;
    const scheduled = articles.filter(a => a.status === 'scheduled').length;
    const news = articles.filter(a => a.category === 'Noticias de Panamá').length;
    const events = articles.filter(a => a.category === 'Eventos del Día').length;

    return { total, published, drafts, scheduled, news, events };
  }, [articles]);

  return (
    <div className="space-y-6 w-full">
      {/* Header y estadísticas */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Blog & Eventos CMS</h2>
          <p className="text-gray-600">Sistema de gestión de contenido para noticias y eventos</p>
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
            onClick={handleCreateArticle}
            className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            Nuevo Artículo
          </button>
        </div>
      </div>

      {/* Estadísticas REALES */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Artículos</p>
          <p className="text-xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Publicados</p>
          <p className="text-xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Borradores</p>
          <p className="text-xl font-bold text-yellow-600">{stats.drafts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Programados</p>
          <p className="text-xl font-bold text-purple-600">{stats.scheduled}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Noticias Panamá</p>
          <p className="text-xl font-bold text-red-600">{stats.news}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500">
          <p className="text-sm text-gray-600">Eventos Día</p>
          <p className="text-xl font-bold text-indigo-600">{stats.events}</p>
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                {editingArticle ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
              </h3>
              <button 
                onClick={() => setShowEditor(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ingresa el título del artículo..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      value={articleForm.category}
                      onChange={(e) => setArticleForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      value={articleForm.status}
                      onChange={(e) => setArticleForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="draft">Borrador</option>
                      <option value="published">Publicado</option>
                      <option value="scheduled">Programado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etiquetas (separadas por comas)
                  </label>
                  <input
                    type="text"
                    value={articleForm.tags}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="viaje, panamá, aventura, cultura..."
                  />
                </div>

                {articleForm.status === 'scheduled' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Publicación Programada *
                    </label>
                    <input
                      type="datetime-local"
                      value={articleForm.publishDate}
                      onChange={(e) => setArticleForm(prev => ({ ...prev, publishDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido *
                  </label>
                  <textarea
                    value={articleForm.content}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Escribe el contenido del artículo aquí..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveArticle}
                disabled={loading || !articleForm.title || !articleForm.content}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {loading ? 'Guardando...' : (editingArticle ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar en títulos, contenido o etiquetas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
            <option value="scheduled">Programado</option>
          </select>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredArticles.length} artículo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de Artículos REALES */}
      <div className="bg-white rounded-lg shadow overflow-hidden w-full">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-2">Cargando artículos...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No se encontraron artículos</p>
            <button 
              onClick={handleCreateArticle}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Crear primer artículo
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Etiquetas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Publicación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {article.content?.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.category === 'Noticias de Panamá' 
                          ? 'bg-blue-100 text-blue-800'
                          : article.category === 'Eventos del Día'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {article.tags?.split(',').slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag.trim()}
                          </span>
                        ))}
                        {article.tags?.split(',').length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{article.tags.split(',').length - 3} más
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-800'
                          : article.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {article.status === 'published' ? 'Publicado' : 
                         article.status === 'scheduled' ? 'Programado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.publishDate 
                        ? new Date(article.publishDate).toLocaleDateString('es-ES')
                        : 'No programada'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {article.status === 'draft' && (
                          <button
                            onClick={() => handlePublish(article.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Publicar ahora"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEventsCMS;
// src/components/dashboard/ExperiencesDB.jsx
import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Flag, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Plus,
  BookOpen,
  Tag,
  MessageSquare,
  Save,
  X
} from 'lucide-react';

const ExperiencesDB = ({ 
  experiences = [], 
  articles = [], 
  categories = [], 
  reviews = [], 
  loading, 
  onRefresh,
  onCreateArticle,
  onUpdateArticle,
  onDeleteArticle,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  onApproveReview,
  onRejectReview,
  onDeleteReview
}) => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para Experiences
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [moderationFilter, setModerationFilter] = useState('');
  
  // Estados para Blog
  const [showArticleEditor, setShowArticleEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    category: 'Noticias de Panamá',
    tags: '',
    status: 'draft',
    publishDate: ''
  });

  // Estados para Categorías
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Estados para Reseñas
  const [reviewsFilter, setReviewsFilter] = useState('reported');

  // Tabs del sistema
  const tabs = [
    { id: 'experiences', label: 'Experiencias y Tours', icon: Star, count: experiences.length },
    { id: 'blog', label: 'Blog y Eventos', icon: BookOpen, count: articles.length },
    { id: 'categories', label: 'Categorías y Etiquetas', icon: Tag, count: categories.length },
    { id: 'reviews', label: 'Moderación de Reseñas', icon: MessageSquare, count: reviews.filter(r => !r.moderated || r.reported).length }
  ];

  // ========== FILTRADO DE DATOS ==========

  // Experiences
  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      const matchesSearch = exp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exp.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || exp.category?.name === selectedType;
      const matchesCity = !selectedCity || exp.location === selectedCity;
      const matchesModeration = !moderationFilter || exp.moderationStatus === moderationFilter;

      return matchesSearch && matchesType && matchesCity && matchesModeration;
    });
  }, [experiences, searchTerm, selectedType, selectedCity, moderationFilter]);

  // Articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => 
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  // Categories
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => 
      cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = reviewsFilter === 'all' || 
                           (reviewsFilter === 'reported' && review.reported) ||
                           (reviewsFilter === 'pending' && !review.moderated);

      return matchesSearch && matchesFilter;
    });
  }, [reviews, searchTerm, reviewsFilter]);

  // ========== FUNCIONES DE EXPERIENCES ==========

  const handlePromoteExperience = (experienceId) => {
    console.log('Promocionar experiencia:', experienceId);
  };

  const handleApproveExperience = (experienceId) => {
    console.log('Aprobar experiencia:', experienceId);
  };

  const handleRejectExperience = (experienceId) => {
    console.log('Rechazar experiencia:', experienceId);
  };

  // ========== FUNCIONES DE BLOG ==========

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
    setShowArticleEditor(true);
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
    setShowArticleEditor(true);
  };

  const handleSaveArticle = async () => {
    try {
      if (editingArticle) {
        await onUpdateArticle(editingArticle.id, articleForm);
      } else {
        await onCreateArticle(articleForm);
      }
      setShowArticleEditor(false);
      onRefresh();
    } catch (error) {
      console.error('Error guardando artículo:', error);
    }
  };

  // ========== FUNCIONES DE CATEGORÍAS ==========

  const handleCreateCategory = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || ''
    });
    setShowCategoryForm(true);
  };

  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        await onUpdateCategory(editingCategory.id, categoryForm);
      } else {
        await onCreateCategory(categoryForm);
      }
      setShowCategoryForm(false);
      onRefresh();
    } catch (error) {
      console.error('Error guardando categoría:', error);
    }
  };

  // ========== ESTADÍSTICAS ==========

  const stats = {
    experiences: {
      total: experiences.length,
      approved: experiences.filter(exp => exp.moderationStatus === 'Aprobado').length,
      pending: experiences.filter(exp => exp.moderationStatus === 'Pendiente').length,
      reported: experiences.filter(exp => exp.moderationStatus === 'Reportado').length
    },
    blog: {
      total: articles.length,
      published: articles.filter(a => a.status === 'published').length,
      drafts: articles.filter(a => a.status === 'draft').length,
      news: articles.filter(a => a.category === 'Noticias de Panamá').length,
      events: articles.filter(a => a.category === 'Eventos del Día').length
    },
    categories: {
      total: categories.length,
      withExperiences: categories.filter(cat => 
        experiences.some(exp => exp.categoryId === cat.id)
      ).length
    },
    reviews: {
      total: reviews.length,
      reported: reviews.filter(r => r.reported).length,
      pending: reviews.filter(r => !r.moderated).length
    }
  };

  // ========== RENDERIZADO ==========

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">EXPERIENCES DB</h2>
          <p className="text-gray-600">Gestión completa del catálogo de tours, actividades, contenido y moderación</p>
        </div>
        <button 
          onClick={onRefresh} 
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {/* Pestañas */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                  <span className={`
                    ml-2 py-0.5 px-2 rounded-full text-xs
                    ${activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Contenido de las pestañas */}
        <div className="p-6">
          {/* === PESTAÑA: EXPERIENCIAS === */}
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar experiencias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos los tipos</option>
                  {[...new Set(experiences.map(exp => exp.category?.name).filter(Boolean))].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas las ciudades</option>
                  {[...new Set(experiences.map(exp => exp.location).filter(Boolean))].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>

                <select
                  value={moderationFilter}
                  onChange={(e) => setModerationFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="Pendiente">En revisión</option>
                  <option value="Reportado">Reportadas</option>
                  <option value="Aprobado">Aprobadas</option>
                </select>
              </div>

              {/* Lista de Experiences */}
              <div className="space-y-4">
                {filteredExperiences.map(experience => (
                  <div key={experience.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{experience.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{experience.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{experience.category?.name}</span>
                          <span>{experience.location}</span>
                          <span>${experience.price}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            experience.moderationStatus === 'Aprobado' ? 'bg-green-100 text-green-800' :
                            experience.moderationStatus === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {experience.moderationStatus}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button onClick={() => handlePromoteExperience(experience.id)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded">
                          <Star className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleApproveExperience(experience.id)} className="p-2 text-green-600 hover:bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === PESTAÑA: BLOG Y EVENTOS === */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar en artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button 
                  onClick={handleCreateArticle}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Nuevo Artículo
                </button>
              </div>

              {/* Lista de Artículos */}
              <div className="space-y-4">
                {filteredArticles.map(article => (
                  <div key={article.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{article.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{article.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{article.category}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            article.status === 'published' ? 'bg-green-100 text-green-800' :
                            article.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {article.status === 'published' ? 'Publicado' : 
                             article.status === 'scheduled' ? 'Programado' : 'Borrador'}
                          </span>
                          {article.tags && (
                            <span className="text-blue-600">{article.tags.split(',').slice(0, 2).join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button 
                          onClick={() => handleEditArticle(article)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === PESTAÑA: CATEGORÍAS === */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar categorías..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button 
                  onClick={handleCreateCategory}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Nueva Categoría
                </button>
              </div>

              {/* Lista de Categorías */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.map(category => {
                  const expCount = experiences.filter(exp => exp.categoryId === category.id).length;
                  return (
                    <div key={category.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{expCount} experiencias</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleEditCategory(category)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* === PESTAÑA: MODERACIÓN DE RESEÑAS === */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar en reseñas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select
                  value={reviewsFilter}
                  onChange={(e) => setReviewsFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="reported">Reportadas</option>
                  <option value="pending">Pendientes</option>
                  <option value="all">Todas</option>
                </select>
              </div>

              {/* Lista de Reseñas */}
              <div className="space-y-4">
                {filteredReviews.map(review => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">por {review.user?.name}</span>
                        </div>
                        <p className="text-gray-800">{review.comment}</p>
                        {review.reported && (
                          <div className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded text-sm inline-flex items-center gap-1">
                            <Flag className="h-3 w-3" />
                            Reportada
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button 
                          onClick={() => onApproveReview(review.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => onRejectReview(review.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales para Blog y Categorías */}
      {showArticleEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                {editingArticle ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
              </h3>
              <button onClick={() => setShowArticleEditor(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Título del artículo"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Contenido del artículo"
                  value={articleForm.content}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <div className="flex gap-4">
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, category: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Noticias de Panamá">Noticias de Panamá</option>
                    <option value="Eventos del Día">Eventos del Día</option>
                  </select>
                  <select
                    value={articleForm.status}
                    onChange={(e) => setArticleForm(prev => ({ ...prev, status: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowArticleEditor(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Cancelar
                  </button>
                  <button onClick={handleSaveArticle} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button onClick={() => setShowCategoryForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre de la categoría"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Descripción"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowCategoryForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Cancelar
                  </button>
                  <button onClick={handleSaveCategory} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencesDB;
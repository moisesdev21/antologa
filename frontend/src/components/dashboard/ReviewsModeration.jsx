// src/components/dashboard/ReviewsModeration.jsx
import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  MessageCircle,
  AlertTriangle,
  Eye,
  Trash2
} from 'lucide-react';

const ReviewsModeration = ({ reviews = [], loading, onRefresh, onApproveReview, onRejectReview, onDeleteReview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('reported'); // 'reported', 'pending', 'all'
  const [selectedType, setSelectedType] = useState(''); // 'destination', 'experience', 'business'

  // Filtrar reseñas reportadas/sospechosas
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'reported' && review.reported) ||
                           (statusFilter === 'pending' && review.moderated === false);
      
      const matchesType = !selectedType || 
                         (selectedType === 'destination' && review.destinationId) ||
                         (selectedType === 'experience' && review.experienceId) ||
                         (selectedType === 'business' && review.businessId);

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [reviews, searchTerm, statusFilter, selectedType]);

  // Funciones REALES de moderación
  const handleApprove = async (reviewId) => {
    try {
      await onApproveReview(reviewId);
      onRefresh();
    } catch (error) {
      console.error('Error aprobando reseña:', error);
      alert('Error al aprobar la reseña');
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await onRejectReview(reviewId);
      onRefresh();
    } catch (error) {
      console.error('Error rechazando reseña:', error);
      alert('Error al rechazar la reseña');
    }
  };

  const handleDelete = async (reviewId) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña permanentemente?')) {
      try {
        await onDeleteReview(reviewId);
        onRefresh();
      } catch (error) {
        console.error('Error eliminando reseña:', error);
        alert('Error al eliminar la reseña');
      }
    }
  };

  // Estadísticas REALES
  const stats = useMemo(() => {
    const total = reviews.length;
    const reported = reviews.filter(r => r.reported).length;
    const pending = reviews.filter(r => !r.moderated).length;
    const approved = reviews.filter(r => r.moderated && !r.rejected).length;
    const rejected = reviews.filter(r => r.rejected).length;

    return { total, reported, pending, approved, rejected };
  }, [reviews]);

  // Obtener tipo de reseña
  const getReviewType = (review) => {
    if (review.destinationId) return 'Destino';
    if (review.experienceId) return 'Experiencia';
    if (review.businessId) return 'Negocio';
    return 'General';
  };

  // Obtener nombre del objetivo
  const getTargetName = (review) => {
    return review.destination?.name || 
           review.experience?.name || 
           review.business?.businessName || 
           'Objeto eliminado';
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Moderación de Reseñas</h2>
          <p className="text-gray-600">Gestiona reseñas reportadas y contenido inapropiado</p>
        </div>
        <button 
          onClick={onRefresh} 
          className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-500">
          <p className="text-sm text-gray-600">Total Reseñas</p>
          <p className="text-xl font-bold text-gray-600">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Reportadas</p>
          <p className="text-xl font-bold text-red-600">{stats.reported}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Pendientes</p>
          <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Aprobadas</p>
          <p className="text-xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-sm text-gray-600">Rechazadas</p>
          <p className="text-xl font-bold text-orange-600">{stats.rejected}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar en reseñas o usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="reported">Reportadas</option>
            <option value="pending">Pendientes de Moderación</option>
            <option value="all">Todas las Reseñas</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los tipos</option>
            <option value="destination">Destinos</option>
            <option value="experience">Experiencias</option>
            <option value="business">Negocios</option>
          </select>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredReviews.length} reseña{filteredReviews.length !== 1 ? 's' : ''} para moderar
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Reseñas para Moderar */}
      <div className="space-y-4 w-full">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-2">Cargando reseñas...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">No hay reseñas pendientes de moderación</p>
            <p className="text-sm text-gray-500 mt-1">Todas las reseñas están revisadas y aprobadas</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Información de la reseña */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {getTargetName(review)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getReviewType(review)} • Por {review.user?.name || 'Usuario'} • 
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString('es-ES') : 'Fecha no disponible'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className={`flex items-center px-2 py-1 rounded text-xs font-medium ${
                        review.reported 
                          ? 'bg-red-100 text-red-800' 
                          : !review.moderated
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {review.reported && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {review.reported ? 'Reportada' : !review.moderated ? 'Pendiente' : 'Moderada'}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                  </div>

                  {/* Comentario */}
                  <div className="mb-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {review.comment || 'Sin comentario'}
                    </p>
                  </div>

                  {/* Razones de reporte (si está reportada) */}
                  {review.reported && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <div className="flex items-center text-red-800 text-sm font-medium mb-1">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Razones de reporte:
                      </div>
                      <p className="text-red-700 text-sm">
                        {review.reportReasons?.join(', ') || 'Contenido inapropiado o spam'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Acciones de moderación */}
                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    title="Aprobar reseña"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    title="Rechazar reseña"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Rechazar
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex items-center justify-center px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    title="Eliminar permanentemente"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsModeration;
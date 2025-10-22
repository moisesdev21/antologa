// src/hooks/useDashboardData.js - COMPLETO Y CORREGIDO
import { useState, useEffect } from 'react';
import axios from 'axios';

const useDashboardData = () => {
  const [data, setData] = useState({
    users: [],
    businesses: [],
    destinations: [],
    experiences: [],
    payments: [],
    articles: [],
    categories: [],
    reviews: [],
    admins: [],
    activityLogs: [],
    trafficData: {}, // Cambiado para guardar todo el objeto traffic
    loading: true,
    errors: {}
  });

  const fetchDashboardData = async () => {
    setData(prev => ({ ...prev, loading: true, errors: {} }));
    const results = {};
    const errors = {};

    const endpoints = {
      users: 'http://localhost:4000/api/auth/users',
      businesses: 'http://localhost:4000/api/auth/businesses',
      destinations: 'http://localhost:4000/api/auth/destinations',
      experiences: 'http://localhost:4000/api/auth/experiences',
      payments: 'http://localhost:4000/api/auth/payments',
      articles: 'http://localhost:4000/api/auth/articles',
      categories: 'http://localhost:4000/api/auth/categories',
      reviews: 'http://localhost:4000/api/auth/reviews',
      admins: 'http://localhost:4000/api/auth/admins',
      activityLogs: 'http://localhost:4000/api/auth/admin-activities',
      traffic: 'http://localhost:4000/api/auth/traffic'
    };

    const fetchData = async (key, url, fallback = []) => {
      try {
        console.log(`🔍 Fetching ${key}...`);
        const res = await axios.get(url);
        console.log(`✅ ${key} data received`);
        results[key] = res.data;
      } catch (err) {
        console.error(`❌ Error ${key}:`, err.response?.data || err.message);
        results[key] = fallback;
        errors[key] = `Error al cargar ${key}`;
      }
    };

    await Promise.all([
      fetchData('users', endpoints.users),
      fetchData('businesses', endpoints.businesses),
      fetchData('destinations', endpoints.destinations),
      fetchData('experiences', endpoints.experiences),
      fetchData('payments', endpoints.payments),
      fetchData('articles', endpoints.articles),
      fetchData('categories', endpoints.categories),
      fetchData('reviews', endpoints.reviews),
      fetchData('admins', endpoints.admins),
      fetchData('activityLogs', endpoints.activityLogs),
      fetchData('traffic', endpoints.traffic, {})
    ]);

    // IMPORTANTE: Guardamos todo el objeto traffic
    results.trafficData = results.traffic || {};

    console.log('📊 Traffic data completo:', results.trafficData);

    setData({ ...results, loading: false, errors });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Funciones para CRUD de artículos
  const createArticle = async (articleData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/articles', articleData);
      return response.data;
    } catch (error) {
      throw new Error('Error creando artículo: ' + error.message);
    }
  };

  const updateArticle = async (id, articleData) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/auth/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      throw new Error('Error actualizando artículo: ' + error.message);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/articles/${id}`);
    } catch (error) {
      throw new Error('Error eliminando artículo: ' + error.message);
    }
  };

  // Funciones para CRUD de categorías
  const createCategory = async (categoryData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/categories', categoryData);
      return response.data;
    } catch (error) {
      throw new Error('Error creando categoría: ' + error.message);
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/auth/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw new Error('Error actualizando categoría: ' + error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/categories/${id}`);
    } catch (error) {
      throw new Error('Error eliminando categoría: ' + error.message);
    }
  };

  // Funciones para moderación de reseñas
  const approveReview = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/auth/reviews/${id}/approve`);
      return response.data;
    } catch (error) {
      throw new Error('Error aprobando reseña: ' + error.message);
    }
  };

  const rejectReview = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/auth/reviews/${id}/reject`);
      return response.data;
    } catch (error) {
      throw new Error('Error rechazando reseña: ' + error.message);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/reviews/${id}`);
    } catch (error) {
      throw new Error('Error eliminando reseña: ' + error.message);
    }
  };

  // Métricas derivadas
  const groupByMonth = (items, dateKey) => {
    const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const grouped = {};
    items.forEach(item => {
      const date = new Date(item[dateKey]);
      const month = months[date.getMonth()];
      grouped[month] = (grouped[month] || 0) + 1;
    });
    return Object.keys(grouped).map(month => ({ month, count: grouped[month] }));
  };

  const metrics = {
    totalUsers: data.users.length,
    totalBusinesses: data.businesses.length,
    totalDestinations: data.destinations.length,
    totalExperiences: data.experiences.length,
    totalArticles: data.articles.length,
    totalCategories: data.categories.length,
    totalReviews: data.reviews.length,
    totalRevenue: data.payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: data.payments.filter(p => p.status === 'Completed').length,
    
    // Métricas de Blog
    blogStats: {
      published: data.articles.filter(a => a.status === 'published').length,
      drafts: data.articles.filter(a => a.status === 'draft').length,
      scheduled: data.articles.filter(a => a.status === 'scheduled').length,
      news: data.articles.filter(a => a.category === 'Noticias de Panamá').length,
      events: data.articles.filter(a => a.category === 'Eventos del Día').length
    },

    // Métricas de Reseñas
    reviewStats: {
      reported: data.reviews.filter(r => r.reported).length,
      pending: data.reviews.filter(r => !r.moderated).length,
      approved: data.reviews.filter(r => r.moderated && !r.rejected).length,
      rejected: data.reviews.filter(r => r.rejected).length
    },

    // Gráficas
    userGrowth: groupByMonth(data.users, "createdAt").map(u => ({ month: u.month, usuarios: u.count })),
    businessGrowth: groupByMonth(data.businesses, "createdAt").map(b => ({ month: b.month, negocios: b.count })),

    // 🚨 CAMBIO IMPORTANTE: Usamos TODOS los datos de trafficData
    visitsByMonth: data.trafficData.visitsByMonth || [],
    devicesUsage: data.trafficData.devicesUsage || [],
    browsers: data.trafficData.browsers || [],
    operatingSystems: data.trafficData.operatingSystems || [],
    totalVisits: data.trafficData.totalVisits || 0,
    uniqueVisitors: data.trafficData.uniqueVisitors || 0
  };

  return {
    metrics,
    loading: data.loading,
    errors: data.errors,
    users: data.users,
    businesses: data.businesses,
    destinations: data.destinations,
    experiences: data.experiences,
    payments: data.payments,
    articles: data.articles,
    categories: data.categories,
    reviews: data.reviews,
    admins: data.admins,
    activityLogs: data.activityLogs,
    trafficData: data.trafficData,
    refetch: fetchDashboardData,
    // Funciones CRUD
    createArticle,
    updateArticle,
    deleteArticle,
    createCategory,
    updateCategory,
    deleteCategory,
    approveReview,
    rejectReview,
    deleteReview
  };
};

export default useDashboardData;
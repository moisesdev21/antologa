// src/hooks/useDashboardData.js
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
    trafficData: {},
    loading: true,
    errors: {}
  });

  // API base producción
 const API_BASE = 'http://localhost:4000/api';

  const fetchDashboardData = async () => {
    setData(prev => ({ ...prev, loading: true, errors: {} }));
    const results = {};
    const errors = {};

    const endpoints = {
      users: `${API_BASE}/auth/users`,
      businesses: `${API_BASE}/auth/businesses`,
      destinations: `${API_BASE}/auth/destinations`,
      experiences: `${API_BASE}/auth/experiences`,
      blog: `${API_BASE}/auth/blog`,
      payments: `${API_BASE}/auth/payments`,
      articles: `${API_BASE}/auth/articles`,
      categories: `${API_BASE}/auth/categories`,
      reviews: `${API_BASE}/auth/reviews`,
      admins: `${API_BASE}/auth/admins`,
      activityLogs: `${API_BASE}/auth/admin-activities`,
      traffic: `${API_BASE}/auth/traffic`
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
      fetchData('blog', endpoints.blog),
      fetchData('payments', endpoints.payments),
      fetchData('articles', endpoints.articles),
      fetchData('categories', endpoints.categories),
      fetchData('reviews', endpoints.reviews),
      fetchData('admins', endpoints.admins),
      fetchData('activityLogs', endpoints.activityLogs),
      fetchData('traffic', endpoints.traffic, {})
    ]);

    results.trafficData = results.traffic || {};

    setData({ ...results, loading: false, errors });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Funciones CRUD Artículos
  const createArticle = async (articleData) => {
    const res = await axios.post(`${API_BASE}/auth/articles`, articleData);
    return res.data;
  };
  const updateArticle = async (id, articleData) => {
    const res = await axios.put(`${API_BASE}/auth/articles/${id}`, articleData);
    return res.data;
  };
  const deleteArticle = async (id) => {
    await axios.delete(`${API_BASE}/auth/articles/${id}`);
  };

  // Funciones CRUD Categorías
  const createCategory = async (categoryData) => {
    const res = await axios.post(`${API_BASE}/auth/categories`, categoryData);
    return res.data;
  };
  const updateCategory = async (id, categoryData) => {
    const res = await axios.put(`${API_BASE}/auth/categories/${id}`, categoryData);
    return res.data;
  };
  const deleteCategory = async (id) => {
    await axios.delete(`${API_BASE}/auth/categories/${id}`);
  };

  // Funciones para reseñas
  const approveReview = async (id) => {
    const res = await axios.put(`${API_BASE}/auth/reviews/${id}/approve`);
    return res.data;
  };
  const rejectReview = async (id) => {
    const res = await axios.put(`${API_BASE}/auth/reviews/${id}/reject`);
    return res.data;
  };
  const deleteReview = async (id) => {
    await axios.delete(`${API_BASE}/auth/reviews/${id}`);
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
    blogStats: {
      published: data.articles.filter(a => a.status === 'published').length,
      drafts: data.articles.filter(a => a.status === 'draft').length,
      scheduled: data.articles.filter(a => a.status === 'scheduled').length,
      news: data.articles.filter(a => a.category === 'Noticias de Panamá').length,
      events: data.articles.filter(a => a.category === 'Eventos del Día').length
    },
    reviewStats: {
      reported: data.reviews.filter(r => r.reported).length,
      pending: data.reviews.filter(r => !r.moderated).length,
      approved: data.reviews.filter(r => r.moderated && !r.rejected).length,
      rejected: data.reviews.filter(r => r.rejected).length
    },
    userGrowth: groupByMonth(data.users, "createdAt").map(u => ({ month: u.month, usuarios: u.count })),
    businessGrowth: groupByMonth(data.businesses, "createdAt").map(b => ({ month: b.month, negocios: b.count })),
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

// src/services/api.js

// URL base de la API - apunta a tu backend en puerto 4000
const API_BASE_URL = 'http://localhost:4000/api';

// Función genérica para hacer peticiones HTTP
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Servicios específicos para cada endpoint de la API
export const apiService = {
  // Users
  getUsers: () => fetchAPI('/users'),
  
  // Businesses
  getBusinesses: () => fetchAPI('/businesses'),
  
  // Destinations
  getDestinations: () => fetchAPI('/destinations'),
  
  // Experiences
  getExperiences: () => fetchAPI('/experiences'),
  
  // Payments
  getPayments: () => fetchAPI('/payments'),
  
  // Itinerary
  getItineraries: () => fetchAPI('/itinerary'),
  
  // Reviews
  getReviews: () => fetchAPI('/reviews'),
  
  // Articles
  getArticles: () => fetchAPI('/articles'),
  
  // Images
  getImages: () => fetchAPI('/images'),
};

export default apiService;
import apiClient from './apiClient';

export const addFavorite = async (adId) => apiClient.post(`/favorites/${adId}`);
export const removeFavorite = async (adId) => apiClient.delete(`/favorites/${adId}`);

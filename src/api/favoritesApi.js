import apiClient from './apiClient';

export const addFavorite = async (adId) => apiClient.post(`/favorites/${adId}`);
export const removeFavorite = async (adId) => apiClient.delete(`/favorites/${adId}`);

export const getFavorites = async () => {
  try {
    const { data } = await apiClient.get('/favorites');
    return data;
  } catch {
    const { data } = await apiClient.get('/favorites/list');
    return data;
  }
};

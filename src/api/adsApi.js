import apiClient from './apiClient';

export const getAds = async (params = {}) => {
  const { data } = await apiClient.get('/ads', { params });
  return data;
};

export const getAdById = async (id) => {
  const { data } = await apiClient.get(`/ads/${id}`);
  return data;
};

export const editAd = async (id, payload) => {
  const { data } = await apiClient.put(`/ads/${id}/edit`, payload);
  return data;
};

export const deleteAd = async (id) => apiClient.delete(`/ads/${id}`);

export const getMyAds = async () => {
  const { data } = await apiClient.get('/ads/my');
  return data;
};

export const archiveAd = async (id) => apiClient.post(`/ads/${id}/archive`);
export const restoreAd = async (id) => apiClient.post(`/ads/${id}/restore`);

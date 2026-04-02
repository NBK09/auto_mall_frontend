import apiClient from './apiClient';

export const getAds = async (params = {}) => {
  const { data } = await apiClient.get('/ads', { params });
  return data;
};

export const getAdById = async (id) => {
  const { data } = await apiClient.get(`/ads/${id}`);
  return data;
};

export const getAdForEdit = async (id) => {
  const { data } = await apiClient.get(`/ads/${id}/edit`);
  return data;
};

export const createAd = async (payload) => {
  const { data } = await apiClient.post('/ads', payload);
  return data;
};

export const updateAd = async (id, payload) => {
  const { data } = await apiClient.put(`/ads/${id}`, payload);
  return data;
};

export const deleteAd = async (id) => apiClient.delete(`/ads/${id}`);

export const getMyAds = async (status = 'ACTIVE') => {
  const { data } = await apiClient.get('/ads/my', { params: { status } });
  return data;
};

export const archiveAd = async (id) => apiClient.put(`/ads/${id}/archive`);
export const restoreAd = async (id) => apiClient.put(`/ads/${id}/restore`);

import apiClient from './apiClient';

export const getCurrentUser = async () => {
  const { data } = await apiClient.get('/users/me');
  return data;
};

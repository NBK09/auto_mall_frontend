import apiClient from './apiClient';

export const getVehicles = async () => {
  const { data } = await apiClient.get('/vehicles');
  return data;
};

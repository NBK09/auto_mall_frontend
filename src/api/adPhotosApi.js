import apiClient from './apiClient';

export const uploadAdPhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post('/ad-photos/upload', formData);
  return data;
};

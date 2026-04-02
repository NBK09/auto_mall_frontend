import apiClient from './apiClient';

export const uploadAdPhotos = async (files = []) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const { data } = await apiClient.post('/ad-photos/upload', formData);
  if (Array.isArray(data?.photoUrls)) {
    return data.photoUrls;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

export const uploadAdPhoto = async (file) => uploadAdPhotos(file ? [file] : []);

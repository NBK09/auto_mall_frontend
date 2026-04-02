import apiClient from './apiClient';

export const getReferenceFull = async () => (await apiClient.get('/reference/full')).data;
export const getBrands = async () => (await apiClient.get('/reference/brands')).data;
export const getModelsByBrand = async (brandId) => (await apiClient.get(`/reference/brands/${brandId}/models`)).data;
export const getGenerationsByModel = async (modelId) => (await apiClient.get(`/reference/models/${modelId}/generations`)).data;
export const getEnginesByGeneration = async (generationId) => (await apiClient.get(`/reference/generations/${generationId}/engines`)).data;
export const getTransmissions = async () => (await apiClient.get('/reference/transmissions')).data;
export const getDriveTypes = async () => (await apiClient.get('/reference/drive-types')).data;
export const getCities = async () => (await apiClient.get('/reference/cities')).data;

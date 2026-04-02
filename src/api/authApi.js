import apiClient from './apiClient';

export const telegramAuth = async (initData) => {
  const { data } = await apiClient.post('/auth/telegram', { initData });
  return data;
};

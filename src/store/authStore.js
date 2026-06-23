import { create } from 'zustand';
import { getCurrentUser } from '../api/userApi';
import { telegramAuth } from '../api/authApi';

const STORAGE_KEY = 'auto_mall_token';

const isAuthError = (error) => {
  const status = error?.response?.status;
  return status === 401 || status === 403;
};

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem(STORAGE_KEY) || null,
  isAuthenticated: Boolean(localStorage.getItem(STORAGE_KEY)),
  loading: false,
  setToken: (token) => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    set({ token, isAuthenticated: Boolean(token) });
  },
  fetchMe: async () => {
    if (!get().token) {
      return;
    }

    set({ loading: true });
    try {
      const user = await getCurrentUser();
      set({ user });
    } catch (error) {
      if (isAuthError(error)) {
        get().logout();
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  telegramLogin: async (initData) => {
    if (!initData) {
      return;
    }

    try {
      const payload = await telegramAuth(initData);
      if (payload?.token) {
        get().setToken(payload.token);
      }
      if (payload?.user) {
        set({ user: payload.user, isAuthenticated: true });
      }

      if (!payload?.user) {
        await get().fetchMe();
      }
    } catch (error) {
      if (isAuthError(error)) {
        get().logout();
      }
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

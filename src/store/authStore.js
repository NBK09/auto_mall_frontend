import { create } from 'zustand';
import { getCurrentUser } from '../api/userApi';
import { telegramAuth } from '../api/authApi';

const STORAGE_KEY = 'auto_mall_token';

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
    } finally {
      set({ loading: false });
    }
  },
  telegramLogin: async (initData) => {
    if (!initData) {
      return;
    }

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
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

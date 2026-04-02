import { create } from 'zustand';
import { getMyAds } from '../api/adsApi';

export const useFavoritesStore = create((set) => ({
  favorites: [],
  loading: false,
  fetchFavorites: async () => {
    set({ loading: true });
    try {
      const data = await getMyAds();
      set({ favorites: data?.items || data || [] });
    } finally {
      set({ loading: false });
    }
  },
}));

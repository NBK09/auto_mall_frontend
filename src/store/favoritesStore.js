import { create } from 'zustand';
import { addFavorite, getFavorites, removeFavorite } from '../api/favoritesApi';
import { normalizeAdsResponse } from '../utils/normalize';

export const useFavoritesStore = create((set) => ({
  favorites: [],
  loading: false,
  fetchFavorites: async () => {
    set({ loading: true });
    try {
      const data = await getFavorites();
      const { items } = normalizeAdsResponse(data);
      set({ favorites: items.map((ad) => ({ ...ad, isFavorite: true })) });
    } finally {
      set({ loading: false });
    }
  },
  toggleFavorite: async (adId, isFavorite) => {
    if (isFavorite) {
      await removeFavorite(adId);
      set((state) => ({ favorites: state.favorites.filter((ad) => ad.id !== adId) }));
      return;
    }

    await addFavorite(adId);
    set((state) => ({
      favorites: state.favorites.map((ad) => (ad.id === adId ? { ...ad, isFavorite: true } : ad)),
    }));
  },
}));

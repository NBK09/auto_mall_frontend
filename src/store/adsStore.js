import { create } from 'zustand';
import { addFavorite, removeFavorite } from '../api/favoritesApi';
import { getAds } from '../api/adsApi';
import { normalizeAdsResponse } from '../utils/normalize';

const initialFilters = {
  brand: '',
  model: '',
  minPrice: '',
  maxPrice: '',
  city: '',
  search: '',
  category: 'all',
};

export const useAdsStore = create((set, get) => ({
  ads: [],
  loading: false,
  hasMore: true,
  page: 1,
  filters: initialFilters,
  setFilters: (updates) => {
    set((state) => ({ filters: { ...state.filters, ...updates } }));
  },
  resetFilters: () => set({ filters: initialFilters }),
  fetchAds: async ({ reset = false } = {}) => {
    const page = reset ? 1 : get().page;
    set({ loading: true });

    try {
      const data = await getAds({ ...get().filters, page });
      const { items, hasMore } = normalizeAdsResponse(data);
      set((state) => ({
        ads: reset ? items : [...state.ads, ...items],
        hasMore,
        page: page + 1,
      }));
    } finally {
      set({ loading: false });
    }
  },
  toggleFavorite: async (adId, isFavorite) => {
    if (isFavorite) {
      await removeFavorite(adId);
    } else {
      await addFavorite(adId);
    }

    set((state) => ({
      ads: state.ads.map((ad) =>
        ad.id === adId ? { ...ad, isFavorite: !isFavorite } : ad,
      ),
    }));
  },
}));

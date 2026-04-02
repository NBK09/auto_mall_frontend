import { create } from 'zustand';
import { getBrands, getCities, getModelsByBrand } from '../api/referenceApi';

export const useReferenceStore = create((set) => ({
  brands: [],
  models: [],
  cities: [],
  loading: false,
  fetchBaseReference: async () => {
    set({ loading: true });
    try {
      const [brands, cities] = await Promise.all([getBrands(), getCities()]);
      set({ brands, cities });
    } finally {
      set({ loading: false });
    }
  },
  fetchModels: async (brandId) => {
    if (!brandId) {
      set({ models: [] });
      return;
    }

    const models = await getModelsByBrand(brandId);
    set({ models });
  },
}));

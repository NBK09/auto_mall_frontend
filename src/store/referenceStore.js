import { create } from 'zustand';
import {
  getBrands,
  getCities,
  getDriveTypes,
  getEnginesByGeneration,
  getGenerationsByModel,
  getModelsByBrand,
  getTransmissions,
} from '../api/referenceApi';

export const useReferenceStore = create((set) => ({
  brands: [],
  models: [],
  generations: [],
  engines: [],
  cities: [],
  transmissions: [],
  driveTypes: [],
  loading: false,
  fetchBaseReference: async () => {
    set({ loading: true });
    try {
      const [brands, cities, transmissions, driveTypes] = await Promise.all([
        getBrands(),
        getCities(),
        getTransmissions(),
        getDriveTypes(),
      ]);
      set({ brands, cities, transmissions, driveTypes });
    } finally {
      set({ loading: false });
    }
  },
  fetchModels: async (brandId) => {
    if (!brandId) {
      set({ models: [], generations: [], engines: [] });
      return;
    }

    const models = await getModelsByBrand(brandId);
    set({ models, generations: [], engines: [] });
  },
  fetchGenerations: async (modelId) => {
    if (!modelId) {
      set({ generations: [], engines: [] });
      return;
    }

    const generations = await getGenerationsByModel(modelId);
    set({ generations, engines: [] });
  },
  fetchEngines: async (generationId) => {
    if (!generationId) {
      set({ engines: [] });
      return;
    }

    const engines = await getEnginesByGeneration(generationId);
    set({ engines });
  },
}));

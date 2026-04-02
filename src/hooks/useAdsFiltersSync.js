import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdsStore } from '../store/adsStore';

const useAdsFiltersSync = () => {
  const [params, setParams] = useSearchParams();
  const filters = useAdsStore((state) => state.filters);
  const setFilters = useAdsStore((state) => state.setFilters);

  useEffect(() => {
    const fromQuery = {
      brand: params.get('brand') || '',
      model: params.get('model') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      city: params.get('city') || '',
      search: params.get('search') || '',
      category: params.get('category') || 'all',
    };
    setFilters(fromQuery);
  }, [params, setFilters]);

  useEffect(() => {
    const next = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    setParams(next, { replace: true });
  }, [filters, setParams]);
};

export default useAdsFiltersSync;

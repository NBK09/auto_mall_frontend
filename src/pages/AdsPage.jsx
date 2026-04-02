import { useCallback, useEffect, useState } from 'react';
import AdCard from '../components/AdCard';
import CategoryTabs from '../components/CategoryTabs';
import FilterModal from '../components/FilterModal';
import SearchBar from '../components/SearchBar';
import useAdsFiltersSync from '../hooks/useAdsFiltersSync';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { useAdsStore } from '../store/adsStore';
import { useReferenceStore } from '../store/referenceStore';
import styles from './AdsPage.module.css';

function AdsPage() {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { ads, loading, filters, hasMore, fetchAds, setFilters, toggleFavorite } = useAdsStore();
  const { fetchBaseReference, fetchModels } = useReferenceStore();

  useAdsFiltersSync();

  useEffect(() => {
    fetchBaseReference();
  }, [fetchBaseReference]);

  useEffect(() => {
    fetchModels(filters.brand);
  }, [fetchModels, filters.brand]);

  useEffect(() => {
    fetchAds({ reset: true });
  }, [fetchAds, filters]);

  const handleLoadMore = useCallback(() => {
    fetchAds();
  }, [fetchAds]);

  const loadMoreRef = useInfiniteScroll({ onLoadMore: handleLoadMore, hasMore, loading });

  return (
    <section>
      <SearchBar value={filters.search} onChange={(value) => setFilters({ search: value })} onOpenFilters={() => setFilterOpen(true)} />
      <CategoryTabs active={filters.category} onChange={(value) => setFilters({ category: value })} />
      <div className={styles.list}>
        {ads.map((ad) => <AdCard key={ad.id} ad={ad} onToggleFavorite={toggleFavorite} />)}
      </div>
      {loading && <p className={styles.state}>Загрузка...</p>}
      {!loading && !ads.length && <p className={styles.state}>Нет объявлений</p>}
      <div ref={loadMoreRef} className={styles.sentinel} />
      <FilterModal open={isFilterOpen} filters={filters} onChange={setFilters} onClose={() => setFilterOpen(false)} />
    </section>
  );
}

export default AdsPage;

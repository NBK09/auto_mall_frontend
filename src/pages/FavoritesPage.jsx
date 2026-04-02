import { useEffect } from 'react';
import AdCard from '../components/AdCard';
import { useAdsStore } from '../store/adsStore';
import { useFavoritesStore } from '../store/favoritesStore';

function FavoritesPage() {
  const { favorites, fetchFavorites, loading } = useFavoritesStore();
  const toggleFavorite = useAdsStore((state) => state.toggleFavorite);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <section>
      <h2>Избранное</h2>
      {favorites.map((ad) => <AdCard key={ad.id} ad={ad} onToggleFavorite={toggleFavorite} />)}
    </section>
  );
}

export default FavoritesPage;

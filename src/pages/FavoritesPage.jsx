import { useEffect } from 'react';
import AdCard from '../components/AdCard';
import styles from './AdsPage.module.css';
import { useFavoritesStore } from '../store/favoritesStore';

function FavoritesPage() {
  const { favorites, fetchFavorites, loading, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (loading) {
    return <p className={styles.state}>Загрузка...</p>;
  }

  return (
    <section>
      <h2>Избранное</h2>
      <div className={styles.list}>
        {favorites.map((ad) => <AdCard key={ad.id} ad={ad} onToggleFavorite={toggleFavorite} />)}
      </div>
      {!favorites.length && <p className={styles.state}>У вас пока нет избранных автомобилей.</p>}
    </section>
  );
}

export default FavoritesPage;

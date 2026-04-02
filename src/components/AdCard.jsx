import { Link } from 'react-router-dom';
import styles from './AdCard.module.css';

function AdCard({ ad, onToggleFavorite }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.badge}>{ad.year || 'Новинка'}</span>
        <button type="button" className={styles.favorite} onClick={() => onToggleFavorite(ad.id, ad.isFavorite)}>
          {ad.isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <h3 className={styles.title}>{ad.title}</h3>
      <p className={styles.meta}>{ad.city} · {ad.fuelType || 'Бензин'}</p>
      <p className={styles.price}>{Number(ad.price || 0).toLocaleString('ru-RU')} ₽</p>
      <Link className={styles.link} to={`/ads/${ad.id}`}>Подробнее ↗</Link>
    </article>
  );
}

export default AdCard;

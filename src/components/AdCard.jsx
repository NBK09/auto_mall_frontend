import { Link } from 'react-router-dom';
import { getAdPrimaryPhoto, mapAdEntity } from '../utils/normalize';
import styles from './AdCard.module.css';

function AdCard({ ad, onToggleFavorite }) {
  const normalizedAd = mapAdEntity(ad);
  const photo = getAdPrimaryPhoto(normalizedAd);
  const vehicleName = [normalizedAd.brandName, normalizedAd.modelName].filter(Boolean).join(' ');

  return (
    <article className={styles.card}>
      <div className={styles.photoWrap}>
        {photo ? (
          <img className={styles.photo} src={photo} alt={vehicleName || normalizedAd.title || 'Фото автомобиля'} loading="lazy" />
        ) : (
          <div className={styles.photoFallback}>Нет фото</div>
        )}
        <div className={styles.top}>
          <span className={styles.badge}>{normalizedAd.year || 'Новинка'}</span>
          {onToggleFavorite && (
            <button type="button" className={styles.favorite} onClick={() => onToggleFavorite(normalizedAd.id, normalizedAd.isFavorite)}>
              {normalizedAd.isFavorite ? '♥' : '♡'}
            </button>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{normalizedAd.title}</h3>
        <p className={styles.vehicleInfo}>{vehicleName || 'Марка и модель не указаны'}</p>
        <p className={styles.meta}>{normalizedAd.city} · {normalizedAd.fuelType || 'Бензин'}</p>
        <p className={styles.price}>{Number(normalizedAd.price || 0).toLocaleString('ru-RU')} ₽</p>
        <Link className={styles.link} to={`/ads/${normalizedAd.id}`}>Подробнее ↗</Link>
      </div>
    </article>
  );
}

export default AdCard;

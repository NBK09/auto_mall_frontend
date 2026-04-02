import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdById } from '../api/adsApi';
import { addFavorite, removeFavorite } from '../api/favoritesApi';
import { mapAdEntity } from '../utils/normalize';

const telegramLink = (seller) => {
  if (!seller) return null;
  if (seller.telegramUsername) return `https://t.me/${seller.telegramUsername}`;
  if (seller.telegramUserId) return `tg://user?id=${seller.telegramUserId}`;
  return null;
};

function AdDetailsPage() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    getAdById(id).then((payload) => setAd(mapAdEntity(payload)));
  }, [id]);

  if (!ad) {
    return <p>Загрузка...</p>;
  }

  const tgLink = telegramLink(ad.seller);

  const toggleFavorite = async () => {
    if (ad.isFavorite) {
      await removeFavorite(ad.id);
    } else {
      await addFavorite(ad.id);
    }
    setAd((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  return (
    <section>
      <h2>{ad.title}</h2>
      {!!ad.photos?.[0] && <img src={ad.photos[0]} alt={ad.title} style={{ width: '100%', borderRadius: 12 }} />}
      <p>{ad.description}</p>
      <p>{Number(ad.price || 0).toLocaleString('ru-RU')} {ad.currency || 'KZT'}</p>
      <p>{ad.city} · {ad.mileage} км · {ad.year}</p>
      <button type="button" onClick={toggleFavorite}>{ad.isFavorite ? 'Убрать из избранного' : 'В избранное'}</button>
      <button type="button" disabled={!tgLink} onClick={() => window.open(tgLink, '_blank')}>Написать продавцу</button>
    </section>
  );
}

export default AdDetailsPage;

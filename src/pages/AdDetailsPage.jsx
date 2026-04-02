import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdById } from '../api/adsApi';

function AdDetailsPage() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    getAdById(id).then(setAd);
  }, [id]);

  if (!ad) {
    return <p>Загрузка...</p>;
  }

  return (
    <section>
      <h2>{ad.title}</h2>
      <p>{ad.description}</p>
      <p>{Number(ad.price || 0).toLocaleString('ru-RU')} ₽</p>
    </section>
  );
}

export default AdDetailsPage;

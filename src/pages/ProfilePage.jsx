import { useEffect, useState } from 'react';
import AdCard from '../components/AdCard';
import { editAd, getMyAds } from '../api/adsApi';
import { mapAdEntity, normalizeAdsResponse } from '../utils/normalize';
import { useAuthStore } from '../store/authStore';
import styles from './ProfilePage.module.css';

const defaultForm = {
  title: '',
  description: '',
  price: '',
};

function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadMyAds = async () => {
      setLoading(true);
      try {
        const payload = await getMyAds();
        const { items } = normalizeAdsResponse(payload);
        setMyAds(items);
      } finally {
        setLoading(false);
      }
    };

    loadMyAds();
  }, []);

  const startEdit = (ad) => {
    const normalized = mapAdEntity(ad);
    setEditingId(normalized.id);
    setForm({
      title: normalized.title || '',
      description: normalized.description || '',
      price: normalized.price || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  const saveEdit = async () => {
    if (!editingId) {
      return;
    }

    setSaving(true);
    try {
      const updated = await editAd(editingId, {
        title: form.title,
        description: form.description,
        price: Number(form.price || 0),
      });
      const normalizedUpdated = mapAdEntity(updated);
      setMyAds((prev) => prev.map((ad) => (ad.id === editingId ? { ...ad, ...normalizedUpdated } : ad)));
      cancelEdit();
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <div className={styles.header}>
        <div>
          <h2>Профиль</h2>
          <p className={styles.name}>{user?.first_name || 'Гость'}</p>
        </div>
        <button type="button" className={styles.logout} onClick={logout}>Выйти</button>
      </div>

      <h3 className={styles.sectionTitle}>Мои объявления</h3>
      {loading && <p className={styles.state}>Загрузка объявлений...</p>}
      {!loading && !myAds.length && <p className={styles.state}>Вы ещё не разместили ни одного объявления.</p>}

      <div className={styles.list}>
        {myAds.map((ad) => (
          <div key={ad.id}>
            <AdCard ad={ad} />
            <button type="button" className={styles.secondary} onClick={() => startEdit(ad)}>Редактировать</button>
          </div>
        ))}
      </div>

      {editingId && (
        <div className={styles.editCard}>
          <h4>Редактирование объявления</h4>
          <label className={styles.row}>
            Заголовок
            <input
              className={styles.input}
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>

          <label className={styles.row}>
            Цена
            <input
              className={styles.input}
              type="number"
              value={form.price}
              onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
            />
          </label>

          <label className={styles.row}>
            Описание
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={saveEdit} disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button type="button" className={styles.secondary} onClick={cancelEdit}>Отмена</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProfilePage;

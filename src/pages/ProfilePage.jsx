import { useEffect, useState } from 'react';
import AdCard from '../components/AdCard';
import {
  archiveAd,
  getAdForEdit,
  getMyAds,
  restoreAd,
  updateAd,
} from '../api/adsApi';
import { normalizeAdsResponse } from '../utils/normalize';
import { useAuthStore } from '../store/authStore';
import styles from './ProfilePage.module.css';

const defaultForm = {
  engineId: '',
  transmissionId: '',
  driveTypeId: '',
  cityId: '',
  year: '',
  mileage: '',
  color: '',
  vin: '',
  price: '',
  description: '',
};

function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [myAds, setMyAds] = useState([]);
  const [status, setStatus] = useState('ACTIVE');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const loadMyAds = async () => {
    setLoading(true);
    try {
      const payload = await getMyAds(status);
      const { items } = normalizeAdsResponse(payload);
      setMyAds(items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyAds();
  }, [status]);

  const startEdit = async (adId) => {
    const ad = await getAdForEdit(adId);
    setEditingId(adId);
    setForm({
      engineId: ad.engineId || '',
      transmissionId: ad.transmissionId || '',
      driveTypeId: ad.driveTypeId || '',
      cityId: ad.cityId || '',
      year: ad.year || '',
      mileage: ad.mileage || '',
      color: ad.color || '',
      vin: ad.vin || '',
      price: ad.price || '',
      description: ad.description || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(defaultForm);
  };

  const saveEdit = async () => {
    if (!editingId) return;

    setSaving(true);
    try {
      await updateAd(editingId, {
        engineId: Number(form.engineId),
        transmissionId: Number(form.transmissionId),
        driveTypeId: Number(form.driveTypeId),
        cityId: Number(form.cityId),
        year: Number(form.year),
        mileage: Number(form.mileage),
        color: form.color,
        vin: form.vin || null,
        price: Number(form.price),
        description: form.description,
      });
      cancelEdit();
      await loadMyAds();
    } finally {
      setSaving(false);
    }
  };

  const onArchive = async (adId) => {
    await archiveAd(adId);
    await loadMyAds();
  };

  const onRestore = async (adId) => {
    await restoreAd(adId);
    await loadMyAds();
  };

  return (
    <section>
      <div className={styles.header}>
        <div>
          <h2>Мои объявления</h2>
          <p className={styles.name}>{user?.first_name || 'Гость'}</p>
        </div>
        <button type="button" className={styles.logout} onClick={logout}>Выйти</button>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={() => setStatus('ACTIVE')}>Активные</button>
        <button type="button" className={styles.secondary} onClick={() => setStatus('ARCHIVED')}>Архив</button>
      </div>

      {loading && <p className={styles.state}>Загрузка объявлений...</p>}
      {!loading && !myAds.length && <p className={styles.state}>Пока пусто.</p>}

      <div className={styles.list}>
        {myAds.map((ad) => (
          <div key={ad.id}>
            <AdCard ad={ad} />
            <div className={styles.actions}>
              {status === 'ACTIVE' && (
                <>
                  <button type="button" className={styles.secondary} onClick={() => startEdit(ad.id)}>Редактировать</button>
                  <button type="button" className={styles.secondary} onClick={() => onArchive(ad.id)}>Архивировать</button>
                </>
              )}
              {status === 'ARCHIVED' && (
                <button type="button" className={styles.secondary} onClick={() => onRestore(ad.id)}>Восстановить</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className={styles.editCard}>
          <h4>Редактирование объявления</h4>
          {Object.keys(defaultForm).map((key) => (
            <label className={styles.row} key={key}>
              {key}
              <input
                className={styles.input}
                value={form[key]}
                onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
              />
            </label>
          ))}

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

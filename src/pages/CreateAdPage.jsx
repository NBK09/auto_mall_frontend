import { useEffect, useMemo, useState } from 'react';
import { createAd } from '../api/adsApi';
import { uploadAdPhotos } from '../api/adPhotosApi';
import { useReferenceStore } from '../store/referenceStore';
import styles from './ProfilePage.module.css';

const initialForm = {
  brandId: '',
  modelId: '',
  generationId: '',
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

function CreateAdPage() {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const {
    brands,
    models,
    generations,
    engines,
    cities,
    transmissions,
    driveTypes,
    fetchBaseReference,
    fetchModels,
    fetchGenerations,
    fetchEngines,
  } = useReferenceStore();

  useEffect(() => {
    fetchBaseReference();
  }, [fetchBaseReference]);

  useEffect(() => {
    fetchModels(form.brandId);
    setForm((prev) => ({ ...prev, modelId: '', generationId: '', engineId: '' }));
  }, [fetchModels, form.brandId]);

  useEffect(() => {
    fetchGenerations(form.modelId);
    setForm((prev) => ({ ...prev, generationId: '', engineId: '' }));
  }, [fetchGenerations, form.modelId]);

  useEffect(() => {
    fetchEngines(form.generationId);
    setForm((prev) => ({ ...prev, engineId: '' }));
  }, [fetchEngines, form.generationId]);

  const canSubmit = useMemo(
    () => Object.values({
      brandId: form.brandId,
      modelId: form.modelId,
      generationId: form.generationId,
      engineId: form.engineId,
      transmissionId: form.transmissionId,
      driveTypeId: form.driveTypeId,
      cityId: form.cityId,
      year: form.year,
      mileage: form.mileage,
      color: form.color,
      price: form.price,
      description: form.description?.trim()?.length >= 10,
    }).every(Boolean),
    [form],
  );

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) {
      setMessage('Заполните обязательные поля (описание минимум 10 символов).');
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      const photoUrls = await uploadAdPhotos(files.slice(0, 10));
      await createAd({
        brandId: Number(form.brandId),
        modelId: Number(form.modelId),
        generationId: Number(form.generationId),
        engineId: Number(form.engineId),
        transmissionId: Number(form.transmissionId),
        driveTypeId: Number(form.driveTypeId),
        cityId: Number(form.cityId),
        year: Number(form.year),
        mileage: Number(form.mileage),
        color: form.color.trim(),
        vin: form.vin.trim() || null,
        price: Number(form.price),
        currency: 'KZT',
        description: form.description.trim(),
        photoUrls,
      });
      setMessage('Объявление успешно создано.');
      setForm(initialForm);
      setFiles([]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h2>Подать объявление</h2>
      <form className={styles.editCard} onSubmit={handleSubmit}>
        <select value={form.brandId} onChange={(e) => handleChange('brandId', e.target.value)}>
          <option value="">Марка</option>
          {brands.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <select value={form.modelId} onChange={(e) => handleChange('modelId', e.target.value)} disabled={!form.brandId}>
          <option value="">Модель</option>
          {models.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <select value={form.generationId} onChange={(e) => handleChange('generationId', e.target.value)} disabled={!form.modelId}>
          <option value="">Поколение</option>
          {generations.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <select value={form.engineId} onChange={(e) => handleChange('engineId', e.target.value)} disabled={!form.generationId}>
          <option value="">Двигатель</option>
          {engines.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>

        <select value={form.transmissionId} onChange={(e) => handleChange('transmissionId', e.target.value)}>
          <option value="">Коробка</option>
          {transmissions.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <select value={form.driveTypeId} onChange={(e) => handleChange('driveTypeId', e.target.value)}>
          <option value="">Привод</option>
          {driveTypes.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <select value={form.cityId} onChange={(e) => handleChange('cityId', e.target.value)}>
          <option value="">Город</option>
          {cities.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>

        <input type="number" placeholder="Год" value={form.year} onChange={(e) => handleChange('year', e.target.value)} />
        <input type="number" placeholder="Пробег" value={form.mileage} onChange={(e) => handleChange('mileage', e.target.value)} />
        <input type="text" placeholder="Цвет" value={form.color} onChange={(e) => handleChange('color', e.target.value)} />
        <input type="text" placeholder="VIN (опционально)" value={form.vin} onChange={(e) => handleChange('vin', e.target.value)} />
        <input type="number" placeholder="Цена" value={form.price} onChange={(e) => handleChange('price', e.target.value)} />
        <textarea placeholder="Описание (минимум 10 символов)" value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
        <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} />

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={saving}>{saving ? 'Сохранение...' : 'Опубликовать'}</button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
}

export default CreateAdPage;

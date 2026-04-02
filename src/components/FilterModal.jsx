import { useReferenceStore } from '../store/referenceStore';
import styles from './FilterModal.module.css';

function FilterModal({ open, filters, onChange, onClose }) {
  const { brands, models, cities } = useReferenceStore();

  if (!open) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <h3>Фильтры</h3>
        <select value={filters.brand} onChange={(e) => onChange({ brand: e.target.value, model: '' })}>
          <option value="">Бренд</option>
          {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
        </select>
        <select value={filters.model} onChange={(e) => onChange({ model: e.target.value })}>
          <option value="">Модель</option>
          {models.map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}
        </select>
        <select value={filters.city} onChange={(e) => onChange({ city: e.target.value })}>
          <option value="">Город</option>
          {cities.map((city) => <option key={city.id || city} value={city.id || city}>{city.name || city}</option>)}
        </select>
        <div className={styles.grid}>
          <input placeholder="Цена от" value={filters.minPrice} onChange={(e) => onChange({ minPrice: e.target.value })} />
          <input placeholder="Цена до" value={filters.maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value })} />
        </div>
        <button type="button" onClick={onClose}>Применить</button>
      </div>
    </div>
  );
}

export default FilterModal;

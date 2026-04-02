import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, onOpenFilters }) {
  return (
    <div className={styles.wrap}>
      <input
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Марка, модель или тип..."
      />
      <button className={styles.filterBtn} type="button" onClick={onOpenFilters}>
        Фильтр
      </button>
    </div>
  );
}

export default SearchBar;

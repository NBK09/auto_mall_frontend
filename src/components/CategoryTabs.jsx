import styles from './CategoryTabs.module.css';

const categories = ['all', 'sedan', 'suv', 'coupe', 'hatchback'];

function CategoryTabs({ active, onChange }) {
  return (
    <div className={styles.tabs}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`${styles.tab} ${active === category ? styles.active : ''}`}
          onClick={() => onChange(category)}
        >
          {category === 'all' ? 'Все' : category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;

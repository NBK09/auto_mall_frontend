import { useAuthStore } from '../store/authStore';
import styles from './Header.module.css';

function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className={styles.header}>
      <div>
        <p className={styles.welcome}>Добро пожаловать</p>
        <h1 className={styles.title}>AutoMall</h1>
      </div>
      <div className={styles.avatar}>{user?.first_name?.[0] || 'AM'}</div>
    </header>
  );
}

export default Header;

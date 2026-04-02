import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const links = [
  { to: '/ads', label: 'Главная' },
  { to: '/create', label: 'Создать' },
  { to: '/favorites', label: 'Избранное' },
  { to: '/profile', label: 'Профиль' },
];

function BottomNav() {
  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <NavLink key={link.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;

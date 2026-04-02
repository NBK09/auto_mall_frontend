import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import styles from './MainLayout.module.css';

function MainLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default MainLayout;

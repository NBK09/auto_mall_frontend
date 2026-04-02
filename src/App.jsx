import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdDetailsPage from './pages/AdDetailsPage';
import AdsPage from './pages/AdsPage';
import CreateAdPage from './pages/CreateAdPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import useTelegramAuth from './features/auth/useTelegramAuth';

function App() {
  useTelegramAuth();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/ads" replace />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdDetailsPage />} />
        <Route path="/create" element={<CreateAdPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

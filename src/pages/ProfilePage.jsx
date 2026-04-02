import { useAuthStore } from '../store/authStore';

function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <section>
      <h2>Профиль</h2>
      <p>{user?.first_name || 'Гость'}</p>
      <button type="button" onClick={logout}>Выйти</button>
    </section>
  );
}

export default ProfilePage;

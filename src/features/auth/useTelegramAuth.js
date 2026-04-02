import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

const useTelegramAuth = () => {
  const telegramLogin = useAuthStore((state) => state.telegramLogin);
  const token = useAuthStore((state) => state.token);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;

    if (token) {
      fetchMe().catch((error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          logout();
        }
      });
      return;
    }

    const initData = webApp?.initData;
    if (initData) {
      telegramLogin(initData).catch(() => {
        logout();
      });
    }
  }, [fetchMe, logout, telegramLogin, token]);
};

export default useTelegramAuth;

import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

const useTelegramAuth = () => {
  const telegramLogin = useAuthStore((state) => state.telegramLogin);
  const token = useAuthStore((state) => state.token);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;

    if (token) {
      fetchMe();
      return;
    }

    const initData = webApp?.initData;
    if (initData) {
      telegramLogin(initData);
    }
  }, [fetchMe, telegramLogin, token]);
};

export default useTelegramAuth;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from './user';

import { Auth } from '~/types';

interface AuthStore extends Auth {
  setJwt: (jwt: string | null) => void;
  setIsLoggedIn: (flag: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      jwt: null,
      isLoggedIn: false,
      setJwt: jwt => set({ jwt }),
      setIsLoggedIn: flag => set({ isLoggedIn: flag }),
      logout: () => {
        set({ jwt: null, isLoggedIn: false });
        useUserStore.getState().logout();
      },
    }),
    {
      name: 'auth-store',
      storage: {
        getItem: async key => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async key => {
          await AsyncStorage.removeItem(key);
        },
      },
    },
  ),
);

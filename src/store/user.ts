import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '~/types';

interface UserStore extends User {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setStreak: (streak: number) => void;
  setProgrees: (progress: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      name: '',
      email: '',
      streak: 0,
      progress: 0,
      setName: name => set({ name }),
      setEmail: email => set({ email }),
      setStreak: streak => set({ streak }),
      setProgrees: progress => set({ progress }),
      logout: () => set({ name: '', email: '' }),
    }),
    {
      name: 'user-store',
      storage: {
        getItem: async (name: string) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name: string, value: any) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '~/types';
import { getUser } from '~/services/user';
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
      fetchUser: async () => {
        const jwt = await AsyncStorage.getItem('jwt');
        if (!jwt) return;
        // Assuming getUser is available (needs to be imported or defined elsewhere)
        const response = await getUser({ jwt });
        if ('error' in response) {
          console.error('Failed to fetch user:', response.error);
          return;
        }
        set({
          name: response.name,
          email: response.email,
        });
      },
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

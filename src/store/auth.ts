import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from './user';

import { Auth } from '~/types';
import { getUser } from '~/services/user';
import { useWorkoutStore } from './workout';

interface AuthStore extends Auth {
  setToken: (token: string | null) => void;
  setIsLoggedIn: (flag: boolean) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      jwt: null,
      isLoggedIn: false,

      setToken: async (token) => {
        if (!token) {
          await AsyncStorage.removeItem('jwt');
          set({ jwt: null, isLoggedIn: false });
          return;
        }
        try {
          const response = await getUser({ jwt: token });
          if ('error' in response) {
            console.error('Error from getUser:', response.error);
            throw new Error(response.error);
          }

          // Only now update stores and mark logged in
          set({ jwt: token, isLoggedIn: true });
          await AsyncStorage.setItem('jwt', token);

          useUserStore.getState().setName(response.name);
          useUserStore.getState().setEmail(response.email);
          
          useWorkoutStore.getState().setWorkouts(response.workouts ?? []);
          useWorkoutStore.getState().setSchedules(response.schedules ?? []);

        } catch (err) {
          console.error('Failed to set Token:', err);
          await AsyncStorage.removeItem('jwt');
          set({ jwt: null, isLoggedIn: false });
        }
      },

      setIsLoggedIn: flag => set({ isLoggedIn: flag }),

      logout: async () => {
        await AsyncStorage.removeItem('jwt');
        set({ jwt: null, isLoggedIn: false });

        useUserStore.getState().logout();
        useWorkoutStore.getState().clearWorkout(); // Create this if not existing
      },

      refreshAuth: async () => {
        const token = await AsyncStorage.getItem('jwt');
        if (token) {
          useAuthStore.getState().setToken(token);
        }
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


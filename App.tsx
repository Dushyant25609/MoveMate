import { StatusBar } from 'expo-status-bar';
import TabLayout from './src/components/navigation';
import { SafeAreaView } from 'react-native';
import { useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider as PaperProvider } from 'react-native-paper';
import './global.css';
import { useAuthStore } from '~/store/auth';
import AuthScreen from '~/screens/auth/auth';

export default function App() {
  const authState = useAuthStore();
  const initialAuthCheckDone = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      if ((!initialAuthCheckDone.current && !authState.isLoggedIn)) {
        initialAuthCheckDone.current = true;
        await authState.refreshAuth();
      }
    };
    checkAuth();
  });

  if (!authState.isLoggedIn) return <AuthScreen />;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <LinearGradient colors={['#14123b', '#191558']} style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <TabLayout />
            <StatusBar style="auto" />
          </SafeAreaView>
        </LinearGradient>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

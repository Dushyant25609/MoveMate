import { StatusBar } from 'expo-status-bar';
import TabLayout from './src/components/navigation';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider as PaperProvider } from 'react-native-paper';
import './global.css'

export default function App() {
  return (
    <PaperProvider>
      <LinearGradient colors={['#14123b', '#191558']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TabLayout />
          <StatusBar style="auto" />
        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  );
}

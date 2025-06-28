import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContent } from '~/components/ScreenContent';
import HomePage from '~/screens/home/home';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home stack
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        options={{ headerShown: false }}
      >
        {() => <HomePage />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Add Workout stack
function AddStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddMain"
        options={{ headerShown: false }}
        component={() => <ScreenContent title="Add Workout" path="app/add.tsx" />}
      />
    </Stack.Navigator>
  );
}

// Settings stack
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsMain"
        options={{ headerShown: false }}
        component={() => <ScreenContent title="Settings" path="app/settings.tsx" />}
      />
    </Stack.Navigator>
  );
}

export default function TabLayout() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: '#191558',
            borderTopWidth: 0,
          },
          tabBarLabelPosition: 'beside-icon',
          tabBarIconStyle: {
            width: "100%",
          },
          headerShown: false,
          animation: 'fade',
          tabBarIcon: ({ focused }) => {
            let iconName = '';
            let iconSize = 24;
            const iconColor = focused ? '#6258f5' : 'white';

            if (route.name === 'Home') iconName = focused ? 'home-sharp' : 'home-outline';
            if (route.name === 'Add') {
              iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
              iconSize = focused ? 36 : 28;
            }
            if (route.name === 'Settings') iconName = focused ? 'settings-sharp' :  'settings-outline';

            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '75%',
                }}
              >
                <View
                  style={{
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
                </View>
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home">{HomeStack}</Tab.Screen>
        <Tab.Screen name="Add">{AddStack}</Tab.Screen>
        <Tab.Screen name="Settings">{SettingsStack}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

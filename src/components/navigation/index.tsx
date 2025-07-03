import * as React from 'react';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from '~/screens/settings/SettingsScreen';
import CreateWorkoutAndScheduleScreen from '~/screens/workout/CreateWorkoutAndScheduleScreen';
import WorkoutScreen from '~/screens/workout/workout';
import HomePage from '~/screens/home/home';
import DashboardScreen from '~/screens/dashboard/dashboard';
import { Exercise, Schedule } from '~/types';

// Define types for your tab navigator
export type RootTabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Add: undefined;
  Workout: { initialTab?: 'previousWorkouts' | 'previousSchedules' | 'inProgress' };
  Settings: undefined;
};

// Define types for your stack navigators within tabs
export type HomeStackParamList = {
  HomeMain: undefined;
};

export type AddStackParamList = {
  AddMain: { name?: string; exercise?: Exercise[]; schedule?: Schedule } | undefined;
};

export type WorkoutStackParamList = {
  WorkoutMain: { initialTab?: 'previousWorkouts' | 'previousSchedules' };
};

export type SettingsStackParamList = {
  SettingsMain: undefined;
};
export type DashboardStackParamList = {
  DashboardMain: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<ParamListBase>();

// Home stack
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" options={{ headerShown: false }}>
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
        component={CreateWorkoutAndScheduleScreen}
      />
    </Stack.Navigator>
  );
}

// Workout stack
function WorkoutStack({ route }: { route: RouteProp<RootTabParamList, 'Workout'> }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WorkoutMain" options={{ headerShown: false }}>
        {() => <WorkoutScreen route={route} />}
      </Stack.Screen>
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
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardMain"
        options={{ headerShown: false }}
        component={() => <DashboardScreen />}
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
            height: 70,
            backgroundColor: '#191558',
            borderTopWidth: 0,
          },
          tabBarLabelPosition: 'beside-icon',
          tabBarIconStyle: {
            width: '100%',
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
            if (route.name === 'Workout') iconName = focused ? 'barbell-sharp' : 'barbell-outline';
            if (route.name === 'Settings')
              iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
            if (route.name === 'Dashboard')
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';

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
                    height: 60,
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
        <Tab.Screen name="Dashboard">{DashboardStack}</Tab.Screen>
        <Tab.Screen name="Add">{AddStack}</Tab.Screen>
        <Tab.Screen name="Workout">{WorkoutStack}</Tab.Screen>
        <Tab.Screen name="Settings">{SettingsStack}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

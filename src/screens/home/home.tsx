import React from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import { days, months } from '~/constant/date';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutTab from '~/components/tab/workout';

const HomePage = () => {
  const today = new Date();
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];

  const dummyData = [
    { date: 25, month: 'June', workout: 'Arms', day: 'Today' },
    { date: 26, month: 'June', workout: 'Back', day: 'Tomorrow' },
  ];

  const workoutProgress = 0.6; // 60% complete this week
  const currentStreak = 5;

  return (
    <View className="h-full px-4 pt-10 pb-6 bg-primary-dark">
      {/* Header */}
      <View className="mb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-sm text-gray-400">Welcome back</Text>
          <Text className="text-2xl font-bold text-white">Mayank</Text>
        </View>
        <MaterialCommunityIcons name="account-circle" size={36} color="#c7d2fe" />
      </View>

      {/* Date + Today’s Workout Card */}
      <View className="w-full p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md shadow-black/30 flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-3xl font-bold text-gray-100">{dayName}</Text>
          <Text className="text-xl font-semibold text-gray-400">{`${date} ${month}`}</Text>
        </View>
        <View className="items-end">
          <Text className="text-3xl font-bold text-indigo-300">Workout</Text>
          <Text className="text-xl font-semibold text-gray-300">Arms</Text>
        </View>
      </View>

      {/* Progress Tracker */}
      <View className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm">
        <Text className="text-sm text-white/70 mb-2">Weekly Progress</Text>
        
        <View className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
          <View
            style={{ width: `${workoutProgress * 100}%` }}
            className="h-full bg-indigo-500 rounded-full"
          />
        </View>

        <Text className="mt-2 text-sm text-gray-300">
          {Math.round(workoutProgress * 100)}% completed this week
        </Text>
      </View>


      {/* Streak Tracker */}
      <View className="mb-6 flex-row items-center justify-between px-4 py-3 rounded-2xl bg-indigo-500/20 border border-indigo-400/30">
        <Text className="text-white font-semibold text-lg">🔥 Streak</Text>
        <Text className="text-indigo-300 font-bold text-xl">{currentStreak} days</Text>
      </View>

      {/* Quick Actions */}
      <View className="mb-6 flex-row justify-between gap-4">
        <TouchableOpacity className="flex-1 bg-indigo-500 p-4 rounded-xl shadow-lg shadow-indigo-900/50">
          <Text className="text-center text-white font-semibold text-base">Start Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-white/10 border border-white/20 p-4 rounded-xl shadow-md">
          <Text className="text-center text-white font-semibold text-base">Track Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Workouts */}
      <View>
        <Text className="text-lg font-semibold text-white/70 mb-3 tracking-wide">
          Upcoming Workouts
        </Text>
        <FlatList
          data={dummyData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WorkoutTab
              date={item.date}
              day={item.day}
              month={item.month}
              workout={item.workout}
            />
          )}
        />
      </View>
    </View>
  );
};

export default HomePage;

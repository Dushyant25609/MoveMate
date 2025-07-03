import React from 'react';
import { View, Text } from 'react-native';

interface StreakTrackerProps {
  currentStreak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ currentStreak }) => {
  return (
    <View className="mb-6 flex-row items-center justify-between px-4 py-3 rounded-2xl bg-indigo-500/20 border border-indigo-400/30">
      <Text className="text-white font-semibold text-lg">🔥 Streak</Text>
      <Text className="text-indigo-300 font-bold text-xl">{currentStreak} days</Text>
    </View>
  );
};

export default StreakTracker;

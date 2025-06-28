import React from 'react';
import { View, Text } from 'react-native';

interface ProgressTrackerProps {
  workoutProgress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ workoutProgress }) => {
  return (
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
  );
};

export default ProgressTracker;
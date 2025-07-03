import React from 'react';
import { View, Text } from 'react-native';

interface DateWorkoutCardProps {
  dayName: string;
  date: number;
  month: string;
  workout: string;
}

const DateWorkoutCard: React.FC<DateWorkoutCardProps> = ({ dayName, date, month, workout }) => {
  return (
    <View className="w-full p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md shadow-black/30 flex-row justify-between items-center mb-6">
      <View>
        <Text className="text-3xl font-bold text-gray-100">{dayName}</Text>
        <Text className="text-xl font-semibold text-gray-400">{`${date} ${month}`}</Text>
      </View>
      <View className="items-end">
        <Text className="text-3xl font-bold text-indigo-300">Workout</Text>
        <Text className="text-xl font-semibold text-gray-300">{workout}</Text>
      </View>
    </View>
  );
};

export default DateWorkoutCard;

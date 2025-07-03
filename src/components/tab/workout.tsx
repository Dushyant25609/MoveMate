import { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { day, Workout } from '~/types';

interface workoutProps {
  date: string;
  workout: Workout;
  day: day;
  onPress?: () => void;
}

const WorkoutTab: FC<workoutProps> = ({ date, workout, day, onPress }) => {
  const dateClassName = 'font-medium text-gray-200 ';
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex flex-row w-full my-2 p-4 border border-indigo-500 justify-between items-center bg-indigo-500/20 rounded-2xl backdrop-blur-md"
    >
      <View className="flex flex-col ">
        <Text className={dateClassName + 'text-2xl'}>{workout.name} day</Text>
        <Text className={dateClassName + 'text-lg'}>{date}</Text>
      </View>
      <View className="flex flex-col items-end">
        <Text className={dateClassName + 'text-2xl'}>{day}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutTab;

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import WorkoutTab from '~/components/tab/workout';

interface UpcomingWorkoutsProps {
  data: { date: number; month: string; workout: string; day: string }[];
}

const UpcomingWorkouts: React.FC<UpcomingWorkoutsProps> = ({ data }) => {
  return (
    <View>
      <Text className="text-lg font-semibold text-white/70 mb-3 tracking-wide">
        Upcoming Workouts
      </Text>
      <FlatList
        data={data}
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
  );
};

export default UpcomingWorkouts;
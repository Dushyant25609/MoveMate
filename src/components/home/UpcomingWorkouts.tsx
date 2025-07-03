import React from 'react';
import { View, Text } from 'react-native';
import WorkoutTab from '~/components/tab/workout';
import { day, Schedule } from '~/types';

interface UpcomingWorkoutsProps {
  sortedDays: string[];
  groupedWorkouts: Record<string, { workout: Schedule['workout']; day: string; date: string }[]>;
}

const UpcomingWorkouts: React.FC<UpcomingWorkoutsProps> = ({ sortedDays, groupedWorkouts }) => {
  return (
    <View>
      <Text className="text-gray-400 font-semibold mb-2">Upcoming workouts</Text>
      {sortedDays.map(day => (
        <View key={day}>
          {groupedWorkouts[day].map((item, idx) => (
            <WorkoutTab
              key={`${item.workout.name}-${idx}`}
              date={item.date}
              day={item.day as day}
              workout={item.workout}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default UpcomingWorkouts;

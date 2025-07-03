import React from 'react';
import { ScrollView } from 'react-native';
import { dayIndexMap, days, months } from '~/constant/date';
import Header from '~/components/home/Header';
import DateWorkoutCard from '~/components/home/DateWorkoutCard';
import ProgressTracker from '~/components/home/ProgressTracker';
import StreakTracker from '~/components/home/StreakTracker';
import QuickActions from '~/components/home/QuickActions';
import { useUserStore } from '~/store/user';
import { getCurrentWeekMap } from '~/utils/date';
import { useWorkoutStore } from '~/store/workout';
import { Schedule } from '~/types';
import UpcomingWorkouts from '~/components/home/UpcomingWorkouts';

const HomePage = () => {
  const weekMap = getCurrentWeekMap();
  const scheduleData = useWorkoutStore(state => state.schedules);
  const userData = useUserStore();

  const date = new Date().getDate();
  const month = months[new Date().getMonth()];
  const today = new Date();
  const todayIndex = today.getDay() === 0 ? 7 : today.getDay();
  const tomorrowIndex = todayIndex + 1;

  // Group workouts by day
  const groupedWorkouts: Record<
    string,
    { workout: Schedule['workout']; day: string; date: string }[]
  > = {};

  scheduleData.forEach(entry => {
    entry.day.forEach(d => {
      const index = dayIndexMap[d as keyof typeof dayIndexMap];
      let label = d;
      if (index === todayIndex) label = 'Today';
      else if (index === tomorrowIndex) label = 'Tomorrow';

      if (!groupedWorkouts[label]) groupedWorkouts[label] = [];
      groupedWorkouts[label].push({
        workout: entry.workout,
        day: label,
        date: weekMap[d],
      });
    });
  });

  // Sort days based on index for rendering order
  const sortedDays = Object.keys(groupedWorkouts).sort((a, b) => {
    const dayA = a === 'Today' ? days[todayIndex] : a === 'Tomorrow' ? days[tomorrowIndex] : a;
    const dayB = b === 'Today' ? days[todayIndex] : b === 'Tomorrow' ? days[tomorrowIndex] : b;
    return (
      dayIndexMap[dayA as keyof typeof dayIndexMap] - dayIndexMap[dayB as keyof typeof dayIndexMap]
    );
  });

  return (
    <ScrollView className="h-full px-4 pt-10 pb-6 bg-primary-dark">
      <Header userName={userData.name} />
      <DateWorkoutCard
        dayName={days[todayIndex]}
        date={date}
        month={month}
        workout={
          groupedWorkouts['Today'] ? groupedWorkouts['Today'][0].workout.name : 'No workout today'
        }
      />
      <ProgressTracker workoutProgress={userData.progress} />
      <StreakTracker currentStreak={userData.streak} />
      <QuickActions />
      {scheduleData.length > 0 && (
        <UpcomingWorkouts sortedDays={sortedDays} groupedWorkouts={groupedWorkouts} />
      )}
    </ScrollView>
  );
};

export default HomePage;

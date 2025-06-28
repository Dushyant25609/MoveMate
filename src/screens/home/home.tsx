import React from 'react';
import { View } from 'react-native';
import { days, months } from '~/constant/date';
import Header from '~/components/home/Header';
import DateWorkoutCard from '~/components/home/DateWorkoutCard';
import ProgressTracker from '~/components/home/ProgressTracker';
import StreakTracker from '~/components/home/StreakTracker';
import QuickActions from '~/components/home/QuickActions';
import UpcomingWorkouts from '~/components/home/UpcomingWorkouts';

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
      <Header userName="Mayank" />

      <DateWorkoutCard dayName={dayName} date={date} month={month} workout="Arms" />

      <ProgressTracker workoutProgress={workoutProgress} />

      <StreakTracker currentStreak={currentStreak} />

      <QuickActions />

      <UpcomingWorkouts data={dummyData} />
    </View>
  );
};

export default HomePage;

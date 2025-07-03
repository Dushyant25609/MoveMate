import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PreviousWorkouts from './workout/Workouts';
import PreviousSchedules from './workout/Schedules';
import { RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { RootTabParamList } from '~/components/navigation';
import InProgressWorkouts from './workout/InProgressWorkouts';

const renderScene = SceneMap({
  previousWorkouts: PreviousWorkouts,
  previousSchedules: PreviousSchedules,
  inProgress: InProgressWorkouts,
});

type WorkoutScreenRouteProp = RouteProp<RootTabParamList, 'Workout'>;

interface WorkoutScreenProps {
  route: WorkoutScreenRouteProp;
}

const WorkoutScreen = ({ route }: WorkoutScreenProps) => {
  const layout = useWindowDimensions();

  const initialTab = route.params?.initialTab;

  const [index, setIndex] = useState(
    initialTab === 'previousWorkouts'
      ? 0
      : initialTab === 'previousSchedules'
        ? 1
        : initialTab === 'inProgress'
          ? 2
          : 0,
  );
  const [routes] = useState([
    { key: 'previousWorkouts', title: 'Workouts' },
    { key: 'previousSchedules', title: 'Schedules' },
    { key: 'inProgress', title: 'In Progress' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#191558' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default WorkoutScreen;

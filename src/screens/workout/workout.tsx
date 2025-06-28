import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PreviousWorkouts from './workout/Workouts';
import PreviousSchedules from './workout/Schedules';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '~/components/navigation';


const renderScene = SceneMap({
  previousWorkouts: PreviousWorkouts,
  previousSchedules: PreviousSchedules,
});

type WorkoutScreenRouteProp = RouteProp<RootTabParamList, 'Workout'>;

interface WorkoutScreenProps {
  route: WorkoutScreenRouteProp;
}

const WorkoutScreen = ({ route }: WorkoutScreenProps) => {
  const layout = useWindowDimensions();

  const initialTab = route.params?.initialTab;

  const [index, setIndex] = React.useState(
    initialTab === 'previousSchedules' ? 1 : 0
  );
  const [routes] = React.useState([
    { key: 'previousWorkouts', title: 'Workouts' },
    { key: 'previousSchedules', title: 'Schedules' },
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
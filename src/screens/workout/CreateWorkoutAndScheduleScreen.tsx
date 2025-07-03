import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import CreateWorkout from './workout/CreateWorkout';
import CreateSchedule from './workout/CreateSchedule';

import { Route, useRoute } from '@react-navigation/native';

const CreateWorkoutAndScheduleScreen = () => {
  const route = useRoute<any>();
  const { name, exercise, schedule, initialTab } = route.params || {};
  console.log('initialTab', initialTab);

  const renderScene = ({ route: tabRoute }: { route: Route<string> }) => {
    switch (tabRoute.key) {
      case 'createWorkout':
        return <CreateWorkout name={name} exercise={exercise} />;
      case 'createSchedule':
        return <CreateSchedule schedule={schedule} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'createWorkout', title: 'Create Workout' },
    { key: 'createSchedule', title: 'Create Schedule' },
  ]);

  React.useEffect(() => {
    if (initialTab === 'createWorkout') setIndex(0);
    if (initialTab === 'createSchedule') setIndex(1);
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#191558' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes: routes as unknown as Route<string>[] }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: useWindowDimensions().width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default CreateWorkoutAndScheduleScreen;

import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Route, useNavigation } from '@react-navigation/native';
import CreateWorkout from './workout/CreateWorkout';
import CreateSchedule from './workout/CreateSchedule';

const CreateWorkoutAndScheduleScreen = () => {
  const navigation = useNavigation<any>();

  const renderScene = ({ route }: { route: Route<string> }) => {
    switch (route.key) {
      case 'createWorkout':
        return <CreateWorkout onSave={() => navigation.navigate('Workout', { initialTab: 'previousWorkouts' })} />;
      case 'createSchedule':
        return <CreateSchedule onSave={() => navigation.navigate('Workout', { initialTab: 'previousSchedules' })} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    
    { key: 'createWorkout', title: 'Create Workout' },
    { key: 'createSchedule', title: 'Create Schedule' },
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
      navigationState={{ index, routes: routes as unknown as Route<string>[] }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: useWindowDimensions().width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default CreateWorkoutAndScheduleScreen;
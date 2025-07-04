import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import { useWorkoutStore } from '~/store/workout';

const DashboardScreen = () => {
  const workoutState = useWorkoutStore();
  const [selectedWorkout, setSelectedWorkout] = useState<string>('All');
  const data = workoutState.workoutAvgTime[selectedWorkout] || [0, 0, 0, 0, 0, 0, 0];
  const averageDuration = (
    data.reduce((sum, val) => sum + val, 0) / data.filter(v => v > 0).length || 0
  ).toFixed(1);

  return (
    <ScrollView className="flex-1 bg-[#0f0f23] px-4 pt-10 pb-8">
      <Text className="text-white text-3xl font-extrabold mb-4">Dashboard</Text>

      <View className="bg-[#1e1e3f] p-4 rounded-2xl mb-6 shadow-md">
        <Text className="text-white mb-2 text-lg font-semibold">Average Duration</Text>
        <Text className="text-indigo-300 text-2xl font-bold">{averageDuration} mins</Text>
      </View>

      <View className="bg-[#1e1e3f] p-4 rounded-2xl mb-6 shadow-md flex flex-col h-2/">
        <Text className="text-white mb-2 text-lg font-semibold">Filter by Workout</Text>
        <View className="bg-white/10 rounded-xl overflow-hidden flex-1 ">
          <Picker
            selectedValue={selectedWorkout}
            onValueChange={itemValue => setSelectedWorkout(itemValue)}
            dropdownIconColor="white"
            style={{ color: 'white', width: '100%', height: '100%' }}
          >
            {['All', ...workoutState.workouts.map(w => w.name)].map(name => (
              <Picker.Item label={name} value={name} key={name} color="white" />
            ))}
          </Picker>
        </View>
      </View>

      <View className="bg-[#1e1e3f] p-4 rounded-2xl mb-6 shadow-md">
        <Text className="text-white mb-4 text-lg font-semibold">Weekly Duration</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: data }],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisSuffix=" min"
          chartConfig={{
            backgroundGradientFrom: '#1e1e3f',
            backgroundGradientTo: '#1e1e3f',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(98, 88, 245, ${opacity})`,
            labelColor: () => '#fff',
            style: { borderRadius: 16 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#6258f5' },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>

      {/* More widgets can go here */}
    </ScrollView>
  );
};

export default DashboardScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StartWorkoutScreen from './StartWorkoutScreen';
import { Workout } from '~/types';
import { useWorkoutStore } from '~/store/workout';

const SelectWorkoutScreen = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [started, setStarted] = useState<boolean>(false);
  const workoutState = useWorkoutStore();

  const handleSelect = (workout: Workout) => {
    if (selectedWorkout?.name === workout.name) {
      setSelectedWorkout(null);
    } else {
      setSelectedWorkout(workout);
    }
  };
  if (started && selectedWorkout !== null) {
    return <StartWorkoutScreen workout={selectedWorkout} />;
  }

  return (
    <View className="flex-1 bg-primary-dark px-4 pt-12 pb-6">
      <Text className="text-white text-3xl font-extrabold mb-6">Select Workout</Text>

      <FlatList
        data={workoutState.workouts}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => {
          const isSelected = selectedWorkout?.name === item.name;
          return (
            <TouchableOpacity
              className={`bg-[#1e1e3f] rounded-2xl p-4 mb-4 border ${
                isSelected ? 'border-indigo-500' : 'border-white/10'
              }`}
              onPress={() => handleSelect(item)}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xl font-bold text-indigo-200">{item.name}</Text>
                <Ionicons
                  name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={isSelected ? '#4f46e5' : '#ccc'}
                />
              </View>

              {item.exercises.map((ex, idx) => (
                <View key={idx} className="">
                  <Text className="text-xs text-gray-400">o {ex.name}</Text>
                </View>
              ))}
            </TouchableOpacity>
          );
        }}
      />

      {selectedWorkout && (
        <TouchableOpacity
          className="absolute bottom-6 left-4 right-4 bg-indigo-600 py-4 rounded-2xl shadow-lg"
          onPress={() => setStarted(true)}
        >
          <Text className="text-white text-lg text-center font-bold">Start Workout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SelectWorkoutScreen;

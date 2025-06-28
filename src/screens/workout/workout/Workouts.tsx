import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Workout {
  name: string;
  exercises: string[];
  avgTime: number; // in minutes
}

const dummyWorkouts: Workout[] = [
  {
    name: 'Push Day',
    exercises: ['Bench Press', 'Shoulder Press', 'Triceps Dips'],
    avgTime: 45,
  },
  {
    name: 'Pull Day',
    exercises: ['Deadlift', 'Pull Ups', 'Barbell Row'],
    avgTime: 50,
  },
  {
    name: 'Leg Day',
    exercises: ['Squat', 'Lunges', 'Leg Press', 'Calf Raises'],
    avgTime: 55,
  },
];

const PreviousWorkouts = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <View className="flex-1 bg-primary-dark px-4 pt-12">
      <Text className="text-white text-2xl font-extrabold mb-6">My Workouts</Text>

      <FlatList
        data={dummyWorkouts}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isExpanded = expandedIndex === index;

          return (
            <Pressable onPress={() => toggleExpand(index)}>
              <View className="bg-[#1e1e3f] border border-[#3f3f5f] rounded-2xl p-4 shadow shadow-black/40">
                {/* Title & Summary */}
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-lg font-bold text-indigo-200">{item.name}</Text>
                  <MaterialCommunityIcons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    color="#c7d2fe"
                    size={24}
                  />
                </View>

                {/* Summary */}
                <View className="ml-1">
                  <Text className="text-base text-gray-300 mb-1">
                    <Text className="text-gray-400 font-semibold">Exercises: </Text>
                    {item.exercises.length}
                  </Text>
                  <Text className="text-base text-gray-300">
                    <Text className="text-gray-400 font-semibold">Avg Time: </Text>
                    {item.avgTime} min
                  </Text>
                </View>

                {/* Expanded Exercise List */}
                {isExpanded && (
                  <View className="mt-4 border-t border-gray-700 pt-3">
                    <Text className="text-sm text-gray-400 font-semibold mb-2">Exercise List:</Text>
                    {item.exercises.map((exercise, i) => (
                      <Text
                        key={i}
                        className="text-sm text-gray-300 ml-1 mb-1"
                      >{`\u2022 ${exercise}`}</Text>
                    ))}
                  </View>
                )}
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default PreviousWorkouts;

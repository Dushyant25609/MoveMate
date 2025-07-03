import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useWorkoutStore } from '~/store/workout';
import { useNavigation } from '@react-navigation/native';

const PreviousWorkouts = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const workoutState = useWorkoutStore();
  const navigation = useNavigation<any>();

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const handleEdit = (index: number) => {
    navigation.navigate('Add', {
      
      screen: 'AddMain',
      params: {
        name: workoutState.workouts[index].name,
        exercise: workoutState.workouts[index].exercises,
        initialTab: 'createWorkout',
      },
    });
    console.log('Edit workout:', workoutState.workouts[index].name);
  };

  const handleDelete = (index: number) => {
    const name = workoutState.workouts[index].name;
    Alert.alert(
      'Delete Workout',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedWorkouts = workoutState.workouts.filter((_, i) => i !== index);
            workoutState.setWorkouts(updatedWorkouts);
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-primary-dark px-4 pt-12">
      <Text className="text-white text-2xl font-extrabold mb-6">My Workouts</Text>

      <FlatList
        data={workoutState.workouts}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isExpanded = expandedIndex === index;

          return (
            <Pressable onPress={() => toggleExpand(index)}>
              <View className="bg-[#1e1e3f] border border-[#3f3f5f] rounded-2xl p-4 shadow shadow-black/40">
                {/* Title & Actions */}
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-lg font-bold text-indigo-200">{item.name}</Text>
                  <View className="flex-row items-center gap-x-3">
                    <TouchableOpacity onPress={() => handleEdit(index)}>
                      <Feather name="edit" size={18} color="#c7d2fe" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(index)}>
                      <Ionicons name="trash-bin" size={20} color="#f87171" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleExpand(index)}>
                      <MaterialCommunityIcons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        color="#c7d2fe"
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Summary */}
                <View className="ml-1">
                  <Text className="text-base text-gray-300 mb-1">
                    <Text className="text-gray-400 font-semibold">Exercises: </Text>
                    {item.exercises.length}
                  </Text>
                  <Text className="text-base text-gray-300">
                    <Text className="text-gray-400 font-semibold">Avg Time: </Text>
                    {item.avgTime || 0} min
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
                      >{`\u2022 ${exercise.name}`}</Text>
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

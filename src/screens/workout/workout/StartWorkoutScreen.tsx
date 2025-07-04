import React, { useState, useEffect, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { Ionicons } from '@expo/vector-icons';
import { useWorkoutStore } from '~/store/workout';
import { Exercise, Workout } from '~/types';

// Enable layout animations on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

interface startWorkoutProps {
  workout: Workout;
}

const StartWorkoutScreen: FC<startWorkoutProps> = ({ workout }) => {
  const [exercises, setExercises] = useState<Exercise[]>(workout.exercises);
  const [expanded, setExpanded] = useState<string>('');
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const workoutState = useWorkoutStore();

  useEffect(() => {
    const timer = setInterval(() => setSecondsElapsed(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleExpand = (exercise: Exercise) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => (prev === exercise.name ? '' : exercise.name));
  };

  const updateSetField = (
    exIndex: number,
    setIndex: number,
    key: 'weight' | 'reps',
    value: string,
  ) => {
    const updated = [...exercises];
    const parsed = parseInt(value, 10);
    updated[exIndex].sets[setIndex][key] = isNaN(parsed) ? 0 : parsed;
    setExercises(updated);
  };

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<Exercise>) => {
    const index = getIndex() || 0;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={drag}
        onPress={() => toggleExpand(item)}
        className={`bg-[#1e1e3f] rounded-2xl p-4 mb-3 border border-white/10 shadow-lg ${
          isActive ? 'opacity-70 scale-95' : ''
        }`}
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-indigo-200">{item.name}</Text>
          <Ionicons
            name={expanded === item.name ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="white"
          />
        </View>

        {expanded === item.name && (
          <View className="mt-2">
            <View className="flex-row justify-between mb-2">
              <Text className="text-white text-sm">Set</Text>
              <Text className="text-white text-sm">Prev Weight</Text>
              <Text className="text-white text-sm">Prev Reps</Text>
              <Text className="text-white text-sm">Weight (kg)</Text>
              <Text className="text-white text-sm">Reps</Text>
            </View>
            {item.sets.map((set, setIdx) => (
              <View key={setIdx} className="flex-row items-center justify-between mb-2">
                <Text className="text-white text-sm w-[10%]">{setIdx + 1}</Text>
                <TextInput
                  value={workoutState.exercises[index]?.sets[setIdx]?.weight.toString() || '0'}
                  editable={false}
                  placeholder="kg"
                  keyboardType="numeric"
                  placeholderTextColor="#aaa"
                  className="bg-white/10 text-white px-2 py-3 rounded-md text-sm w-12 text-center"
                />
                <TextInput
                  value={workoutState.exercises[index]?.sets[setIdx]?.reps.toString() || '0'}
                  editable={false}
                  placeholder="reps"
                  keyboardType="numeric"
                  placeholderTextColor="#aaa"
                  className="bg-white/10 text-white px-2 py-3 rounded-md text-sm w-12 text-center"
                />
                <TextInput
                  onChangeText={text => updateSetField(index, setIdx, 'weight', text)}
                  value={set.weight.toString()}
                  placeholder="kg"
                  keyboardType="numeric"
                  placeholderTextColor="#aaa"
                  className="bg-white/10 text-white px-2 py-3 rounded-md text-sm w-12 text-center"
                />
                <TextInput
                  onChangeText={text => updateSetField(index, setIdx, 'reps', text)}
                  value={set.reps.toString()}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#aaa"
                  className="bg-white/10 text-white px-2 py-3 rounded-md text-sm w-12 text-center"
                />
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#0f0f23] px-4 pt-12 pb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-3xl font-extrabold">Start Workout</Text>
        <View className="bg-white/10 px-4 py-1.5 rounded-xl">
          <Text className="text-indigo-300 font-semibold">
            Duration: {formatTime(secondsElapsed)}
          </Text>
        </View>
      </View>

      <DraggableFlatList
        data={exercises}
        onDragEnd={({ data }) => setExercises(data)}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEnabled
      />

      <TouchableOpacity
        className="absolute bottom-6 left-4 right-4 bg-indigo-700 py-4 rounded-2xl shadow-xl"
        onPress={() => {
        }}
      >
        <Text className="text-white text-lg text-center font-bold">Finish Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartWorkoutScreen;

import React, { FC, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useWorkoutStore } from '~/store/workout';
import { Exercise, Set, Workout } from '~/types';
import { useNavigation } from '@react-navigation/native';

interface createWorkoutProps {
  name?: string;
  exercise?: Exercise[];
}

const CreateWorkout: FC<createWorkoutProps> = ({ name = '', exercise = [] }) => {
  const [workoutName, setWorkoutName] = useState(name);
  const [exercises, setExercises] = useState<Exercise[]>(exercise);
  const [exerciseInput, setExerciseInput] = useState('');
  const [exerciseSetsInput, setExerciseSetsInput] = useState('');
  const workoutState = useWorkoutStore(state => state);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if(name === '') return;
    setWorkoutName(name);
    setExercises(exercise);
  });

  const addExercise = () => {
    if (!exerciseInput.trim() || !exerciseSetsInput.trim()) return;
    let sets;
    for (let i = 1; i <= parseInt(exerciseSetsInput, 10); i++) {
      const set: Set = {
        weight: 0,
        reps: 0,
      };
      if (!sets) sets = [];
      sets.push(set);
    }
    setExercises([...exercises, { name: exerciseInput, sets: sets as Set[], previousWeight: 0 }]);
    setExerciseInput('');
    setExerciseSetsInput('');
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const saveWorkout = (name: string, exercises: Exercise[]) => {

    if (name === '' || exercise.length === 0){
    const workouts: Workout[] = [...workoutState.workouts, { name, exercises, avgTime: 0 }];
    workoutState.setWorkouts(workouts);
    const currentAvgTime = { ...workoutState.workoutAvgTime };
    if (!currentAvgTime[name]) {
      currentAvgTime[name] = [0, 0, 0, 0, 0, 0, 0];
      workoutState.setWorkoutAvgTime(currentAvgTime);
    }
  } else {
    const workouts: Workout[] = workoutState.workouts.map(workout => {
      if (workout.name === name) {
        return { ...workout, exercises };
      }
      return workout;
    });
    workoutState.setWorkouts(workouts);
  }
    setWorkoutName('');
    setExerciseInput('');
    setExerciseSetsInput('');
    setExercises([]);
    navigation.navigate('Workout', { initialTab: 'previousWorkouts' });
    navigation.setParams({ name: undefined, exercise: undefined, initialTab: undefined });
    console.log('Workout Saved');
  };


  return (
    <View className="flex-1 p-4 bg-primary-dark">
      <Text className="text-white text-xl font-semibold mb-3">Workout Name</Text>
      <TextInput
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white mb-4"
        placeholder="e.g. Push Day"
        placeholderTextColor="#aaa"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <Text className="text-white text-xl font-semibold mb-3">Exercises</Text>
      <View className="flex-row gap-2 mb-3">
        <TextInput
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          placeholder="Exercise Name (e.g. Bench Press)"
          placeholderTextColor="#aaa"
          value={exerciseInput}
          onChangeText={setExerciseInput}
        />
        <TextInput
          className="w-20 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          placeholder="Sets"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={exerciseSetsInput}
          onChangeText={(text) => {
            const num = parseInt(text);
            if (!isNaN(num) && num > 10) {
              Alert.alert('Limit Exceeded', 'You cannot enter more than 10 reps');
              return;
            }
            setExerciseSetsInput(text);
          }}

        />
        <TouchableOpacity className="bg-indigo-500 px-4 py-2 rounded-xl" onPress={addExercise}>
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="bg-white/10 p-3 rounded-xl mb-2 border border-white/20 flex-row justify-between items-center">
            <Text className="text-white text-lg">{item.name}</Text>
            <View className="flex-row items-center">
              <Text className="text-white text-base mr-4">{item.sets.length} Sets</Text>
              <TouchableOpacity onPress={() => removeExercise(index)}>
                <AntDesign name="closecircle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {workoutName !== '' && exercises.length > 0 && (
        <TouchableOpacity
          className="mt-6 bg-green-600 py-3 rounded-xl shadow-md"
          onPress={() => saveWorkout(workoutName, exercises)}
        >
          <Text className="text-center text-white font-bold text-lg">Save Workout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreateWorkout;

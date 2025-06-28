import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface CreateWorkoutProps {
  onSave: () => void;
}

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ onSave }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<{ name: string; sets: string }[]>([]);
  const [exerciseInput, setExerciseInput] = useState('');
  const [exerciseSetsInput, setExerciseSetsInput] = useState('');

  const addExercise = () => {
    if (!exerciseInput.trim() || !exerciseSetsInput.trim()) return;
    setExercises([...exercises, { name: exerciseInput, sets: exerciseSetsInput }]);
    setExerciseInput('');
    setExerciseSetsInput('');
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
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
          onChangeText={setExerciseSetsInput}
        />
        <TouchableOpacity
          className="bg-indigo-500 px-4 py-2 rounded-xl"
          onPress={addExercise}
        >
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
              <Text className="text-white text-base mr-4">{item.sets} Sets</Text>
              <TouchableOpacity onPress={() => removeExercise(index)}>
                <AntDesign name="closecircle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity className="mt-6 bg-green-600 py-3 rounded-xl shadow-md" onPress={onSave}>
        <Text className="text-center text-white font-bold text-lg">Save Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateWorkout;

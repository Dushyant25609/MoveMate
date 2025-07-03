import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuickActions: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="mb-6 flex-row justify-between gap-4">
      <TouchableOpacity
        className="flex-1 bg-indigo-500 p-4 rounded-xl shadow-lg shadow-indigo-900/50"
        onPress={() => navigation.navigate('Workout', { initialTab: 'inProgress' })}
      >
        <Text className="text-center text-white font-semibold text-base">Start Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        className="flex-1 bg-white/10 border border-white/20 p-4 rounded-xl shadow-md"
      >
        <Text className="text-center text-white font-semibold text-base">Track Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickActions;

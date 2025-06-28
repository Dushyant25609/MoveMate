import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <View className="mb-6 flex-row justify-between items-center">
      <View>
        <Text className="text-sm text-gray-400">Welcome back</Text>
        <Text className="text-2xl font-bold text-white">{userName}</Text>
      </View>
      <MaterialCommunityIcons name="account-circle" size={36} color="#c7d2fe" />
    </View>
  );
};

export default Header;
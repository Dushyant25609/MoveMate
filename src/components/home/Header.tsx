import React from 'react';
import { View, Text } from 'react-native';

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
    </View>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useUserStore } from '../../store/user';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const { name, email, setName, setEmail } = useUserStore();
  const [editableName, setEditableName] = useState(name);
  const [editableEmail, setEditableEmail] = useState(email);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditableName(name);
    setEditableEmail(email);
  }, [name, email]);

  useEffect(() => {
    setHasChanges(editableName !== name || editableEmail !== email);
  }, [editableName, editableEmail, name, email]);

  const handleSave = () => {
    setName(editableName);
    setEmail(editableEmail);
    Alert.alert('Success', 'User details updated successfully!');
    setHasChanges(false);
  };

  const handleLogout = () => {
    Alert.alert('Logged Out', 'This would clear auth state.');
    // You can integrate your auth state reset here
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary-dark px-4 pt-12"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-indigo-600 rounded-full items-center justify-center shadow-lg">
          <Text className="text-white text-3xl font-bold">{editableName?.charAt(0)?.toUpperCase() || 'U'}</Text>
        </View>
        <Text className="text-white text-xl font-bold mt-4">{editableName || 'User Name'}</Text>
        <Text className="text-gray-400 text-sm">{editableEmail || 'your@email.com'}</Text>
      </View>

      <View className="bg-[#1e1e3f] rounded-2xl p-4 border border-[#3f3f5f] shadow shadow-black/40">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-300 text-base font-semibold">Name</Text>
          <Feather name="edit-2" size={16} color="#aaa" />
        </View>
        <TextInput
          className="bg-white/5 text-white px-4 py-3 rounded-xl mb-4"
          placeholder="Enter your name"
          placeholderTextColor="#888"
          value={editableName}
          onChangeText={setEditableName}
        />

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-300 text-base font-semibold">Email</Text>
          <Feather name="mail" size={16} color="#aaa" />
        </View>
        <TextInput
          className="bg-white/5 text-white px-4 py-3 rounded-xl"
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={editableEmail}
          onChangeText={setEditableEmail}
        />
      </View>

      {hasChanges && (
        <TouchableOpacity
          className="mt-8 bg-indigo-600 py-4 rounded-xl shadow-md active:opacity-90"
          onPress={handleSave}
        >
          <Text className="text-white text-center text-lg font-bold">Save Updates</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        className="mt-6 bg-red-500/20 py-3 rounded-xl border border-red-500 flex-row items-center justify-center"
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={18} color="#f87171" />
        <Text className="text-red-400 font-bold text-base ml-2">Logout</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen;

import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { login, signUp } from '~/services/auth';
import { useAuthStore } from '~/store/auth';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const setJwt = useAuthStore(state => state.setToken);

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && password !== confirmPassword)) {
      alert('Please check your input fields.');
      return;
    }
    let response;
    if(isLogin){
      response = await login({email, password});
    } else {
      response = await signUp({name, email, password});
    }
    if( "error" in response ){
      alert(response.error);
      return;
    }
    setJwt(response.jwt || null);
  };

  return (
    <LinearGradient colors={['#14123b', '#191558']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center px-6"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text className="text-white text-4xl font-extrabold text-center mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Text>

        <BlurView
          intensity={70}
          tint="dark"
          className="w-full rounded-3xl p-6 shadow-xl border border-white/10 bg-white/10"
        >
          {!isLogin && 
          <>
          <Text className="text-white mb-1 text-sm">Name</Text>
          <TextInput
              className="bg-white/10 text-white px-4 py-3 rounded-xl mb-4 border border-white/10"
              placeholder="Enter your Name"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              value={name}
              onChangeText={setName} />
              </>
          }

          <Text className="text-white mb-1 text-sm">Email</Text>
          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-4 border border-white/10"
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-white mb-1 text-sm">Password</Text>
          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-4 border border-white/10"
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {!isLogin && (
            <>
              <Text className="text-white mb-1 text-sm">Confirm Password</Text>
              <TextInput
                className="bg-white/10 text-white px-4 py-3 rounded-xl mb-4 border border-white/10"
                placeholder="Confirm your password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </>
          )}

          <TouchableOpacity
            onPress={handleAuth}
            className="bg-indigo-600 py-4 rounded-2xl mt-2 shadow-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="mt-4">
            <Text className="text-indigo-300 text-center">
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>
        </BlurView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AuthScreen;
import { SignUpCredentials, AuthResponse, LoginCredentials } from '../types/api';
import { isAxiosError } from 'axios';
import api from './base';


const baseUrl = '/auth'

export const signUp = async ({ email, name, password }: SignUpCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post(baseUrl+`/signup`, {
      email,
      name,
      password,
    });
    
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred during sign up'
      };
    }
    return {
      error: 'An unexpected error occurred'
    };
  }
};

export const login = async ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post(baseUrl+`/login`, {
      email,
      password,
    });
    
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred during login'
      };
    }
    return {
      error: 'An unexpected error occurred'
    };
  }
};

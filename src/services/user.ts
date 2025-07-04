import { isAxiosError } from "axios";
import api from "./base";
import { GetRequest, GetResponse, scheduleResponse } from "~/types/api";
import { Schedule, Workout } from "~/types";

const baseUrl = '/users';

export const getUser = async ({jwt}:GetRequest) => {
  try {
    const response = await api.get<GetResponse>(baseUrl+'/profile', {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred during login'
      };
    } else {
      return {
        error: 'An unexpected error occurred'
      };
    }
  }
}

export const updateUser = async ({jwt, name, email}: GetRequest & {name: string, email: string}) => {
  try {
    const response = await api.put<GetResponse>(baseUrl+'/profile', {
        name,
        email,
    }, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred during update'
      };
    } else {
      return {
        error: 'An unexpected error occurred'
      };
    }
  }
}

export const createWorkout = async ({jwt, workoutData}: {jwt: string, workoutData: Workout}) => {
  try {
    const response = await api.post<Workout>(`${baseUrl}/workouts`, workoutData, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred while creating workout'
      };
    } else {
      return {
        error: 'An unexpected error occurred'
      };
    }
  }
}

export const updateWorkout = async ({jwt, workoutData}: {jwt: string, workoutData: Workout}) => {
  try {
    const response = await api.put<Workout>(`${baseUrl}/workouts`, workoutData, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    return response.data;
  } catch (error) {

    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred while updating workout'
      };
    } else {
      return {
        error: 'An unexpected error occurred'
      };
    }
  }
}

export const createSchedule = async ({jwt, scheduleData}: {jwt: string, scheduleData: Schedule}) => {
  try {
    const response = await api.post<scheduleResponse>(`${baseUrl}/schedules`, scheduleData, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred while creating schedule'
      };
    } else {
      return {
        error: 'An unexpected error occurred'
      };
    }
  }
}

export const updateSchedule = async ({jwt, scheduleData}: {jwt: string, scheduleData: any}) => {
  try {
    const response = await api.put<scheduleResponse>(`${baseUrl}/schedules`, scheduleData, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.response?.data?.message || 'An error occurred while updating schedule'
      };
    } else {
      return {
        error: 'An unexpected error occurred'
      };
    }
  }
}


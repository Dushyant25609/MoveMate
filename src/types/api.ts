import { day, Schedule, Workout } from ".";

export interface SignUpCredentials {
  email: string;
  name: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt?: string;
  error?: string;
}

export interface GetRequest {
    jwt: string;
}

export interface GetResponse {
    id: number;
    name: string;
    email: string;
    workouts: Workout[];
    schedules: Schedule[];
}

export interface scheduleResponse {
  userId: number;
  workoutId: number;
  day: day[];
}
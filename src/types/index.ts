export interface Workout {
  name: string;
  exercises: Exercise[];
  avgTime: number;
}

export type day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
  | 'Today'
  | 'Tomorrow';

export interface Schedule {
  workout: Workout;
  day: day[];
}

export interface Set {
  weight: number;
  reps: number;
}

export interface Exercise {
  name: string;
  previousWeight: number;
  sets: Set[];
}

export interface User {
  name: string;
  email: string;
  streak: number;
  progress: number;
}

export interface Auth {
  jwt: string | null;
  isLoggedIn: boolean;
}

export interface WorkoutTime {
  [workoutName: string]: number[];
}

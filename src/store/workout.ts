// store/useWorkoutStore.ts
import { create } from 'zustand';

import { Exercise, Schedule, Workout, WorkoutTime } from '~/types';

interface WorkoutStore {
  currentWorkout: Workout | null;
  workouts: Workout[];
  schedules: Schedule[];
  workoutAvgTime: WorkoutTime;
  exercises: Exercise[];
  setCurrentWorkout: (workout: Workout) => void;
  setWorkouts: (workout: Workout[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setWorkoutAvgTime: (workoutAvgTime: WorkoutTime) => void;
  setExercises: (exercises: Exercise[]) => void;
  clearWorkout: () => void;
  removeSchedule: (workoutName: string) => void;
}

const initialState: Partial<WorkoutStore> = {
  currentWorkout: null,
  workouts: [],
  schedules: [],
  workoutAvgTime: {},
  exercises: [],
};

export const useWorkoutStore = create<WorkoutStore>(set => ({
  currentWorkout: null,
  workouts: [],
  schedules: [],
  workoutAvgTime: { All: [0, 0, 0, 0, 0, 0, 0] },
  exercises: [],
  setCurrentWorkout: (workout: Workout) => set({ currentWorkout: workout }),
  setWorkouts: (workouts: Workout[]) => set({ workouts }),
  setSchedules: (schedules: Schedule[]) => set({ schedules }),
  setWorkoutAvgTime: (workoutAvgTime: WorkoutTime) => set({ workoutAvgTime }),
  setExercises: (exercises: Exercise[]) => set({ exercises }),
  clearWorkout: () => set({ ...initialState }),
  removeSchedule: (workoutName: string) =>
    set(state => ({
      schedules: state.schedules.filter(s => s.workout.name !== workoutName),
    })),
}));

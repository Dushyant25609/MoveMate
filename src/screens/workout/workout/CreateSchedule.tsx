import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Button, Checkbox } from 'react-native-paper';
import { days } from '~/constant/date';
import { useWorkoutStore } from '~/store/workout';
import { day, Schedule, Workout } from '~/types';

interface createScheduleProps {
  schedule: Schedule;
}

const CreateSchedule: FC<createScheduleProps> = ({ schedule  = {workout : {name: 'null', exercises: [], avgTime: 0}, day : []} }) => {
  const [workoutMenuVisible, setWorkoutMenuVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedDays, setSelectedDays] = useState<day[]>([]);
  console.log("create schedule:",schedule.workout?.name);
  useEffect(() => {
    if (schedule?.workout.name === 'null') return;
    setSelectedWorkout(schedule.workout);
    setSelectedDays(schedule.day); 
  },[schedule]);

  const workoutState = useWorkoutStore();
  const navigation = useNavigation<any>();

  const toggleDaySelection = (day: day) => {
    setSelectedDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
  };

  const saveSchedules = (workout: Workout, days: day[]) => {
    if (schedule.workout.name === 'null') {
      const schedules: Schedule[] = [...workoutState.schedules, { workout, day: days }];
      workoutState.setSchedules(schedules);
    } else {
      const schedules: Schedule[] = workoutState.schedules.map(s =>
        s.workout.name === schedule.workout.name ? { workout, day: days } : s
      );
      workoutState.setSchedules(schedules);
    }
    setSelectedDays([]);
    setSelectedWorkout(null);
    navigation.navigate('Workout', { initialTab: 'previousSchedules' });
    navigation.setParams({ schedule: undefined, initialTab: undefined });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Workout</Text>
      <Menu
        visible={workoutMenuVisible}
        onDismiss={() => setWorkoutMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setWorkoutMenuVisible(true)}
            style={styles.dropdown}
            labelStyle={styles.buttonText}
          >
            {selectedWorkout?.name || 'Choose a workout'}
          </Button>
        }
      >
        {workoutState.workouts.length > 0 &&
          workoutState.workouts.map((workout, idx) => (
            <Menu.Item
              key={idx}
              title={workout.name}
              onPress={() => {
                setSelectedWorkout(workout);
                setWorkoutMenuVisible(false);
              }}
            />
          ))}
      </Menu>

      <Text style={[styles.label, { marginTop: 20 }]}>Select Days</Text>
      <View style={styles.daysContainer}>
        {days.map((day, idx) => (
          <Checkbox.Item
            key={idx}
            label={day}
            position="leading"
            labelStyle={styles.dayText}
            color="#6366f1"
            status={selectedDays.includes(day as day) ? 'checked' : 'unchecked'}
            onPress={() => toggleDaySelection(day as day)}
            style={styles.dayItem}
          />
        ))}
      </View>

      {selectedWorkout !== null && selectedDays.length > 0 && (
        <TouchableOpacity
          onPress={() => saveSchedules(selectedWorkout, selectedDays)}
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>Schedule Workout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    padding: 16,
    paddingTop: 40,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#1f1f3a',
    borderRadius: 12,
    borderWidth: 0,
  },
  buttonText: {
    color: 'white',
    textAlign: 'left',
  },
  daysContainer: {
    marginTop: 8,
  },
  dayItem: {
    backgroundColor: '#1f1f3a',
    borderRadius: 10,
    marginVertical: 4,
  },
  dayText: {
    color: 'white',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    marginTop: 40,
  },
  submitText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CreateSchedule;

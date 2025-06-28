import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Button, Checkbox } from 'react-native-paper';

const CreateSchedule = ({ onSave }: { onSave: () => void }) => {
  const [workoutMenuVisible, setWorkoutMenuVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const workouts = ['Push Day', 'Leg Day', 'Cardio'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDaySelection = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
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
            {selectedWorkout || 'Choose a workout'}
          </Button>
        }
      >
        {workouts.map((workout, idx) => (
          <Menu.Item
            key={idx}
            title={workout}
            onPress={() => {
              setSelectedWorkout(workout);
              setWorkoutMenuVisible(false);
            }}
          />
        ))}
      </Menu>

      <Text style={[styles.label, { marginTop: 20 }]}>Select Days</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, idx) => (
          <Checkbox.Item
            key={idx}
            label={day}
            position="leading"
            labelStyle={styles.dayText}
            color="#6366f1"
            status={selectedDays.includes(day) ? 'checked' : 'unchecked'}
            onPress={() => toggleDaySelection(day)}
            style={styles.dayItem}
          />
        ))}
      </View>

      <TouchableOpacity onPress={onSave} style={styles.submitButton}>
        <Text style={styles.submitText}>Schedule Workout</Text>
      </TouchableOpacity>
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

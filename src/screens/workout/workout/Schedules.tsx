import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { format, addDays, startOfWeek } from 'date-fns';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useWorkoutStore } from '~/store/workout';
import { day } from '~/types';
import { useNavigation } from '@react-navigation/native';

const getWeekDates = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

const WeeklyWorkoutSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<day>(format(new Date(), 'EEEE') as day);
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const workoutState = useWorkoutStore();
  const navigation = useNavigation<any>();

  const weekDates = getWeekDates();

  const filteredWorkouts = workoutState.schedules.filter(workout =>
    workout.day.includes(selectedDate),
  );

  const toggleExpand = (name: string) => {
    setExpandedWorkout(prev => (prev === name ? null : name));
  };

  const handleEdit = (workoutName: string) => {
    const schedule = workoutState.schedules.find(s => s.workout.name === workoutName);
    if (schedule) {
      navigation.navigate('Add', {
        screen: 'AddMain',
        params: {
          schedule: schedule,
          initialTab: 'createSchedule',
        },
      });
    }
    console.log('Edit schedule workout:', workoutName);
    // Navigate or open modal logic goes here
  };

  const handleDelete = (workoutName: string) => {
    workoutState.removeSchedule(workoutName);
    console.log('Delete schedule workout:', workoutName);
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: '#0f0f23' }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 40 }}
      ListHeaderComponent={
        <>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 24 }}>
            Weekly Schedule
          </Text>

          {/* Week Strip */}
          <FlatList
            data={weekDates}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toDateString()}
            contentContainerStyle={{ marginBottom: 24 }}
            renderItem={({ item: date }) => {
              const isActive = (format(date, 'EEEE') as day) === selectedDate;
              return (
                <Pressable
                  onPress={() => setSelectedDate(format(date, 'EEEE') as day)}
                  style={{
                    marginHorizontal: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 16,
                    alignItems: 'center',
                    backgroundColor: isActive ? '#4f46e5' : '#1e1e3f',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isActive ? 0.4 : 0,
                    shadowRadius: 4,
                  }}
                >
                  <Text style={{ color: isActive ? '#fff' : '#ccc', fontSize: 14 }}>
                    {format(date, 'EEE')}
                  </Text>
                  <Text
                    style={{ color: isActive ? '#fff' : '#aaa', fontWeight: '700', fontSize: 18 }}
                  >
                    {format(date, 'd')}
                  </Text>
                </Pressable>
              );
            }}
          />

          {filteredWorkouts.length === 0 && (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Ionicons name="calendar-outline" size={40} color="#4c4c80" />
              <Text style={{ color: '#888', fontSize: 16, marginTop: 8 }}>
                No workout scheduled for this day.
              </Text>
            </View>
          )}
        </>
      }
      data={filteredWorkouts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        const isExpanded = expandedWorkout === item.workout.name;

        return (
          <Pressable
            onPress={() => toggleExpand(item.workout.name)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              borderRadius: 24,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#c7d2fe' }}>
                {item.workout.name}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <TouchableOpacity onPress={() => handleEdit(item.workout.name)}>
                  <Feather name="edit" size={18} color="#c7d2fe" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.workout.name)}>
                  <Feather name="trash-2" size={18} color="#ef4444" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleExpand(item.workout.name)}>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={22}
                    color="#c7d2fe"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{ color: '#aaa', marginBottom: 4 }}>
              Exercises: <Text style={{ color: '#fff' }}>{item.workout.exercises.length}</Text>
            </Text>
            <Text style={{ color: '#aaa' }}>
              Avg Time: <Text style={{ color: '#fff' }}>{item.workout.avgTime} min</Text>
            </Text>

            {isExpanded && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: '#c7d2fe', fontWeight: 'bold', marginBottom: 4 }}>
                  Exercise List:
                </Text>
                {item.workout.exercises.map((exercise, idx) => (
                  <Text key={idx} style={{ color: '#eee', marginLeft: 8, marginBottom: 2 }}>
                    • {exercise.name}
                  </Text>
                ))}
              </View>
            )}
          </Pressable>
        );
      }}
    />
  );
};

export default WeeklyWorkoutSchedule;

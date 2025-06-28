import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { format, addDays, startOfWeek, isSameDay, subDays } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

interface Workout {
  name: string;
  exercises: string[];
  avgTime: number;
  date: Date;
}

const dummyWorkouts: Workout[] = [
  {
    name: 'Push Day',
    exercises: ['Bench Press', 'Shoulder Press', 'Triceps Dips'],
    avgTime: 45,
    date: new Date(),
  },
  {
    name: 'Leg Day',
    exercises: ['Squat', 'Lunges', 'Calf Raises'],
    avgTime: 50,
    date: subDays(new Date(), 1),
  },
  {
    name: 'Cardio',
    exercises: ['Running', 'Jump Rope'],
    avgTime: 30,
    date: subDays(new Date(), 2),
  },
];

const getWeekDates = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

const WeeklyWorkoutSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

  const weekDates = getWeekDates();

  const filteredWorkouts = dummyWorkouts.filter((workout) =>
    isSameDay(workout.date, selectedDate)
  );

  const toggleExpand = (name: string) => {
    setExpandedWorkout((prev) => (prev === name ? null : name));
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
            keyExtractor={(item) => item.toDateString()}
            contentContainerStyle={{ marginBottom: 24 }}
            renderItem={({ item: date }) => {
              const isActive = isSameDay(date, selectedDate);
              return (
                <Pressable
                  onPress={() => setSelectedDate(date)}
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
                  <Text style={{ color: isActive ? '#fff' : '#aaa', fontWeight: '700', fontSize: 18 }}>
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
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => {
        const isExpanded = expandedWorkout === item.name;

        return (
          <Pressable
            onPress={() => toggleExpand(item.name)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              borderRadius: 24,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#c7d2fe' }}>
                {item.name}
              </Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={22}
                color="#c7d2fe"
              />
            </View>

            <Text style={{ color: '#aaa', marginBottom: 4 }}>
              Exercises: <Text style={{ color: '#fff' }}>{item.exercises.length}</Text>
            </Text>
            <Text style={{ color: '#aaa' }}>
              Avg Time: <Text style={{ color: '#fff' }}>{item.avgTime} min</Text>
            </Text>

            {isExpanded && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: '#c7d2fe', fontWeight: 'bold', marginBottom: 4 }}>
                  Exercise List:
                </Text>
                {item.exercises.map((exercise, idx) => (
                  <Text key={idx} style={{ color: '#eee', marginLeft: 8, marginBottom: 2 }}>
                    • {exercise}
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

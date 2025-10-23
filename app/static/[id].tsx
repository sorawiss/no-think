import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';  // From library
import { loadHabitById, getHabitCompletions } from '../lib/database';  // Adjust path
import { Habit, CompletionItem } from '../types/habit';



export default function HabitDetails() {
    const { id } = useLocalSearchParams();
    const [habit, setHabit] = useState<Habit | null>(null);
    const [markedDates, setMarkedDates] = useState({});  // For calendar
    const [stats, setStats] = useState({ percentage: 0, completions: 0, totalDays: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const loadedHabit = await loadHabitById(id as string);
            if (!loadedHabit) return;
            setHabit(loadedHabit);

            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

            const completions = await getHabitCompletions(id as string, startOfMonth, endOfMonth);
            const totalDays = new Date(endOfMonth).getDate();  // Days in month

            // Calculate successful completions (filter based on type/condition)
            let successful = 0;
            const marked = {};  // For calendar
            completions.forEach(c => {
                const isSuccess = loadedHabit.type === 'yes_no' ||
                    (loadedHabit.type === 'timer' &&
                        ((loadedHabit.condition === 'more_than' && c.duration >= loadedHabit.duration) ||
                            (loadedHabit.condition === 'less_than' && c.duration < loadedHabit.duration)));
                if (isSuccess) successful++;
                marked[c.completion_date] = { selected: true, selectedColor: isSuccess ? 'green' : 'red' };  // Green success, red failure
            });

            const percentage = (successful / totalDays * 100).toFixed(1);
            setStats({ percentage, completions: successful, totalDays });
            setMarkedDates(marked);
        };
        fetchData();
    }, [id]);

    if (!habit) return <Text>Loading...</Text>;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{habit.name}</Text>
            {/* 1. Calendar with success/unsuccess overview */}
            <Calendar
                markingType={'multi-dot'}
                markedDates={markedDates}  // Green for success, red for unsuccess
                onDayPress={(day) => console.log('Tapped day:', day.dateString)}  // Optional: Add interaction
            />
            {/* 2. Monthly percentage */}
            <Text>Completed this month: {stats.percentage}%</Text>
            {/* 3. Completions count */}
            <Text>Completed {stats.completions} times out of {stats.totalDays} days</Text>
        </View>
    );
}
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getHabitCompletions, manageCompletion } from '../lib/database';
import colors from '../theme/colors';
import getDate from '../utils/getDate';
import { typography } from './Text';


interface HabbitProps {
    name: string;
    description?: string;
    habitId: string;
}

const daysData = getDate();



const Habbit = ({ name, description, habitId }: HabbitProps) => {
    const [completedDays, setCompletedDays] = useState<number[]>([]);


    // Load completions
    useEffect(() => {
        const loadCompletions = async () => {
            try {
                const startDate = daysData[5].dateString;
                const endDate = daysData[0].dateString;
                const completionDates = await getHabitCompletions(habitId, startDate, endDate);
                console.log("completion return", completionDates);


                // Convert YYYY-MM-DD to day numbers for state
                const completedNumbers = completionDates.map(date => {
                    const dayDate = new Date(date);
                    return dayDate.getDate();
                });

                setCompletedDays(completedNumbers);
            } catch (error) {
                console.error('Failed to load completions:', error);
            }
        };

        loadCompletions();
    }, [habitId]);



    const handleDayPress = async (dayNumber: number, dateString: string) => {
        try {
            // let duration = null;
            // if (type === 'timer') {
            //     duration = await showDurationInput();
            // }

            await manageCompletion(habitId, dateString);

            // Update local state optimistically
            setCompletedDays(prev =>
                prev.includes(dayNumber)
                    ? prev.filter(d => d !== dayNumber)
                    : [...prev, dayNumber]
            );
        } catch (error) {
            console.error('Failed to update completion:', error);
            alert('Failed to update habit completion');
        }
    };

    console.log("completedDays", completedDays);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={[typography.h2, { color: colors.primary }]}>{name}</Text>
                    {description && (
                        <Text style={[typography.h5, { color: colors.secondary }]}>{description}</Text>
                    )}
                </View>
            </View>

            {/* Days List Section */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
                {daysData.map((day) => {
                    const isCompleted = completedDays.includes(day.number);
                    return (
                        <View key={day.number} style={styles.dayItem}>
                            <Text style={styles.dayName}>{day.name}</Text>
                            <TouchableOpacity
                                style={[styles.dayButton, isCompleted && styles.dayButtonCompleted]}
                                onPress={() => handleDayPress(day.number, day.dateString)}
                            >
                                <Text style={[styles.dayNumber, isCompleted && styles.dayNumberCompleted]}>
                                    {day.number}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};


// --- 5. Styling ---
const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        paddingBlock: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    daysContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    dayItem: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    dayName: {
        color: '#718096', // A medium gray
        fontSize: 12,
        marginBottom: 8,
    },
    dayButton: {
        width: 40,
        height: 40,
        borderRadius: 20, // Half of width/height to make it a circle
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: 'transparent',
    },
    dayButtonCompleted: {
        backgroundColor: colors.primary,
    },
    dayNumber: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dayNumberCompleted: {
        color: '#1A202C', // Dark text color for contrast on green background
    }
});

export default Habbit;
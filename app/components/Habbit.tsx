import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { typography } from './Text';
import colors from '../theme/colors';


interface HabbitProps {
    name: string;
    description?: string;
}

const daysData = [
    { name: 'Fri', number: 28 },
    { name: 'Sat', number: 29 },
    { name: 'Sun', number: 30 },
    { name: 'Mon', number: 31 },
    { name: 'Tue', number: 1 },
    { name: 'Today', number: 2 },
];

const Habbit = ({ name, description }: HabbitProps) => {
    const [completedDays, setCompletedDays] = useState([28, 29, 30, 31, 1, 2]);

    const handleDayPress = (dayNumber: number) => {
        if (completedDays.includes(dayNumber)) {
            setCompletedDays(currentDays => currentDays.filter(day => day !== dayNumber));
        } else {
            setCompletedDays(currentDays => [...currentDays, dayNumber]);
        }
    };


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
                                onPress={() => handleDayPress(day.number)}
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
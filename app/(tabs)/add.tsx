import React, { useState } from 'react';
import {
    Button,
    Picker,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text, { typography } from "../components/Text";
import { colors } from '../theme/colors';
import styles from "../theme/styles";

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


// Type Safety
const HABIT_TYPES = {
    YES_NO: 'yes_no',
    TIMER: 'timer',
};
const TIMER_CONDITIONS = {
    MORE_THAN: 'more_than',
    LESS_THAN: 'less_than',
};



function AddScreen() {
    const [step, setStep] = useState(1);
    const [habitType, setHabitType] = useState<string | null>(null);
    const [habitName, setHabitName] = useState('');
    const [habitDescription, setHabitDescription] = useState('');
    const [timerDuration, setTimerDuration] = useState('');
    const [timerCondition, setTimerCondition] = useState(TIMER_CONDITIONS.MORE_THAN);

    const handleTypeSelect = (type: string) => {
        setHabitType(type);
        setStep(2);
    };


    // Handle Submit
    //----------------------
    const handleSubmit = () => {
        // Basic validation
        if (!habitName.trim()) {
            alert('Habit name is required!');
            return;
        }
        if (habitType === HABIT_TYPES.TIMER && !timerDuration) {
            alert('Timer duration is required!');
            return;
        }

        // Create habit object
        const habit = {
            type: habitType,
            name: habitName,
            description: habitDescription,
            ...(habitType === HABIT_TYPES.TIMER && {
                duration: parseInt(timerDuration, 10),
                condition: timerCondition,
            }),
        };

        console.log('Saving habit:', habit);

        // Reset
        setStep(1);
        setHabitType(null);
        setHabitName('');
        setHabitDescription('');
        setTimerDuration('');
        setTimerCondition(TIMER_CONDITIONS.MORE_THAN);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Step 1 */}
            {/* ---------------------- */}
            {step === 1 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                    <Text style={[typography.h1, { marginBottom: 20 }]} >Select Habit Type</Text>

                    {/* Yes/No */}
                    <TouchableOpacity
                        style={Styles.choiceContainer}
                        onPress={() => handleTypeSelect(HABIT_TYPES.YES_NO)}
                        accessibilityLabel="Select Yes/No habit type"
                    >
                        <MaterialIcons name="task-alt" size={24} color="black" />
                        <Text style={{ color: colors.background }} >Yes/No</Text>
                    </TouchableOpacity>

                    {/* Timer-based */}
                    <TouchableOpacity
                        style={Styles.choiceContainer}
                        onPress={() => handleTypeSelect(HABIT_TYPES.TIMER)}
                        accessibilityLabel="Select Timer-based habit type"
                    >
                        <AntDesign name="clock-circle" size={24} color="black" />
                        <Text style={{ color: colors.background }} >Timer-Based</Text>
                    </TouchableOpacity>
                </View>
            ) :
                // Step 2
                // ----------------------
                (
                    <View >
                        <Text >Enter Habit Details</Text>
                        <Text >
                            Type: {habitType === HABIT_TYPES.YES_NO ? 'Yes/No' : 'Timer'}
                        </Text>

                        {/* Common fields for both types */}
                        <TextInput
                            placeholder="Habit Name (e.g., Drink Water)"
                            value={habitName}
                            onChangeText={setHabitName}
                            accessibilityLabel="Enter habit name"
                            placeholderTextColor={colors.primary}
                            style={Styles.input}
                        />
                        <TextInput
                            placeholder="Description (optional)"
                            value={habitDescription}
                            onChangeText={setHabitDescription}
                            accessibilityLabel="Enter habit description"
                            style={[Styles.input, { height: 80, textAlignVertical: 'top' }]}
                            multiline
                        />

                        {/* Timer-specific fields */}
                        {habitType === HABIT_TYPES.TIMER && (
                            <>
                                <TextInput
                                    placeholder="Duration (minutes)"
                                    value={timerDuration}
                                    onChangeText={setTimerDuration}
                                    keyboardType="numeric"
                                    accessibilityLabel="Enter duration in minutes"
                                    style={Styles.input}
                                    placeholderTextColor={colors.primary}
                                />
                                <Text >Timer Condition</Text>
                                <Picker
                                    selectedValue={timerCondition}
                                    onValueChange={(value: string) => setTimerCondition(value)}
                                    accessibilityLabel="Select timer condition"
                                >
                                    <Picker.Item
                                        label="More than this duration"
                                        value={TIMER_CONDITIONS.MORE_THAN}
                                    />
                                    <Picker.Item
                                        label="Less than this duration"
                                        value={TIMER_CONDITIONS.LESS_THAN}
                                    />
                                </Picker>
                            </>
                        )}

                        <Button
                            title="Save Habit"
                            onPress={handleSubmit}
                            color={colors.background}
                            accessibilityLabel="Save habit"
                        />
                        <Button
                            title="Back"
                            onPress={() => setStep(1)}
                            color={colors.background}
                            accessibilityLabel="Go back to habit type selection"
                        />
                    </View>
                )}
        </SafeAreaView>
    )
}


// Style
//------------------
const Styles = StyleSheet.create({
    choiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        gap: 10,
        minWidth: '40%',
    },
    input: {
        color: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
})


export default AddScreen
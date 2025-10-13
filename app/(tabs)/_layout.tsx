import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from "expo-router";
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from "../theme/colors";



export default function RootLayout() {


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Tabs screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        shadowOpacity: 0,
                        elevation: 0,
                        backgroundColor: colors.background
                    }

                }}>
                    {/* Habit Screen */}
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "Habits",
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="fire" size={size} color={color} />
                            ),
                        }}
                    />

                    {/* Add Screen */}
                    <Tabs.Screen
                        name="add"
                        options={{
                            title: "Add",
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="plus" size={size} color={color} />
                            ),
                        }}
                    />
                </Tabs>
            </View>
        </SafeAreaView>
    );
}
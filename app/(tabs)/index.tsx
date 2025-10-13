import { FlatList, View } from "react-native";
import styles from "../theme/styles";
import Text from "../components/Text";
import { getAllHabits } from "../lib/database";
import { useCallback, useEffect, useState } from "react";
import { Habit } from "../types/habit";
import { useFocusEffect } from "expo-router";




export default function Index() {
  const [habits, setHabits] = useState<Habit[]>([])


  const loadHabits = useCallback(async () => {
    try {
      const loadedHabits = await getAllHabits();
      setHabits(loadedHabits as Habit[]);
    } catch (error) {
      console.error("Failed to load habits:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [loadHabits])
  );


  function renderHabit({ item }: { item: Habit }) {
    return (
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
        {item.description && <Text>{item.description}</Text>}
        <Text>Type: {item.type}</Text>
        {item.type === 'timer' && (
          <Text>Duration: {item.duration} minutes</Text>
        )}
      </View>
    );
  }


  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={habits}
        renderItem={renderHabit}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}




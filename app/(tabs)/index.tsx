import { FlatList, View } from "react-native";
import styles from "../theme/styles";
import Text from "../components/Text";
import { clearDb, getAllHabits } from "../lib/database";
import { useCallback, useEffect, useState } from "react";
import { Habit } from "../types/habit";
import { useFocusEffect } from "expo-router";
import Habbit from "../components/Habbit";
import { Button } from "react-native";




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
      <View >
        <Habbit name={item.name} description={item.description} habitId={item.id} />
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

      <Button
        title="clear"
        onPress={() => clearDb()}
      />

    </View>
  );
}




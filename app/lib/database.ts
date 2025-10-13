import * as SQLite from 'expo-sqlite';
import { Habit } from '../types/habit';


// Initialize tables
//--------------------------
export const initDB = async () => {
    const db = await SQLite.openDatabaseAsync('habits.db');
    await db.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY NOT NULL,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      duration INTEGER,
      condition TEXT
    );
    CREATE TABLE IF NOT EXISTS completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id TEXT NOT NULL,
      completion_date TEXT NOT NULL,
      duration INTEGER,
      FOREIGN KEY (habit_id) REFERENCES habits (id)
    );
  `);
    console.log('Database initialized');
    return db; // Return db if needed in components
};



// Save a habit (async insert/update)
//--------------------------------
export const saveHabit = async (habit: Habit) => {
    const db = await SQLite.openDatabaseAsync('habits.db');
    await db.runAsync(
        `INSERT OR REPLACE INTO habits (id, type, name, description, duration, condition) 
     VALUES (?, ?, ?, ?, ?, ?);`,
        [habit.id, habit.type, habit.name, habit.description || null, habit.duration || null, habit.condition || null]
    );
    console.log('Habit saved into database');
};


// Get all habits
//--------------------------
export async function getAllHabits() {
    const db = await SQLite.openDatabaseAsync('habits.db');
    const result = await db.getAllAsync('SELECT * FROM habits');
    return result;
}



// DEV
// Clear db
export async function clearDb() {
    const db = await SQLite.openDatabaseAsync('habits.db');
    await db.execAsync('DELETE FROM habits');
    console.log('Database cleared');
}
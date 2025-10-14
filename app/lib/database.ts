import * as SQLite from 'expo-sqlite';
import { Habit } from '../types/habit';

interface CompletionItem {
  completion_date: string;
  duration: number;
}

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


// Get completions for a habit in a date range
//-------------------------------------------------
export const getHabitCompletions = async (habitId: string, startDate: string, endDate: string) => {
  console.log('Getting habit completions', habitId, startDate, endDate);
  const db = await SQLite.openDatabaseAsync('habits.db');

  try {
    const [actualStart, actualEnd] = [startDate, endDate].sort();

    const completions = await db.getAllAsync(
      `SELECT completion_date, duration 
       FROM completions 
       WHERE habit_id = ? AND 
             date(completion_date) BETWEEN date(?) AND date(?)
       ORDER BY completion_date;`,
      [habitId, actualStart, actualEnd]
    );
    return (completions as CompletionItem[]).map((c: CompletionItem) => c.completion_date);
  } catch (error) {
    console.error('Error in getHabitCompletions:', error);
    return [];
  }
};



// Log or remove completion
export const manageCompletion = async (habitId: string, dateString: string, duration?: number) => {
  const db = await SQLite.openDatabaseAsync('habits.db');

  // Check if completion exists
  const existing = await db.getFirstAsync<{ id: number }>(
    'SELECT id FROM completions WHERE habit_id = ? AND completion_date = ?',
    [habitId, dateString]
  );

  if (existing?.id) {
    // Remove completion (uncheck)
    await db.runAsync('DELETE FROM completions WHERE id = ?', [existing.id]);
    return { action: 'deleted', id: existing.id };
  } else {
    // Add completion (check)
    const result = await db.runAsync(
      'INSERT INTO completions (habit_id, completion_date, duration) VALUES (?, ?, ?)',
      [habitId, dateString, duration || null]
    );
    console.log('Completion added:', result.lastInsertRowId);
    return { action: 'created', id: result.lastInsertRowId };
  }
};



// DEV
// Clear db
export async function clearDb() {
  const db = await SQLite.openDatabaseAsync('habits.db');
  await db.execAsync('DELETE FROM habits');
  console.log('Database cleared');
}
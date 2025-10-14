export interface Habit {
    id: string;
    type: string;
    name: string;
    description?: string;
    duration?: number;
    condition?: string;
}

export interface CompletionItem {
    id: number;
    habit_id: string;
    completion_date: string;
    duration?: number;
}

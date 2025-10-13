export interface Habit {
    id: string;
    type: string;
    name: string;
    description?: string;
    duration?: number;
    condition?: string;
}
export interface Task {
    id: number;
    title: string;
    description: string;
    state: "pending" | "during" | "completed"
}

export enum TaskStateColor {
    pending = "bg-neutral-300",
    during = "bg-orange-400",
    completed = "bg-green-400",
}

export enum TaskNextState {
    pending = "during",
    during = "completed",
    completed = "during"
}
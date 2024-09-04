import { Task } from "../types/task";
import { api } from "./api";

// Get all tasks by state or not
export const getTasks = async (state?: "pending" | "during" | "completed"): Promise<Task[]> => {
  const response = await api.get("/tasks", {
    params: { state }
  });
  return response.data;
};

// Add a new task to the list of tasks
export const addTask = async (task: Task): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data;
};

// Update a task
export const updateTask = async (id: number, task: Task): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

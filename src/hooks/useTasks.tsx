import { useEffect } from "react";
import { Task } from "../types/task"; // Définir le type Task dans un fichier types.ts
import { useDispatch, useSelector } from "react-redux";
import {
  createTask as createTaskOnStore,
  updateTask as updateTaskOnStore,
  deleteTask as deleteTaskOnStore,
  fetchTasks,
} from "../store/taskSlice";

import {
  AppDispatch,
  RootState,
} from "../store";
// import { RootState, createTask as createTaskOnStore, updateTask as updateTaskOnStore } from "../store/store";

interface taskProps {
  title: String;
  description?: String;
  state?: "pending" | "during" | "completed";
}

interface updateTaskProps {
  id: number;
  task: Task;
}

const useTasks = () => {
  const { tasks } = useSelector((state: RootState) => state?.tasks);
  const dispatch = useDispatch<AppDispatch>();
  
  const filterTask = async (state?: "pending" | "during" | "completed") => {

    // Refresh by the filter options the task list
    await dispatch(fetchTasks(state));
  };

  const addTask = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const newTask: taskProps = { title: title, description: description };

    // Create the new task
    await dispatch(createTaskOnStore(newTask));

    // Refresh the task list
    await dispatch(fetchTasks());
  };

  const updateTask = async (id: number, formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const state = formData.get("state") as "pending" | "during" | "completed";

    const newTask: taskProps = { title: title, description: description, state: state };

    // Create the new task
    await dispatch(updateTaskOnStore({id, task: newTask} as updateTaskProps));

    // Refresh the task list
    await dispatch(fetchTasks());
  };

  const deleteTask = async (id: number) => {
    // Delete the task
    await dispatch(deleteTaskOnStore(id));

    // Refresh the task list
    await dispatch(fetchTasks());
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return { tasks, addTask, updateTask, deleteTask, filterTask };
};

export default useTasks;

import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Task } from "../types/task";
import {
  addTask as apiCreateTask,
  getTasks as apiGetTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../services/task.services";

interface taskSliceProps {
  status: "idle" | "loading" | "succeeded" | "failed";
  tasks: Task[];
}

interface taskProps {
  title: String;
  description?: String;
}

interface updateTaskProps {
  id: number;
  task: Task;
}

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (state?: "pending" | "during" | "completed") => {
    const response = await apiGetTask(state);
    return response;
  }
);

export const createTask = createAsyncThunk<Task, taskProps>(
  "tasks/createTask",
  async (taskData: taskProps) => {
    const newTask = <Task>{
      title: taskData?.title,
      description: taskData?.description,
      state: "pending",
    };
    const response = (await apiCreateTask(newTask)) as Task;
    // console.log("The response was: ", response);
    return response;
  }
);

export const updateTask = createAsyncThunk<Task, updateTaskProps>(
  "tasks/updateTask",
  async (taskData: updateTaskProps) => {
    const response = await apiUpdateTask(taskData?.id, taskData?.task);
    return response;
  }
);

export const deleteTask = createAsyncThunk<void, number>(
  "tasks/deleteTask",
  async (id: number) => {
    const response = await apiDeleteTask(id);
    return response;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: <taskSliceProps>{
    status: "idle",
    tasks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
  },
});

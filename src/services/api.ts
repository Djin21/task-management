import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";
import { Task } from "../types/task";
import { User, UserLoginParams } from "../types/user";

export const api = axios.create();

const mock = new axiosMockAdapter(api);

// User mock
const users: User[] = [
  { id: 1, name: "John Doe", email: "john@gmail.com", password: "password" },
];

// Handle login request
mock.onPost("/auth/login").reply((config) => {
  // Get request parameters
  const userParam = JSON.parse(config.data) as UserLoginParams;

  // Find the user with the specified params
  const isUser = users.find(
    (user) =>
      user.email === userParam.email && user.password === userParam.password
  );

  // If user is found, generate a token and return it with the user data
  if (!!isUser) {
    const encryptedToken = "token-123";

    return [201, { ...isUser, token: encryptedToken } as User];
  } else {
    // If user is not found, return 404
    return [404, isUser];
  }
});


// Task mock
// Declare variables for handle tasks
const tasks: Task[] = [
  { id: 1, title: "Task 1", description: "sdfdf", state: "pending" },
  { id: 2, title: "Task 2", description: "sdfdf", state: "pending" },
  { id: 3, title: "Task 3", description: "sdfdf", state: "pending" },
];

// Handle get request task
mock.onGet("/tasks").reply((config) => {
  const params = config?.params;
  const state = params?.state as "pending" | "during" | "completed" | null;

  if (state) {
    const response = tasks.filter((task) => task?.state === state);
    return [200, response];
  } else {
    return [200, tasks];
  }
});

// Handle post request task for add a new task
mock.onPost("/tasks").reply((config) => {
  const newTask = JSON.parse(config.data);
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  return [201, newTask];
});

// Handle put request tasks for update a specify
mock.onPut(/\/tasks\/\d+/).reply((config) => {
  const id = parseInt(config.url!.split("/").pop()!, 10);
  const updatedTask = JSON.parse(config.data);
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index] = { id, ...updatedTask };
  return [200, updatedTask];
});

// Handle delete tasks for delete a specific task
mock.onDelete(/\/tasks\/\d+/).reply((config) => {
  const id = parseInt(config.url!.split("/").pop()!, 10);
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
  return [204];
});

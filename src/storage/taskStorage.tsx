import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types";

const TASKS_KEY = "TODO_APP_TASKS_v2";

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.log("Error saving tasks", e);
  }
};

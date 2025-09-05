import React, { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types";
import { loadTasks, saveTasks } from "../storage/taskStorage";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "toastify-react-native";

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, description?: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadTasks();
      setTasks(
        storedTasks.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    };
    fetchTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add task
  const addTask = async (title: string, description?: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    Toast.success("Task added successfully");
    return Promise.resolve();
  };

  // Toggle completion
  const toggleTask = async (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, completed: !t.completed };
          if (updated.completed) {
            Toast.success("Task marked complete");
          } else {
            Toast.info("Task marked incomplete");
          }
          return updated;
        }
        return t;
      })
    );
    return Promise.resolve();
  };

  // Delete task
  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    Toast.error("Task deleted successfully");
    return Promise.resolve();
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

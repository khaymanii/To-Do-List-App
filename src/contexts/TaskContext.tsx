import React, { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types";
import { loadTasks, saveTasks } from "../storage/taskStorage";
import { v4 as uuidv4 } from "uuid";

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, description?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadTasks();
      setTasks(storedTasks);
    };
    fetchTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, description?: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
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

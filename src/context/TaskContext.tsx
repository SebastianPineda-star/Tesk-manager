import { createContext, useContext, useState, useEffect } from "react";
import type { Task } from "../services/taskService";
import { getUserTasks, createTask, updateTask, deleteTask } from "../services/taskService";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  refreshTasks: () => void;
  addTask: (task: Omit<Task, "status" | "id">) => Promise<void>;
  editTask: (index: number, updated: Omit<Task, "status" | "id">) => Promise<void>;
  removeTask: (index: number) => Promise<void>;
  completeTask: (index: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshTasks = async () => {
    setLoading(true);
    const data = await getUserTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const addTask = async (task: Omit<Task, "status" | "id">) => {
    await createTask({ ...task, status: "Pendiente" });
    await refreshTasks();
  };

  const editTask = async (index: number, updated: Omit<Task, "status" | "id">) => {
    const id = tasks[index].id!;
    await updateTask(id, updated);
    await refreshTasks();
  };

  const removeTask = async (index: number) => {
    const id = tasks[index].id!;
    await deleteTask(id);
    await refreshTasks();
  };

  const completeTask = async (index: number) => {
    const id = tasks[index].id!;
    await updateTask(id, { status: "Completada" });
    await refreshTasks();
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, refreshTasks, addTask, editTask, removeTask, completeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
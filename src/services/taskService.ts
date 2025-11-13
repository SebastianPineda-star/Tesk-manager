import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { auth } from "../services/firebase";

export interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: "Alta" | "Media" | "Baja";
  status: "Pendiente" | "En progreso" | "Completada";
  tags?: string[];
  id?: string;
}

export const createTask = async (task: Task) => {
  const user = auth.currentUser;
  if (!user) return;
  await addDoc(collection(db, "tasks"), {
    ...task,
    uid: user.uid,
  });
};

export const getUserTasks = async () => {
  const user = auth.currentUser;
  if (!user) return [];
  const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Task));
};

export const updateTask = async (id: string, updatedTask: Partial<Task>) => {
  await updateDoc(doc(db, "tasks", id), updatedTask);
};

export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, "tasks", id));
};
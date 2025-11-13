import { useTasks } from "../context/TaskContext";
import { useState} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: "Alta" | "Media" | "Baja";
  status: "Pendiente" | "En progreso" | "Completada";
  id?: string;
}


const DashboardPage = () => {
  const navigate = useNavigate();
  const { tasks, addTask, editTask, removeTask, completeTask } = useTasks();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("Todas");
  const [filterPriority, setFilterPriority] = useState<string>("Todas");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterTag, setFilterTag] = useState<string>("Todas");


  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleCreateOrUpdateTask = async (task: Omit<Task, "status" | "id">) => {
    if (editingIndex !== null) {
      await editTask(editingIndex, task);
      setEditingIndex(null);
    } else {
      await addTask(task);
    }
  };

  const handleEditTask = (index: number) => {
    setEditingIndex(index);
  };

  const handleDeleteTask = async (index: number) => {
    await removeTask(index);
  };

  const handleCompleteTask = async (index: number) => {
    await completeTask(index);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completada").length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filterStatus === "Todas" || task.status === filterStatus;
    const priorityMatch =
      filterPriority === "Todas" || task.priority === filterPriority;
    const searchMatch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());  
    const tagMatch =
      filterTag === "Todas" || (task.tags || []).includes(filterTag);
    return statusMatch && priorityMatch && searchMatch && tagMatch;
  });


  return (
    <div className="container container-lg min-h-screen p-lg">
      <div className="flex justify-between items-center mb-xl">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
        >
          Cerrar sesión
        </button>
      </div>
      
      <TaskForm
        onCreate={handleCreateOrUpdateTask}
        initialData={editingIndex !== null ? tasks[editingIndex] : undefined}
      />
      
      <div className="card mb-lg">
        <div className="form-group mb-md">
          <label className="form-label">Buscar tareas</label>
          <input
            type="text"
            placeholder="Buscar por título o descripción"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-md">
          <div className="form-group flex-1">
            <label className="form-label">Filtrar por estado</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select"
            >
              <option value="Todas">Todas</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>
          
          <div className="form-group flex-1">
            <label className="form-label">Filtrar por prioridad</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="form-select"
            >
              <option value="Todas">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          
          <div className="form-group flex-1">
            <label className="form-label">Filtrar por etiqueta</label>
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="form-select"
            >
              <option value="Todas">Todas</option>
              {[...new Set(tasks.flatMap((t) => t.tags || []))].map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card mb-lg">
        <p className="font-medium mb-sm">Progreso: {progress}% completado</p>
        <div className="w-full" style={{ 
          backgroundColor: 'var(--color-bg-tertiary)', 
          borderRadius: 'var(--radius-md)', 
          height: '1rem',
          overflow: 'hidden'
        }}>
          <div
            style={{ 
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(135deg, var(--color-success) 0%, #66bb6a 100%)',
              transition: 'width var(--transition-base)'
            }}
          ></div>
        </div>
      </div>
      
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
};

export default DashboardPage;
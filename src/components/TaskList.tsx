import TaskItem from "./TaskItem";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: "Alta" | "Media" | "Baja";
  status: "Pendiente" | "En progreso" | "Completada";
}

interface Props {
  tasks: Task[];
  onDelete: (index: number) => void;
  onComplete: (index: number) => void;
  onEdit: (index: number) => void;
}

const TaskList = ({ tasks, onDelete, onComplete, onEdit }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className="card text-center">
        <p className="text-secondary">No hay tareas aún. Crea una nueva tarea para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-lg mt-lg">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
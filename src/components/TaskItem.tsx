interface Task {
    title: string;
    description: string;
    dueDate: string;
    priority: "Alta" | "Media" | "Baja";
    status: "Pendiente" | "En progreso" | "Completada";
  }
  
  interface Props {
    task: Task;
    index: number;
    onDelete: (index: number) => void;
    onComplete: (index: number) => void;
    onEdit: (index: number) => void;
  }
  
  const TaskItem = ({ task, index, onDelete, onComplete, onEdit }: Props) => {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{task.title}</h3>
        </div>
        <div className="card-body">
          <p className="mb-md">{task.description}</p>
          <div className="flex flex-col gap-sm text-secondary">
            <p>📅 Fecha: {task.dueDate}</p>
            <p>⚡ Prioridad: <span className="text-primary">{task.priority}</span></p>
            <p>📌 Estado: <span className="text-primary">{task.status}</span></p>
          </div>
        </div>
        <div className="flex gap-md mt-lg">
          {task.status !== "Completada" && (
            <button
              onClick={() => onComplete(index)}
              className="btn btn-primary btn-sm"
            >
              Marcar como completada
            </button>
          )}
          <button
            onClick={() => onEdit(index)}
            className="btn btn-secondary btn-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(index)}
            className="btn btn-danger btn-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  };
  
  export default TaskItem;
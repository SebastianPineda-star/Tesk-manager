import { useState, useEffect } from "react";

interface Task {
    title: string;
    description: string;
    dueDate: string;
    priority: "Alta" | "Media" | "Baja";
    tags?: string[];
  }

  const TaskForm = ({
    onCreate,
    initialData,
  }: {
    onCreate: (task: Task) => void;
    initialData?: Task;
  }) => {

    const [task, setTask] = useState<Task>(
      initialData || {
        title: "",
        description: "",
        dueDate: "",
        priority: "Media",
      }
    );

    const [tagsInput, setTagsInput] = useState<string>(
      initialData?.tags?.join(", ") || ""
    );
  
    useEffect(() => {
      if (initialData) setTask(initialData);
    }, [initialData]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setTask({ ...task, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const tags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      
      onCreate({ ...task, tags });
      
      setTask({ title: "", description: "", dueDate: "", priority: "Media" });
      setTagsInput("");
    };

    return (
      <form onSubmit={handleSubmit} className="card max-w-md mx-auto mb-xl">
        <h2 className="text-xl font-bold mb-lg">
          {initialData ? "Editar tarea" : "Nueva tarea"}
        </h2>
        <div className="form-group">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Título de la tarea"
            value={task.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            placeholder="Descripción de la tarea"
            value={task.description}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha de vencimiento</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Prioridad</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Etiquetas (separadas por comas)</label>
          <input
            type="text"
            placeholder="Ej: trabajo, importante, urgente"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="form-input"
          />
          <p className="form-help">Separa las etiquetas con comas</p>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          {initialData ? "Actualizar tarea" : "Crear tarea"}
        </button>
      </form>
    );
};

export default TaskForm;
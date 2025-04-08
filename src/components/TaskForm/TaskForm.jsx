import { useState, useEffect } from 'react';

function TaskForm({ addTask, editingTask, updateTask, setEditingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  // Si hay una tarea en edición, carga sus datos en el formulario
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({});
  }, [editingTask]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, title, description);
    } else {
      addTask(title, description);
    }

    // Reiniciar el formulario
    setTitle('');
    setDescription('');
    setErrors({});
  };

  const handleCancel = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">
        {editingTask ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          id="title"
          autoFocus
          pattern='[A-Za-z0-9 ]{3,50}'
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Descripción de la tarea (Min 3 caracteres, Max 250 caracteres)"
          rows="3"
          pattern='[A-Za-z0-9 ]{3,250}'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>
      
      <div className="flex items-center justify-end space-x-3">
        {editingTask && (
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingTask ? 'Actualizar' : 'Añadir'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
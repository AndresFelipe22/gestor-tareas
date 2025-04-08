import React from 'react'

function TaskItem({ task, toggleComplete, deleteTask, setEditingTask }) {
    const formattedDate = () => {
      try {
        // Convertir el string ISO a objeto Date
        const date = new Date(task.createdAt);
        
        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
          return 'fecha desconocida';
        }
        
        // Obtener el tiempo transcurrido en milisegundos
        const now = new Date();
        const diffMs = now - date;
        
        // Convertir a diferentes unidades de tiempo
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        // Formatear el tiempo relativo
        if (diffSecs < 60) {
          return 'hace unos segundos';
        } else if (diffMins < 60) {
          return `hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
        } else if (diffHours < 24) {
          return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
        } else if (diffDays < 30) {
          return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
        } else {
          // Formatear la fecha completa para fechas más antiguas
          return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        }
      } catch (error) {
        console.error("Error al formatear fecha:", error);
        return 'fecha desconocida';
      }
    };
  
    return (
      <div className={`border-b border-gray-200 last:border-b-0 p-4 transition-all ${
        task.completed ? 'bg-gray-50' : ''
      }`}>
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <div className="ml-3 flex-1">
            <h3 className={`text-lg font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <span>Creada {formattedDate()}</span>
            </div>
          </div>
          <div className="ml-4 flex space-x-2">
            <button
              onClick={() => setEditingTask(task)}
              className="p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
              title="Editar tarea"
            >Editar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-1 text-gray-500 hover:text-red-600 focus:outline-none"
              title="Eliminar tarea"
            >Borar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

export default TaskItem

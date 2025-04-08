import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import TaskFilter from './components/TaskFilter/TaskFilter.jsx';
import TaskStats from './components/TaskStats/TaskStats.jsx';

function App() {
  // Modelo de datos para cada tarea
  const initialTasks = [
    {
      id: uuidv4(),
      title: "Aprender React",
      description: "Estudiar los fundamentos de React",
      completed: false,
      createdAt: new Date().toISOString() // Guardar como string ISO
    }
  ];

  // Estados principales
  const [tasks, setTasks] = useState(() => {
    // Intenta cargar tareas desde localStorage
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
      try {
        // Parsear el JSON desde localStorage
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
        return initialTasks;
      }
    }
    
    return initialTasks;
  });
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingTask, setEditingTask] = useState(null);

  // Guarda las tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Función para añadir una nueva tarea
  const addTask = (title, description) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString() // Guardar como string ISO
    };
    setTasks([...tasks, newTask]);
  };

  // Función para eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función para cambiar el estado de completado
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Función para editar una tarea
  const updateTask = (id, title, description) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title, description } : task
    ));
    setEditingTask(null);
  };

  // Filtrar tareas basadas en el estado actual
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Gestión de Tareas</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <TaskForm 
              addTask={addTask} 
              editingTask={editingTask} 
              updateTask={updateTask} 
              setEditingTask={setEditingTask} 
            />
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <TaskFilter filter={filter} setFilter={setFilter} />
          </div>
          <div className="p-6">
            <TaskList 
              tasks={filteredTasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              setEditingTask={setEditingTask}
            />
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <TaskStats tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
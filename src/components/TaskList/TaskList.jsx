import TaskItem from '../TaskItem/TaskItem';

function TaskList({ tasks, toggleComplete, deleteTask, setEditingTask }) {
    if (tasks.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          No hay tareas disponibles.
        </div>
      );
    }
  
    return (
      <div className="divide-y divide-gray-200">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            setEditingTask={setEditingTask}
          />
        ))}
      </div>
    );
  }
  
  export default TaskList;
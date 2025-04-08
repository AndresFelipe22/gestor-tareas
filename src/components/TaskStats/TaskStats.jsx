function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  
  // Calcula el porcentaje de tareas completadas
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-blue-600 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-blue-600">{pendingTasks}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-sm text-green-600 mb-1">Completadas</p>
          <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Progreso</span>
          <span className="text-sm font-medium text-gray-800">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;
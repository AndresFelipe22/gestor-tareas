function TaskFilter({ filter, setFilter }) {
    return (
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 px-4 text-center text-sm font-medium ${
            filter === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center text-sm font-medium ${
            filter === 'active'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setFilter('active')}
        >
          Pendientes
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center text-sm font-medium ${
            filter === 'completed'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setFilter('completed')}
        >
          Completadas
        </button>
      </div>
    );
  }
  
  export default TaskFilter;
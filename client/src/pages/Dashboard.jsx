import React, { useState } from 'react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Initial Frontend Setup", status: "Completed" },
    { id: 2, title: "Tailwind CSS Integration", status: "In Progress" },
  ]);
  const [newTask, setNewTask] = useState("");

  // CREATE: Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const taskObj = {
      id: Date.now(),
      title: newTask,
      status: "In Progress"
    };
    setTasks([...tasks, taskObj]);
    setNewTask("");
  };

  // UPDATE: Change status from In Progress to Completed
  const handleToggleStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "Completed" ? "In Progress" : "Completed" } 
        : task
    ));
  };

  // DELETE: Remove a task
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen font-sans text-slate-900">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Staff Portal</h1>
            <p className="text-slate-500 mt-1">Manage your internship tasks below.</p>
          </div>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-100 border border-red-100 transition-all">
            Logout
          </button>
        </div>

        <form onSubmit={handleAddTask} className="flex gap-4 mb-10">
          <input 
            type="text" 
            placeholder="Enter new task name..." 
            className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
            Add Task
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-slate-400 text-sm uppercase tracking-widest">
                <th className="pb-4 px-4 font-medium">Description</th>
                <th className="pb-4 px-4 font-medium">Status</th>
                <th className="pb-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="bg-slate-50 hover:shadow-md transition-shadow">
                  <td className="p-5 rounded-l-2xl font-semibold text-slate-700">{task.title}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-5 rounded-r-2xl text-right space-x-2">
                    {/* The UPDATE Button */}
                    <button 
                      onClick={() => handleToggleStatus(task.id)}
                      className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-md text-sm font-bold transition-all"
                    >
                      {task.status === "Completed" ? "Undo" : "Done"}
                    </button>
                    {/* The DELETE Button */}
                    <button 
                      onClick={() => handleDelete(task.id)} 
                      className="text-red-500 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-bold transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tasks.length === 0 && <div className="text-center py-10 text-slate-400 italic">No tasks found. Add one above!</div>}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FiPlus, FiSearch, FiTrash2, FiEdit3, FiEye, 
  FiCheckCircle, FiCircle, FiLogOut, FiActivity,
  FiGrid, FiCheckSquare, FiClock, FiMenu, FiX, FiMessageSquare 
} from "react-icons/fi";
import api from "@/services/api";

type Task = {
  id: number;
  title: string;
  status: boolean;
  remarks?: string; // New field
};

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task | null>(null);

  // Calculate Stats
  const completedCount = tasks.filter(t => t.status).length;
  const pendingCount = tasks.length - completedCount;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
  }, [router]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (search) params.search = search;
      if (filter === "completed") params.status = true;
      if (filter === "pending") params.status = false;

      const res = await api.get("/tasks", { params });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchTasks(), 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, filter]);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (error) { console.error(error); }
  };

  const toggleStatus = async (task: Task) => {
    try {
      await api.put(`/tasks/${task.id}`, { status: !task.status });
      fetchTasks();
    } catch (error) { console.error(error); }
  };

  const deleteTask = async (id: number) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) { console.error(error); }
  };

  const updateTask = async () => {
    if (!editingTask) return;
    try {
      // Sending both title and remarks to the API
      await api.put(`/tasks/${editingTask.id}`, { 
        title: editingTask.title,
        remarks: editingTask.remarks 
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) { console.error(error); }
  };

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#020203] text-zinc-100">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#09090b] border-r border-zinc-800 p-6 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg"><FiActivity className="text-white" size={20} /></div>
            <span className="font-bold text-xl tracking-tight">FocusFlow</span>
          </div>
          <button className="md:hidden text-zinc-500" onClick={() => setIsSidebarOpen(false)}><FiX size={24} /></button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 mb-8">
          <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4">Daily Progress</p>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-800" />
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" 
                  strokeDasharray={150.8}
                  strokeDashoffset={150.8 - (150.8 * progressPercent) / 100}
                  className="text-indigo-500 transition-all duration-1000" 
                />
              </svg>
              <span className="absolute text-[10px] font-bold">{progressPercent}%</span>
            </div>
            <div>
              <p className="text-sm font-bold">{completedCount} Done</p>
              <p className="text-xs text-zinc-500">{pendingCount} Left</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<FiGrid />} label="All Tasks" active={filter === 'all'} onClick={() => { setFilter('all'); setIsSidebarOpen(false); }} />
          <NavItem icon={<FiClock />} label="Pending" active={filter === 'pending'} onClick={() => { setFilter('pending'); setIsSidebarOpen(false); }} />
          <NavItem icon={<FiCheckSquare />} label="Completed" active={filter === 'completed'} onClick={() => { setFilter('completed'); setIsSidebarOpen(false); }} />
        </nav>

        <button onClick={logout} className="mt-auto flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold text-red-400 bg-red-400/5 hover:bg-red-400/10 transition-all border border-red-400/10">
          <FiLogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col p-4 md:p-12 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <button className="md:hidden p-2 bg-zinc-900 rounded-lg border border-zinc-800" onClick={() => setIsSidebarOpen(true)}><FiMenu size={20} /></button>
          <div className="hidden md:block">
            <h2 className="text-3xl font-bold tracking-tight">In-box</h2>
            <p className="text-zinc-400 text-sm">Organize your workflow effectively.</p>
          </div>
          <div className="relative w-64 lg:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input className="w-full pl-11 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-indigo-500/50 outline-none text-sm transition-all" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full">
            <div className="group relative bg-zinc-900 border border-zinc-800 rounded-[2rem] p-2 mb-10 focus-within:border-indigo-500/50 transition-all shadow-2xl">
                <div className="flex items-center">
                    <input className="flex-1 bg-transparent border-none focus:ring-0 px-8 py-4 rounded-[2rem] text-zinc-200 placeholder:text-zinc-600" placeholder="What's your next move?" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} />
                    <button onClick={addTask} className="bg-indigo-600 text-white p-4 rounded-[1.5rem] font-bold hover:bg-indigo-500 transition-all"><FiPlus size={20} /></button>
                </div>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="py-20 flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-zinc-500 tracking-widest uppercase font-bold">Refreshing Data</span>
                </div>
              ) : (
                tasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={() => toggleStatus(task)} onView={() => setViewTask(task)} onEdit={() => setEditingTask(task)} onDelete={() => deleteTask(task.id)} />
                ))
              )}
            </div>
        </div>
      </main>

      {/* MODALS */}
      {(viewTask || editingTask) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[60] p-6">
              <div className="bg-[#09090b] border border-zinc-800 rounded-[2.5rem] w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 shadow-2xl">
                  {viewTask && (
                      <div className="p-10">
                          <h3 className="text-2xl font-bold mb-2 text-zinc-100">{viewTask.title}</h3>
                          <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 ${viewTask.status ? 'bg-indigo-500/20 text-indigo-400' : 'bg-red-500/20 text-red-400'}`}>
                            {viewTask.status ? 'Completed' : 'Pending'}
                          </div>
                          
                          <div className="space-y-4 text-left">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Remarks / Blockers</h4>
                            <p className="text-zinc-300 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-sm leading-relaxed min-h-[100px]">
                              {viewTask.remarks || "No remarks provided for this task."}
                            </p>
                          </div>

                          <button onClick={() => setViewTask(null)} className="w-full bg-zinc-800 py-4 rounded-2xl font-bold mt-8 hover:bg-zinc-700 transition-colors">Close</button>
                      </div>
                  )}

                  {editingTask && (
                      <div className="p-10">
                          <h3 className="text-xl font-bold mb-6 text-zinc-100">Edit Task Details</h3>
                          
                          <div className="space-y-5">
                            <div>
                              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Task Title</label>
                              <input
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-200 focus:border-indigo-500 outline-none transition-all"
                                value={editingTask.title}
                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Remarks (Why isn't it done?)</label>
                              <textarea
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-200 focus:border-indigo-500 outline-none transition-all min-h-[120px] resize-none"
                                placeholder="Add reasons, blockers, or notes..."
                                value={editingTask.remarks || ""}
                                onChange={(e) => setEditingTask({ ...editingTask, remarks: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 mt-8">
                            <button onClick={updateTask} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all">Save Changes</button>
                            <button onClick={() => setEditingTask(null)} className="flex-1 bg-zinc-800 text-zinc-400 py-4 rounded-2xl font-bold hover:bg-zinc-700 transition-all">Cancel</button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      )}
    </div>
  );
}

/* ---------- HELPER COMPONENTS ---------- */

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'}`}>
      <span className={active ? "text-indigo-400" : "text-zinc-600"}>{icon}</span>
      {label}
    </button>
  );
}

function TaskItem({ task, onToggle, onView, onEdit, onDelete }: { task: Task, onToggle: any, onView: any, onEdit: any, onDelete: any }) {
  return (
    <div className="group flex items-center justify-between bg-zinc-900/30 border border-zinc-800/40 rounded-[1.5rem] p-4 hover:border-zinc-700 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onToggle} className={`text-2xl transition-all ${task.status ? 'text-indigo-500' : 'text-zinc-700 hover:text-zinc-500'}`}>
          {task.status ? <FiCheckCircle /> : <FiCircle />}
        </button>
        <div className="flex flex-col">
          <span className={`text-base font-medium transition-all ${task.status ? "text-zinc-600 line-through" : "text-zinc-200"}`}>
            {task.title}
          </span>
          {/* Badge to show if there are remarks */}
          {task.remarks && !task.status && (
            <div className="flex items-center gap-1 text-amber-500/80 text-[10px] mt-1 font-bold italic">
              <FiMessageSquare size={10} /> Has Remarks
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button onClick={onView} className="p-2 text-zinc-500 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg" title="View Details"><FiEye size={18} /></button>
        <button onClick={onEdit} className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg" title="Edit Remarks"><FiEdit3 size={18} /></button>
        <button onClick={onDelete} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg" title="Delete"><FiTrash2 size={18} /></button>
      </div>
    </div>
  );
}
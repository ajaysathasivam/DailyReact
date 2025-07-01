import { useEffect, useState } from "react";
import WeekTaskListComponent from "./WeekTaskListComponent";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const STORAGE_KEY = "week_day_tasks";
const initWeek = {
  mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false,
};

const WeekTrackerComponent = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  const saveTasks = (newTasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = { id: Date.now(), title: task, week: { ...initWeek } };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
    setTask("");
  };

  const handleMarkAs = (taskId, dayKey) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, week: { ...t.week, [dayKey]: true } } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto backdrop-blur-md bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Weekly Motivation Tracker 💫
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          One step each day leads to success. Track it. Own it. ✅
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g. 30 min workout, Learn 10 words..."
          className="w-full rounded-xl shadow-md"
        />
        <Button
          onClick={addTask}
          className="rounded-xl bg-blue-500 hover:bg-blue-600 transition-all shadow-md"
        >
          Add Task
        </Button>
      </div>

      <WeekTaskListComponent tasks={tasks} handleMarkAs={handleMarkAs} />
    </div>
  );
};

export default WeekTrackerComponent;

import { useMemo, useState, useEffect } from "react";
import { DisplayTasks } from "./DisplayTasks";
import { AddTaskForm } from "./AddTaskForm";
import { FilterInput } from "./FilterInput";
import { ITask } from "./Interfaces/ITask";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState("");
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const changeCompleted = (taskId: number, newCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: newCompleted } : task
      )
    );
  };
  const addTask = (title: string, completed: boolean) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { title, completed, id: Date.now() },
    ]);
    setToggleAddTask(false);
  };
  const cancelEdit = () => {
    setToggleAddTask(false);
  };
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const updateTask = (taskId: number, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };
  const updateFilter = (input: string) => {
    setFilter(input);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
        setTasks([]);
      }
    }
  }, []);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (caseSensitive) {
        return task.title.includes(filter);
      } else {
        return task.title.toLowerCase().includes(filter.toLowerCase());
      }
    });
  }, [tasks, filter, caseSensitive]);
  return (
    <div className="app-container">
      {toggleAddTask ? (
        <AddTaskForm addTask={addTask} cancelEdit={cancelEdit} />
      ) : (
        <div>
          <FilterInput input={filter} changeFilter={updateFilter} />
          <label htmlFor="case-sensitive">
            Case Sensitive
            <input
              id="case-sensitive"
              type="checkbox"
              checked={caseSensitive}
              onChange={() => setCaseSensitive((prev) => !prev)}
            />
          </label>
          <button
            className="add-task-button"
            onClick={() => setToggleAddTask(true)}>
            ⊕
          </button>
          <DisplayTasks
            tasks={filteredTasks}
            changeCompleted={changeCompleted}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      )}
    </div>
  );
}
export default App;

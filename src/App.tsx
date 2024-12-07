import { useMemo, useState, useEffect} from "react";
import { DisplayTasks } from "./DisplayTasks";
import { AddTaskForm } from "./AddTaskForm";
import { FilterInput } from "./FilterInput";
import { ITask } from "./Interfaces/ITask";
function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState("");
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const changeCompleted = (taskId: number, newCompleted: boolean) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: newCompleted } : task
    );
    setTasks(updatedTasks);
  };
  const addTask = (title: string, completed: boolean) => {
    setTasks([...tasks, { title, completed, id: Date.now() }]);
    setToggleAddTask(false);
  };
  const cancelEdit = () => {
    setToggleAddTask(false);
  };
  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id != id);
    setTasks([...newTasks]);
  };
  const updateTask = (taskId: number, newTitle: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
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
        return task.title.indexOf(filter) !== -1;
      } else {
        return task.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      }
    });
  }, [tasks, filter, caseSensitive]);
  if (toggleAddTask) {
    return <AddTaskForm addTask={addTask} cancelEdit={cancelEdit} />;
  } else {
    return (
        <>
                <FilterInput input={filter} changeFilter={updateFilter} />
          <label>
            Case Sensitive
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={() => setCaseSensitive(!caseSensitive)}></input>
          </label>
          <button
            style={{ border: "none", background: "none", cursor: "pointer" }}
            onClick={() => setToggleAddTask(true)}>
            ⊕
          </button>
          <DisplayTasks
            tasks={filteredTasks}
            changeCompleted={changeCompleted}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </>
    );
  }
}

export default App;

import { FormEvent, useState } from "react";

type AddTaskFormProps = {
  addTask: (task: string, important: boolean) => void;
  cancelEdit: () => void;
};

export const AddTaskForm = ({ addTask, cancelEdit }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(title, completed);
  };
  return (
    <form
      onSubmit={handleSave}
      style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="task-title">
        Task Title:
        <input
          id="task-title"
          type="text"
          required
          value={title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="task-completed">
        Mark as Important:
        <input
          id="task-completed"
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
      </label>
      <button type="submit" disabled={title.length === 0}>
        Save
      </button>
      <button type="button" onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
};

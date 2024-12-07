import { useState } from "react";
import "./DisplayTask.css";
import {ITask } from "./Interfaces/ITask";
import { ITaskHandlers } from "./Interfaces/ITaskHandler";

interface ITaskProps extends ITask, ITaskHandlers {}

export const DisplayTask: React.FC<ITaskProps> = ({
  id,
  title,
  completed,
  changeCompleted,
  updateTask,
  deleteTask
}) => {
  const [theTitle, setTheTitle] = useState<string>(title); 
  const [editTitle, setEditTitle] = useState<boolean>(false); 

  const handleSave = () => {
    updateTask(id, theTitle); 
    setEditTitle(false); 
  };
  const handleCancel = () => {
    setTheTitle(title)
    setEditTitle(false)
  }

  return (
    <p style={{ fontSize: "16px" }}>
      {editTitle ? (
        <>
          <input
            type="text"
            value={theTitle} 
            onChange={(e) => setTheTitle(e.target.value)} 
            style={{ fontSize: "16px" }}
          />
          <button onClick={handleSave}>
          ✅
          </button>
          <button onClick={handleCancel}>
          🗙
          </button>
        </>
      ) : (
        <>
          {`${title}`}
          <button
            onClick={() => changeCompleted(id, !completed)}
          >
            {completed ? "☑" : "☐"}
          </button>
          <button
            onClick={() => setEditTitle(true)} 
          >
            ✎
          </button>
          <button onClick={() => {deleteTask(id)}}>🗑</button>
        </>
      )}
    </p>
  );
};

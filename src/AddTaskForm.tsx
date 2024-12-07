import React from "react";
import { FormEvent, SetStateAction, useState } from "react";

export const AddTaskForm = ({addTask,cancelEdit}) => {
    const [title,setTitle] = useState("")
    const [important,setImportant] = useState(false)
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTitle(e.target.value)
    }
    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTask(title,important)
    }
    return (
        <form onSubmit={(e) => (handleSave(e)) } style={{display:"flex", flexDirection:"column"}}>
            <label>Task Title:
                <input type="text" required value={title} onChange={handleChange}/>
            </label>
            <label>Completed:
                <input type="checkbox" checked={important} onChange={() => setImportant(!important)}></input>
            </label>
            <button type="submit" disabled={title.length === 0}> save </button>
            <button type="reset" onClick={cancelEdit}>Cancel</button>
        </form>
    )
}
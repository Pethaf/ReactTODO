import React from "react"
import { DisplayTask } from "./DisplayTask"
export const DisplayTasks = ({tasks,changeCompleted,updateTask, deleteTask}) => {
    return (
        <>
       {tasks.map(task => <DisplayTask key={task.id} {...task} changeCompleted={changeCompleted} updateTask={updateTask} deleteTask={deleteTask}/>)}
        </>
    )
}
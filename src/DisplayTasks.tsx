import { ITask } from "./Interfaces/ITask";
import { ITaskHandlers } from "./Interfaces/ITaskHandler";
  import { DisplayTask } from "./DisplayTask";
  
  interface IDisplayTasksProps extends ITaskHandlers {
    tasks: ITask[];
  }
  export const DisplayTasks = ({
    tasks,
    changeCompleted,
    updateTask,
    deleteTask,
  }: IDisplayTasksProps) => {
    if(tasks.length === 0){
        return <p>No Tasks To Display</p>
    }
    return (
      <>
        {tasks.map((task) => (
          <DisplayTask
            key={task.id}
            {...task}
            changeCompleted={changeCompleted}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </>
    );
  };
  
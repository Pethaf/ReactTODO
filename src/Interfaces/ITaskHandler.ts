export interface ITaskHandlers {
  changeCompleted: (taskId: number, newCompleted: boolean) => void;
  updateTask: (taskId: number, newTitle: string) => void;
  deleteTask: (taskId: number) => void;
}

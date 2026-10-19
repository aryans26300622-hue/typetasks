//  Literal union: a status can ONLY be one of these 3 exact strings
export type TaskStatus = "todo" | "in-progress" | "done";

//  Every task must have exactly these 3 properties
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}
//  Returns a NEW array (original is not changed)
export function addTask(tasks: Task[], title: string): Task[] {
  //  Unique id: highest existing id + 1 (starts at 1 if the list is empty)
  const newId: number = Math.max(0, ...tasks.map((t) => t.id)) + 1;

  const newTask: Task = {
    id: newId,
    title: title,
    status: "todo",
  };

  return [...tasks, newTask];
}
// Returns a NEW array where the task with matching id becomes "done"
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task): Task =>
    task.id === id ? { ...task, status: "done" } : task
  );
}
//  Returns only tasks whose status matches
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task): boolean => task.status === status);
}
//  Which status comes next. Record<TaskStatus, TaskStatus> forces ALL 3 keys to exist
const nextStatus: Record<TaskStatus, TaskStatus> = {
  "todo": "in-progress",
  "in-progress": "done",
  "done": "done", // already finished, stays "done"
};

//  Returns a NEW array where the matching task moves one stage forward
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task): Task =>
    task.id === id ? { ...task, status: nextStatus[task.status] } : task
  );
}
//  Returns a NEW array (original is not changed)
export function addTask(tasks, title) {
    //  Unique id: highest existing id + 1 (starts at 1 if the list is empty)
    const newId = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    const newTask = {
        id: newId,
        title: title,
        status: "todo",
    };
    return [...tasks, newTask];
}
// Returns a NEW array where the task with matching id becomes "done"
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
//  Returns only tasks whose status matches
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
//  Which status comes next. Record<TaskStatus, TaskStatus> forces ALL 3 keys to exist
const nextStatus = {
    "todo": "in-progress",
    "in-progress": "done",
    "done": "done", // already finished, stays "done"
};
//  Returns a NEW array where the matching task moves one stage forward
export function advanceTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: nextStatus[task.status] } : task);
}

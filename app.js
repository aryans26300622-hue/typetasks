import { addTask, advanceTask, filterByStatus } from "./model.js";
let tasks = [];
let filter = "all";
// Casts tell tsc exactly which element each one is, so .value and .onclick are typed
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const summaryEl = document.getElementById("summary");
const chips = document.querySelectorAll(".chip");
// Uses the typed filterByStatus from model.ts
function visibleTasks() {
    return filter === "all" ? tasks : filterByStatus(tasks, filter);
}
function render() {
    const shown = visibleTasks();
    listEl.innerHTML = "";
    if (shown.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No tasks here yet.";
        listEl.appendChild(empty);
    }
    shown.forEach((task) => {
        const li = document.createElement("li");
        li.className = `task ${task.status}`;
        const title = document.createElement("span");
        title.className = "title";
        title.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = `badge ${task.status}`;
        badge.textContent = task.status;
        const advance = document.createElement("button");
        advance.className = "advance";
        advance.textContent = "→";
        advance.disabled = task.status === "done";
        advance.onclick = () => {
            tasks = advanceTask(tasks, task.id); //  typed model does the work
            render();
        };
        li.append(title, badge, advance);
        listEl.appendChild(li);
    });
    const doneCount = filterByStatus(tasks, "done").length;
    summaryEl.textContent = `${tasks.length} total · ${doneCount} done`;
    chips.forEach((chip) => {
        chip.classList.toggle("active", chip.dataset.filter === filter);
    });
}
function handleAdd() {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title); //  returns a fresh Task[]
    titleInput.value = "";
    render();
}
addBtn.onclick = handleAdd;
titleInput.onkeydown = (e) => {
    if (e.key === "Enter")
        handleAdd();
};
chips.forEach((chip) => {
    chip.onclick = () => {
        filter = chip.dataset.filter;
        render();
    };
});
render();

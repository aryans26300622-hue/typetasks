import { Task, TaskStatus, addTask, advanceTask, filterByStatus } from "./model.js";

// "all" is not a TaskStatus, so the filter gets its own union type
type Filter = "all" | TaskStatus;

let tasks: Task[] = [];
let filter: Filter = "all";

// Casts tell tsc exactly which element each one is, so .value and .onclick are typed
const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const summaryEl = document.getElementById("summary") as HTMLParagraphElement;
const chips = document.querySelectorAll<HTMLButtonElement>(".chip");

// Uses the typed filterByStatus from model.ts
function visibleTasks(): Task[] {
  return filter === "all" ? tasks : filterByStatus(tasks, filter);
}

function render(): void {
  const shown: Task[] = visibleTasks();
  listEl.innerHTML = "";

  if (shown.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No tasks here yet.";
    listEl.appendChild(empty);
  }

  shown.forEach((task: Task): void => {
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
    advance.onclick = (): void => {
      tasks = advanceTask(tasks, task.id); //  typed model does the work
      render();
    };

    li.append(title, badge, advance);
    listEl.appendChild(li);
  });

  const doneCount: number = filterByStatus(tasks, "done").length;
  summaryEl.textContent = `${tasks.length} total · ${doneCount} done`;

  chips.forEach((chip: HTMLButtonElement): void => {
    chip.classList.toggle("active", chip.dataset.filter === filter);
  });
}

function handleAdd(): void {
  const title: string = titleInput.value.trim();
  if (!title) return;
  tasks = addTask(tasks, title); //  returns a fresh Task[]
  titleInput.value = "";
  render();
}

addBtn.onclick = handleAdd;
titleInput.onkeydown = (e: KeyboardEvent): void => {
  if (e.key === "Enter") handleAdd();
};

chips.forEach((chip: HTMLButtonElement): void => {
  chip.onclick = (): void => {
    filter = chip.dataset.filter as Filter;
    render();
  };
});

render();
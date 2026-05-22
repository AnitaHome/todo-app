const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");
const todoCount = document.getElementById("todo-count");
const progressBar = document.getElementById("progress-bar");
const emptyState = document.getElementById("empty-state");

// Restore saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function updateStats() {
  const items = todoList.querySelectorAll(".todo-item");
  const completed = todoList.querySelectorAll(".todo-item.is-completed");
  const total = items.length;
  const done = completed.length;

  todoCount.textContent = `${total} 項`;
  progressBar.style.width = total > 0 ? `${(done / total) * 100}%` : "0%";
  emptyState.style.display = total === 0 ? "block" : "none";
}

// Initialize empty state
updateStats();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) {
    return;
  }

  const li = document.createElement("li");
  li.className = "todo-item";

  const span = document.createElement("span");
  span.textContent = text;

  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.className = "complete-btn";
  completeButton.textContent = "完成";
  completeButton.addEventListener("click", () => {
    li.classList.toggle("is-completed");
    completeButton.textContent = li.classList.contains("is-completed")
      ? "取消"
      : "完成";
    updateStats();
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "刪除";
  deleteButton.addEventListener("click", () => {
    li.classList.add("is-removing");
    li.addEventListener("animationend", () => {
      li.remove();
      updateStats();
    }, { once: true });
  });

  li.append(span, completeButton, deleteButton);
  todoList.appendChild(li);

  updateStats();

  todoInput.value = "";
  todoInput.focus();
});

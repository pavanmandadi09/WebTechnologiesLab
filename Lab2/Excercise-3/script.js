const addTaskBtn = document.getElementById("addTaskBtn");
const taskNameInput = document.getElementById("taskName");
const message = document.getElementById("message");
const columns = document.querySelectorAll(".column-body");

// Format current date as DD/MM/YYYY
function getCurrentDate() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Create a new task card DOM element
function createTaskCard(text) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.draggable = true;

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = text;

  const date = document.createElement("div");
  date.className = "task-date";
  date.textContent = "Created: " + getCurrentDate();

  card.appendChild(title);
  card.appendChild(date);

  addDragEvents(card);
  return card;
}

// Add Task button handler
addTaskBtn.addEventListener("click", () => {
  const text = taskNameInput.value.trim();
  if (!text) return;

  const card = createTaskCard(text);
  document.querySelector("#todo .column-body").appendChild(card);
  taskNameInput.value = "";
  message.textContent = "";
});

// Enable Enter key to add
taskNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

// Drag and drop logic
let draggedCard = null;

function addDragEvents(card) {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
    setTimeout(() => card.classList.add("hide"), 0);
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("hide");
    draggedCard = null;
  });
}

columns.forEach((col) => {
  col.addEventListener("dragover", (e) => {
    e.preventDefault();
    col.classList.add("drag-over");
  });

  col.addEventListener("dragleave", () => {
    col.classList.remove("drag-over");
  });

  col.addEventListener("drop", () => {
    col.classList.remove("drag-over");
    if (!draggedCard) return;
    col.appendChild(draggedCard);

    const parentColumn = col.parentElement.id;
    if (parentColumn === "completed") {
      // Mark as completed
      draggedCard.classList.add("completed");
      message.textContent = "Task Completed Successfully";
      // Optionally clear message after a few seconds
      setTimeout(() => (message.textContent = ""), 3000);
    } else {
      draggedCard.classList.remove("completed");
      message.textContent = "";
    }
  });
});

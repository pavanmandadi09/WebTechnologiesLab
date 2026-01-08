const STORAGE_KEY = "users";

// Elements
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const usersTableBody = document.querySelector("#usersTable tbody");
const clearAllBtn = document.getElementById("clearAllBtn");

// Get users array from localStorage
function getUsers() {
  const data = localStorage.getItem(STORAGE_KEY); // [web:64][web:71]
  return data ? JSON.parse(data) : [];
}

// Save users array to localStorage
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users)); // [web:64][web:71]
}

// Render users table
function renderUsers() {
  const users = getUsers();
  usersTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.mobile}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;

    usersTableBody.appendChild(tr);
  });
}

// Show message text
function showMessage(text, isError = true) {
  message.style.color = isError ? "#e53935" : "green";
  message.textContent = text;
}

// Form submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const mobile = mobileInput.value.trim();
  const password = passwordInput.value.trim();

  // Validations
  if (!name || !email || !mobile || !password) {
    showMessage("All fields are mandatory.");
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    showMessage("Mobile number must be exactly 10 digits.");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.");
    return;
  }

  let users = getUsers();

  // No duplicate email
  const alreadyExists = users.some((u) => u.email === email); // [web:61][web:62]
  if (alreadyExists) {
    showMessage("Email is already registered.");
    return;
  }

  // Create user object
  const newUser = {
    name,
    email,
    mobile,
    password
  };

  users.push(newUser);
  saveUsers(users);
  renderUsers();
  showMessage("User registered successfully!", false);

  form.reset();
});

// Delete single user (event delegation)
usersTableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    let users = getUsers();
    users.splice(index, 1); // remove from array [web:72][web:75]
    saveUsers(users);
    renderUsers();
    showMessage("User deleted.", false);
  }
});

// Clear all users
clearAllBtn.addEventListener("click", function () {
  if (!confirm("Are you sure you want to clear all users?")) return;
  localStorage.removeItem(STORAGE_KEY); // or localStorage.clear() for all keys [web:67][web:73]
  renderUsers();
  showMessage("All users cleared.", false);
});

// Initial render on page load
renderUsers();

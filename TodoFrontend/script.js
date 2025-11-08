// Shared script for login, register, and todos pages
const SERVER_URL = "http://localhost:8080";
let token = localStorage.getItem("token");

// Login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.token) throw new Error("Invalid Credentials");
        localStorage.setItem("token", data.token);
        window.location.href = "todos.html";
    })
    .catch(err => alert(err.message));
}

// Register
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (!res.ok) return res.text().then(txt => { throw new Error(txt); });
        alert("Registration Successful! Please Login.");
        window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}
// Create Todo Card UI
function createTodoCard(todo) {
    const card = document.createElement("div");
    card.className = "todo-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.onchange = () => updateTodoStatus(todo.id, todo.title, checkbox.checked);

    const span = document.createElement("span");
    span.id = `todo-text-${todo.id}`;
    span.textContent = todo.title;
    if (todo.isCompleted) span.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.className = "todo-btn edit-btn";
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    editBtn.onclick = () => enableEditMode(card, todo);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "todo-btn delete-btn";
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteBtn.onclick = () => deleteTodo(todo.id);

    card.appendChild(checkbox);
    card.appendChild(span);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);

    return card;
}

// Enable Edit Mode (Compact UI)
function enableEditMode(card, todo) {
    card.classList.add("editing");
    card.innerHTML = "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.onchange = () => updateTodoStatus(todo.id, todo.title, checkbox.checked);

    const input = document.createElement("input");
    input.value = todo.title;
    input.className = "edit-input";
    setTimeout(() => input.focus(), 10); // ✅ Auto-focus

    const saveBtn = document.createElement("button");
    saveBtn.className = "todo-btn save-btn";
    saveBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    saveBtn.onclick = () => updateTodoStatus(todo.id, input.value.trim(), todo.isCompleted);

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "todo-btn cancel-btn";
    cancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    cancelBtn.onclick = loadTodos;

    card.appendChild(checkbox);
    card.appendChild(input);
    card.appendChild(saveBtn);
    card.appendChild(cancelBtn);
}
// Load Todos
function loadTodos() {
    token = localStorage.getItem("token");
    if (!token) return window.location.href = "login.html";

    fetch(`${SERVER_URL}/todo`, {
        headers: {"Authorization": `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(todos => {
        const list = document.getElementById("todo-list");
        list.innerHTML = "";

        if (!todos.length) {
            list.innerHTML = `<p id="empty-msg">No Todos yet. Add one below.</p>`;
            return;
        }

        todos.forEach(todo => list.appendChild(createTodoCard(todo)));
    })
    .catch(() => {
        document.getElementById("todo-list").innerHTML =
            `<p style="color:red;">Failed to load todos</p>`;
    });
}

// Add New Todo
function addTodo() {
    const input = document.getElementById("new-todo");
    const title = input.value.trim();
    if (!title) return;

    fetch(`${SERVER_URL}/todo/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, isCompleted: false })
    })
    .then(() => {
        input.value = "";
        loadTodos();
    })
    .catch(err => alert(err.message));
}

// Update Status / Title
function updateTodoStatus(id, title, isCompleted) {
    fetch(`${SERVER_URL}/todo/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, isCompleted })
    })
    .then(() => loadTodos())
    .catch(err => alert(err.message));
}

// Delete Todo
function deleteTodo(id) {
    fetch(`${SERVER_URL}/todo/delete/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(() => loadTodos())
    .catch(err => alert(err.message));
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
const created = new Date(todo.createdAt);
const formatted = created.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
});


// Auto Load On Page Open
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("todo-list")) loadTodos();
});

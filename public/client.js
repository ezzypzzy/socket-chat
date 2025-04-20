const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  socket.emit("chat:message", text);
  input.value = "";
});

// Append incoming messages
socket.on("chat:message", ({ id, text }) => {
  const li = document.createElement("li");
  li.textContent = text;

  // Remove empty state message if present
  const placeholder = document.querySelector(".messages .empty");
  if (placeholder) placeholder.remove();

  // Style user's own messages
  if (socket.id === id) li.style.background = "#d1e7dd";

  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

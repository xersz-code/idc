let currentRoom = "general";
let username = "";

auth.onAuthStateChanged(user => {
  if (user) {
    username = user.email.split("@")[0];
    document.getElementById("user-name").textContent = username;
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("chat-container").classList.remove("hidden");
    listenMessages();
  }
});

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .catch(alert);
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(alert);
}

function logout() {
  auth.signOut();
  location.reload();
}

function changeRoom() {
  currentRoom = document.getElementById("room-selector").value;
  listenMessages();
}

function listenMessages() {
  const messagesList = document.getElementById("messages");
  messagesList.innerHTML = "";
  db.ref("rooms/" + currentRoom).off();
  db.ref("rooms/" + currentRoom).on("child_added", snapshot => {
    const msg = snapshot.val();
    const li = document.createElement("li");
    li.textContent = `${msg.sender}: ${msg.text}`;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
  });
}

function sendMessage(e) {
  e.preventDefault();
  const text = document.getElementById("message").value;
  if (text.trim() === "") return;
  db.ref("rooms/" + currentRoom).push({
    sender: username,
    text: text,
    timestamp: Date.now()
  });
  document.getElementById("message").value = "";
}

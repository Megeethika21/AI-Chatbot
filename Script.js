const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(event) {
  if(event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {

  const userText = userInput.value.trim();

  if(userText === "") return;

  addMessage(userText, "user-message");

  userInput.value = "";

  setTimeout(() => {

    const botReply = generateResponse(userText);

    addMessage(botReply, "bot-message");

  }, 1000);
}

function addMessage(text, className) {

  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message", className);

  messageDiv.textContent = text;

  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(input) {

  input = input.toLowerCase();

  if(input.includes("hello")) {
    return "Hello 👋 Nice to meet you!";
  }

  else if(input.includes("how are you")) {
    return "I'm doing great 🚀";
  }

  else if(input.includes("your name")) {
    return "I'm your AI chatbot 🤖";
  }

  else if(input.includes("bye")) {
    return "Goodbye 👋 Have a nice day!";
  }

  else {
    return "Sorry 😅 I don't understand that yet.";
  }
}

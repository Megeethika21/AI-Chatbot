const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const API_KEY = "AIzaSyAnIAgE7T7K72FWQuNRhU5ObOedtkv2zTg";

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {

  const userText = userInput.value.trim();

  if (userText === "") return;

  addMessage(userText, "user-message");

  userInput.value = "";

  const botReply = await generateResponse(userText);

  addMessage(botReply, "bot-message");
}

function addMessage(text, className) {

  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message", className);

  messageDiv.textContent = text;

  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight;
}

async function generateResponse(input) {

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    return data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log(error);

    return "Error generating response.";
  }
}

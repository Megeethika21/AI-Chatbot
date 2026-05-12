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

  const loadingMessage = addMessage(
    "Typing...",
    "bot-message"
  );

  const botReply = await generateResponse(userText);

  loadingMessage.textContent = botReply;
}

function addMessage(text, className) {

  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message", className);

  messageDiv.textContent = text;

  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  return messageDiv;
}

async function generateResponse(input) {

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyAnIAgE7T7K72FWQuNRhU5ObOedtkv2zTg}`,
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

    if (data.error) {
      return data.error.message;
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log(error);

    return "Error generating response.";
  }
}

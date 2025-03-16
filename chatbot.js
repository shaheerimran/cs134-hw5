document.addEventListener("DOMContentLoaded", function () {
    const chatbotHTML = `
        <div id="chatbot-container">
            <button id="chatbot-toggle">💬 Chat</button>
            <div id="chatbot-box">
                <div id="chatbot-header">
                    <span>AI Assistant</span>
                    <button id="chatbot-close">✖</button>
                </div>
                <div id="chatbot-messages">
                    <p class="bot-message">Hi! How can I help you navigate?</p>
                </div>
                <input type="text" id="chatbot-input" placeholder="Type your question...">
                <button id="chatbot-send">Send</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", chatbotHTML);

    const chatbotBox = document.getElementById("chatbot-box");
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");

    chatbotToggle.addEventListener("click", () => {
        chatbotBox.style.display = chatbotBox.style.display === "block" ? "none" : "block";
    });

    chatbotClose.addEventListener("click", () => {
        chatbotBox.style.display = "none";
    });

    chatbotSend.addEventListener("click", () => handleUserMessage());
    chatbotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleUserMessage();
    });

    function handleUserMessage() {
        const userMessage = chatbotInput.value.trim().toLowerCase();
        if (!userMessage) return;

        displayMessage(userMessage, "user");
        chatbotInput.value = "";

        setTimeout(() => {
            const response = getBotResponse(userMessage);
            displayMessage(response, "bot");
        }, 500);
    }

    function displayMessage(message, sender) {
        const msgElement = document.createElement("p");
        msgElement.classList.add(sender === "bot" ? "bot-message" : "user-message");
        msgElement.innerHTML = message;
        chatbotMessages.appendChild(msgElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        if (userMessage.includes("portfolio") || userMessage.includes("projects")) {
            return "You can check out my work on the <a href='cards.html'>Projects Page</a>.";
        } else if (userMessage.includes("contact")) {
            return "Feel free to reach out via the <a href='contact.html'>Contact Page</a>.";
        } else if (userMessage.includes("home") || userMessage.includes("index")) {
            return "Click here to go back to <a href='index.html'>Home</a>.";
        } else {
            return "I'm here to help! Try asking about my portfolio, projects, or how to contact me.";
        }
    }
});

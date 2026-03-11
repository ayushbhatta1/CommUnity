// Chat state management
const chatState = {
    messages: [],
    currentUser: {
        id: '1',
        name: 'John Doe',
        avatar: '/assets/default-avatar.png'
    }
};

// Initialize chat
async function initChat() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message');

    sendButton?.addEventListener('click', handleSendMessage);
    messageInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    await loadMessagesFromAPI();
}

// Load messages from API
async function loadMessagesFromAPI() {
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        chatState.messages = data;
        displayMessages();
    } catch (error) {
        console.error('Error loading messages:', error);
        showError('Failed to load messages. Please try again.');
    }
}

// Handle sending a new message
async function handleSendMessage() {
    const messageInput = document.getElementById('message-input');
    const content = messageInput.value.trim();

    if (!content) return;

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: chatState.currentUser.id,
                userName: chatState.currentUser.name,
                content: content
            })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const newMessage = await response.json();
        chatState.messages.push(newMessage);
        displayMessages();

        messageInput.value = '';

        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        console.error('Error sending message:', error);
        showError('Failed to send message. Please try again.');
    }
}

// Display messages in the chat
function displayMessages() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    chatMessages.innerHTML = '';

    chatState.messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.userId === chatState.currentUser.id ? 'own-message' : ''}`;

        const timestamp = new Date(message.timestamp).toLocaleTimeString();

        messageElement.innerHTML = `
            <div class="message-header">
                <span class="user-name">${escapeHTML(message.userName)}</span>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="message-content">${escapeHTML(message.content)}</div>
        `;

        chatMessages.appendChild(messageElement);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize the chat when the DOM is loaded
document.addEventListener('DOMContentLoaded', initChat);

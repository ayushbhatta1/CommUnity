// Chat state management
const chatState = {
    messages: [],
    currentUser: {
        id: '1',
        name: 'John Doe',
        avatar: '../assets/default-avatar.png'
    }
};

// Mock messages
const mockMessages = [
    {
        id: '1',
        userId: '2',
        userName: 'Jane Smith',
        content: 'Hello everyone! How are you doing today?',
        timestamp: '2024-03-15T10:00:00Z'
    },
    {
        id: '2',
        userId: '3',
        userName: 'Mike Johnson',
        content: 'Hi Jane! I\'m doing great. Just finished a new project.',
        timestamp: '2024-03-15T10:05:00Z'
    },
    {
        id: '3',
        userId: '1',
        userName: 'John Doe',
        content: 'That\'s awesome! What kind of project?',
        timestamp: '2024-03-15T10:07:00Z'
    }
];

// Initialize chat
function initChat() {
    // Set up event listeners
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message');

    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Load initial messages
    chatState.messages = [...mockMessages];
    displayMessages();
}

// Handle sending a new message
function handleSendMessage() {
    const messageInput = document.getElementById('message-input');
    const content = messageInput.value.trim();

    if (!content) return;

    const newMessage = {
        id: Date.now().toString(),
        userId: chatState.currentUser.id,
        userName: chatState.currentUser.name,
        content: content,
        timestamp: new Date().toISOString()
    };

    chatState.messages.push(newMessage);
    displayMessages();

    // Clear input
    messageInput.value = '';

    // Scroll to bottom
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Display messages in the chat
function displayMessages() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';

    chatState.messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.userId === chatState.currentUser.id ? 'own-message' : ''}`;
        
        const timestamp = new Date(message.timestamp).toLocaleTimeString();
        
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="user-name">${message.userName}</span>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="message-content">${message.content}</div>
        `;
        
        chatMessages.appendChild(messageElement);
    });

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize the chat when the DOM is loaded
document.addEventListener('DOMContentLoaded', initChat); 
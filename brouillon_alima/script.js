// GESTION DU CHAT
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

// Auto-resize du textarea
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Envoi de message
function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // Créer bulle utilisateur
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.innerHTML = `
        <div class="msg-content">${text}</div>
        <div class="msg-meta mono">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    `;
    chatMessages.appendChild(userDiv);

    // Vider et reset
    userInput.value = "";
    userInput.style.height = 'auto';
    
    // Scroll en bas
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simuler une réponse IA (en attendant le Back-end)
    setTimeout(() => {
        simulateAIResponse();
    }, 1000);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// GESTION MODAL MODÈLES
const modal = document.getElementById('model-modal');

function openModelModal() {
    modal.style.display = 'flex';
}

function closeModelModal() {
    modal.style.display = 'none';
}

function selectModel(name, type) {
    document.getElementById('current-model-name').innerText = name;
    // Ici vous changeriez aussi l'icône
    document.querySelectorAll('.model-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Simuler une réponse
function simulateAIResponse() {
    const aiDiv = document.createElement('div');
    aiDiv.className = 'message assistant';
    aiDiv.innerHTML = `
        <div class="msg-content">Ceci est une réponse simulée. Connectez votre serveur Node.js pour obtenir une vraie réponse de l'API.</div>
        <div class="msg-meta mono">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • OmniAI Node Server</div>
    `;
    chatMessages.appendChild(aiDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
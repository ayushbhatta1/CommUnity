// Translation state
const translateState = {
    currentLanguage: 'en',
    supportedLanguages: {
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        zh: 'Chinese'
    }
};

// Initialize translation functionality
function initTranslation() {
    const languageSelect = document.querySelector('.language-select');
    if (languageSelect) {
        languageSelect.addEventListener('click', toggleLanguageMenu);
        updateLanguageDisplay();
    }
}

// Toggle language selection menu
function toggleLanguageMenu() {
    const menu = document.createElement('div');
    menu.className = 'language-menu';
    
    Object.entries(translateState.supportedLanguages).forEach(([code, name]) => {
        const option = document.createElement('div');
        option.className = 'language-option';
        option.textContent = name;
        option.addEventListener('click', () => {
            changeLanguage(code);
            menu.remove();
        });
        menu.appendChild(option);
    });

    // Remove any existing menu
    const existingMenu = document.querySelector('.language-menu');
    if (existingMenu) {
        existingMenu.remove();
    } else {
        document.querySelector('.chat-actions').appendChild(menu);
    }
}

// Change the current language
function changeLanguage(languageCode) {
    if (translateState.supportedLanguages[languageCode]) {
        translateState.currentLanguage = languageCode;
        updateLanguageDisplay();
        translateMessages();
    }
}

// Update the language display
function updateLanguageDisplay() {
    const currentLang = document.querySelector('.current-lang');
    if (currentLang) {
        currentLang.textContent = translateState.supportedLanguages[translateState.currentLanguage];
    }
}

// Translate messages (mock implementation)
function translateMessages() {
    const messages = document.querySelectorAll('.message-content');
    messages.forEach(message => {
        // In a real implementation, this would call a translation API
        // For now, we'll just add a visual indicator that translation is happening
        message.classList.add('translating');
        setTimeout(() => {
            message.classList.remove('translating');
        }, 500);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTranslation); 
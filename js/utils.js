// Shared utilities for CommUnity

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Create a notification with ARIA live region, dismiss button, and auto-dismiss
function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
    notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

    const text = document.createElement('span');
    text.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Dismiss notification');
    closeBtn.className = 'notification-close';
    closeBtn.addEventListener('click', () => notification.remove());

    notification.appendChild(text);
    notification.appendChild(closeBtn);
    document.body.appendChild(notification);

    // Auto-dismiss after 5 seconds; pause on hover/focus
    let timeoutId = setTimeout(() => notification.remove(), 5000);
    notification.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    notification.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => notification.remove(), 3000);
    });
    notification.addEventListener('focusin', () => clearTimeout(timeoutId));
    notification.addEventListener('focusout', () => {
        timeoutId = setTimeout(() => notification.remove(), 3000);
    });
}

function showError(message) {
    createNotification(message, 'error');
}

function showSuccess(message) {
    createNotification(message, 'success');
}

// Expose globally for all scripts
window.escapeHTML = escapeHTML;
window.debounce = debounce;
window.showError = showError;
window.showSuccess = showSuccess;

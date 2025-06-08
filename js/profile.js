// Mock user data
const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    language: 'en',
    avatar: '../assets/default-avatar.svg'
};

// DOM Elements
const profilePicture = document.getElementById('profile-picture');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileForm = document.getElementById('profile-form');
const changeAvatarBtn = document.getElementById('change-avatar');
const changePasswordBtn = document.getElementById('change-password');
const notificationSettingsBtn = document.getElementById('notification-settings');
const deleteAccountBtn = document.getElementById('delete-account');

// Initialize profile
function initProfile() {
    // Load user data
    loadUserData();
    
    // Set up event listeners
    setupEventListeners();
}

// Load user data into form
function loadUserData() {
    // Update profile header
    profilePicture.src = mockUser.avatar;
    profileName.textContent = mockUser.name;
    profileEmail.textContent = mockUser.email;

    // Fill form fields
    document.getElementById('full-name').value = mockUser.name;
    document.getElementById('email').value = mockUser.email;
    document.getElementById('phone').value = mockUser.phone;
    document.getElementById('language').value = mockUser.language;
}

// Set up event listeners
function setupEventListeners() {
    // Profile form submission
    profileForm.addEventListener('submit', handleProfileUpdate);

    // Change avatar
    changeAvatarBtn.addEventListener('click', handleAvatarChange);

    // Change password
    changePasswordBtn.addEventListener('click', handlePasswordChange);

    // Notification settings
    notificationSettingsBtn.addEventListener('click', handleNotificationSettings);

    // Delete account
    deleteAccountBtn.addEventListener('click', handleDeleteAccount);
}

// Handle profile update
async function handleProfileUpdate(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const updates = {
        name: formData.get('full-name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        language: formData.get('language')
    };

    try {
        // Show loading state
        profileForm.classList.add('loading');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update mock data
        Object.assign(mockUser, updates);
        
        // Update profile header
        profileName.textContent = updates.name;
        profileEmail.textContent = updates.email;
        
        // Show success message
        showMessage('Profile updated successfully');
    } catch (error) {
        showMessage('Failed to update profile', 'error');
    } finally {
        profileForm.classList.remove('loading');
    }
}

// Handle avatar change
function handleAvatarChange() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            // Show loading state
            changeAvatarBtn.classList.add('loading');
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create object URL for preview
            const objectUrl = URL.createObjectURL(file);
            profilePicture.src = objectUrl;
            
            // Show success message
            showMessage('Profile picture updated');
        } catch (error) {
            showMessage('Failed to update profile picture', 'error');
        } finally {
            changeAvatarBtn.classList.remove('loading');
        }
    };

    input.click();
}

// Handle password change
function handlePasswordChange() {
    const currentPassword = prompt('Enter current password:');
    if (!currentPassword) return;

    const newPassword = prompt('Enter new password:');
    if (!newPassword) return;

    const confirmPassword = prompt('Confirm new password:');
    if (newPassword !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    // Simulate password change
    showMessage('Password changed successfully');
}

// Handle notification settings
function handleNotificationSettings() {
    const settings = {
        email: confirm('Receive email notifications?'),
        jobs: confirm('Receive job alerts?'),
        community: confirm('Receive community updates?')
    };

    // Simulate settings update
    showMessage('Notification settings updated');
}

// Handle account deletion
function handleDeleteAccount() {
    const confirmDelete = confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmDelete) {
        // Simulate account deletion
        showMessage('Account deleted successfully');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Show message
function showMessage(message, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup ${type}`;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProfile); 
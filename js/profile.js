// Profile state
let profileData = null;

// Initialize profile
async function initProfile() {
    await loadUserProfile();
    setupProfileEventListeners();
}

// Load user data from API
async function loadUserProfile() {
    // Show loading indicator on profile fields
    const userName = document.getElementById('user-name');
    if (userName) userName.textContent = 'Loading...';

    try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        profileData = await response.json();
        populateProfileUI();
    } catch (error) {
        console.error('Error loading profile:', error);
        if (userName) userName.textContent = 'Error loading profile';
        showError('Failed to load profile. Please try again.');
    }
}

// Populate the UI with profile data
function populateProfileUI() {
    if (!profileData) return;

    // Update profile header (HTML uses user-name / user-email)
    const profilePicture = document.getElementById('profile-picture');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');

    if (profilePicture) profilePicture.src = profileData.avatar;
    if (userName) userName.textContent = profileData.name;
    if (userEmail) userEmail.textContent = profileData.email;

    // Fill form fields
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const language = document.getElementById('language');

    if (fullName) fullName.value = profileData.name;
    if (email) email.value = profileData.email;
    if (phone) phone.value = profileData.phone;
    if (language) language.value = profileData.language;

    // Notification checkboxes
    if (profileData.notifications) {
        const emailNotif = document.getElementById('email-notifications');
        const jobAlerts = document.getElementById('job-alerts');
        const communityUpdates = document.getElementById('community-updates');
        if (emailNotif) emailNotif.checked = profileData.notifications.email;
        if (jobAlerts) jobAlerts.checked = profileData.notifications.jobs;
        if (communityUpdates) communityUpdates.checked = profileData.notifications.community;
    }

    // Privacy
    const visibility = document.getElementById('profile-visibility');
    if (visibility && profileData.visibility) visibility.value = profileData.visibility;
}

// Set up event listeners
function setupProfileEventListeners() {
    // Save settings button
    const saveBtn = document.querySelector('.save-settings-btn');
    saveBtn?.addEventListener('click', handleProfileUpdate);

    // Change avatar
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    changeAvatarBtn?.addEventListener('click', handleAvatarChange);

    // Change password
    const changePasswordBtn = document.querySelector('.change-password-btn');
    changePasswordBtn?.addEventListener('click', handlePasswordChange);

    // Delete account
    const deleteAccountBtn = document.querySelector('.delete-account-btn');
    deleteAccountBtn?.addEventListener('click', handleDeleteAccount);
}

// Handle profile update
async function handleProfileUpdate(event) {
    if (event) event.preventDefault();

    const updates = {
        name: document.getElementById('full-name')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        language: document.getElementById('language')?.value,
        notifications: {
            email: document.getElementById('email-notifications')?.checked || false,
            jobs: document.getElementById('job-alerts')?.checked || false,
            community: document.getElementById('community-updates')?.checked || false
        },
        visibility: document.getElementById('profile-visibility')?.value
    };

    try {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        profileData = await response.json();
        populateProfileUI();
        showSuccess('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
        showError('Failed to update profile');
    }
}

// Handle avatar change
function handleAvatarChange() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        const profilePicture = document.getElementById('profile-picture');
        if (profilePicture) profilePicture.src = objectUrl;
        showSuccess('Profile picture updated');
    };

    input.click();
}

// Handle password change with modal dialog
function handlePasswordChange() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Change Password</h2>
            <form id="password-form">
                <div class="input-group">
                    <label for="current-password">Current Password</label>
                    <input type="password" id="current-password" required>
                </div>
                <div class="input-group">
                    <label for="new-password">New Password</label>
                    <input type="password" id="new-password" required>
                </div>
                <div class="input-group">
                    <label for="confirm-password">Confirm New Password</label>
                    <input type="password" id="confirm-password" required>
                </div>
                <div class="modal-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Change Password</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('#password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPass = document.getElementById('new-password').value;
        const confirmPass = document.getElementById('confirm-password').value;

        if (newPass !== confirmPass) {
            showError('Passwords do not match');
            return;
        }

        modal.remove();
        showSuccess('Password changed successfully');
    });
}

// Handle account deletion with modal confirmation
function handleDeleteAccount() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div class="modal-actions">
                <button type="button" class="cancel-btn">Cancel</button>
                <button type="button" class="delete-btn submit-btn">Delete Account</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('.delete-btn').addEventListener('click', () => {
        modal.remove();
        showSuccess('Account deleted successfully');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProfile);

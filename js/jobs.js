// Jobs state management
const jobsState = {
    jobs: [],
    filters: {
        type: '',
        sortBy: 'relevance'
    }
};

// Initialize jobs page
async function initJobsPage() {
    document.getElementById('job-type')?.addEventListener('change', handleJobTypeChange);
    document.getElementById('sort-by')?.addEventListener('change', handleSortChange);
    document.querySelector('.update-profile-btn')?.addEventListener('click', handleProfileUpdate);

    await loadJobsFromAPI();
}

// Show loading state for jobs list
function showJobsLoadingState() {
    const jobsList = document.getElementById('job-results');
    if (!jobsList) return;
    jobsList.innerHTML = `
        <div class="loading-placeholder">Loading jobs...</div>
        <div class="loading-placeholder">Loading jobs...</div>
        <div class="loading-placeholder">Loading jobs...</div>
    `;
}

// Load jobs from API
async function loadJobsFromAPI() {
    showJobsLoadingState();
    try {
        const params = new URLSearchParams();
        if (jobsState.filters.type) params.set('type', jobsState.filters.type);
        if (jobsState.filters.sortBy !== 'relevance') params.set('sort', jobsState.filters.sortBy);

        const response = await fetch(`/api/jobs?${params}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        jobsState.jobs = data;
        displayJobs();
    } catch (error) {
        console.error('Error loading jobs:', error);
        const jobsList = document.getElementById('job-results');
        if (jobsList) jobsList.innerHTML = '';
        showError('Failed to load jobs. Please try again.');
    }
}

// Handle job type filter change
function handleJobTypeChange(event) {
    jobsState.filters.type = event.target.value;
    loadJobsFromAPI();
}

// Handle sort change
function handleSortChange(event) {
    jobsState.filters.sortBy = event.target.value;
    loadJobsFromAPI();
}

// Handle profile update
function handleProfileUpdate() {
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const location = document.getElementById('preferred-location').value;

    showSuccess('Profile updated successfully!');
}

// Display jobs in the UI
function displayJobs() {
    const jobsList = document.getElementById('job-results');
    if (!jobsList) return;

    jobsList.innerHTML = '';

    if (jobsState.jobs.length === 0) {
        jobsList.innerHTML = '<p class="no-jobs">No jobs found matching your criteria.</p>';
        return;
    }

    jobsState.jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${escapeHTML(job.title)}</h3>
            <p class="company">${escapeHTML(job.company)}</p>
            <p class="location">${escapeHTML(job.location)}</p>
            <p class="type">${escapeHTML(job.type)}</p>
            <p class="salary">${escapeHTML(job.salary)}</p>
            <p class="description">${escapeHTML(job.description)}</p>
            <div class="requirements">
                ${job.requirements.map(req => `<span class="tag">${escapeHTML(req)}</span>`).join('')}
            </div>
            <button class="apply-btn">Apply Now</button>
        `;
        jobsList.appendChild(jobCard);
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initJobsPage);

// Jobs state management
const jobsState = {
    jobs: [],
    filters: {
        type: '',
        sortBy: 'relevance'
    }
};

// Mock job data
const mockJobs = [
    {
        id: '1',
        title: 'Software Developer',
        company: 'Tech Solutions Inc.',
        location: 'New York, NY',
        type: 'full-time',
        salary: '$80,000 - $100,000',
        description: 'Looking for an experienced software developer to join our team...',
        requirements: ['JavaScript', 'React', 'Node.js'],
        postedDate: '2024-03-15'
    },
    {
        id: '2',
        title: 'UX Designer',
        company: 'Creative Designs',
        location: 'Remote',
        type: 'contract',
        salary: '$60 - $80 per hour',
        description: 'Join our design team to create beautiful user experiences...',
        requirements: ['Figma', 'UI/UX', 'User Research'],
        postedDate: '2024-03-14'
    },
    {
        id: '3',
        title: 'Marketing Intern',
        company: 'Growth Marketing Co.',
        location: 'San Francisco, CA',
        type: 'internship',
        salary: '$25 per hour',
        description: 'Great opportunity for marketing students to gain real-world experience...',
        requirements: ['Social Media', 'Content Creation', 'Analytics'],
        postedDate: '2024-03-13'
    }
];

// Initialize jobs page
function initJobsPage() {
    // Set up event listeners
    document.getElementById('job-type').addEventListener('change', handleJobTypeChange);
    document.getElementById('sort-by').addEventListener('change', handleSortChange);
    document.querySelector('.update-profile-btn').addEventListener('click', handleProfileUpdate);

    // Load initial jobs
    jobsState.jobs = [...mockJobs];
    displayJobs();
}

// Handle job type filter change
function handleJobTypeChange(event) {
    jobsState.filters.type = event.target.value;
    filterAndDisplayJobs();
}

// Handle sort change
function handleSortChange(event) {
    jobsState.filters.sortBy = event.target.value;
    filterAndDisplayJobs();
}

// Handle profile update
function handleProfileUpdate() {
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const location = document.getElementById('preferred-location').value;

    // In a real app, this would update the user's profile
    console.log('Profile updated:', { skills, experience, location });
    
    // Show success message
    alert('Profile updated successfully!');
}

// Filter and display jobs
function filterAndDisplayJobs() {
    let filteredJobs = [...mockJobs];

    // Apply type filter
    if (jobsState.filters.type) {
        filteredJobs = filteredJobs.filter(job => job.type === jobsState.filters.type);
    }

    // Apply sorting
    switch (jobsState.filters.sortBy) {
        case 'recent':
            filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
            break;
        case 'salary':
            // Simple salary comparison (in a real app, would need more sophisticated parsing)
            filteredJobs.sort((a, b) => {
                const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
                const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
                return salaryB - salaryA;
            });
            break;
        default: // relevance
            // In a real app, this would use a more sophisticated relevance algorithm
            break;
    }

    jobsState.jobs = filteredJobs;
    displayJobs();
}

// Display jobs in the UI
function displayJobs() {
    const jobsList = document.getElementById('job-results');
    jobsList.innerHTML = '';

    if (jobsState.jobs.length === 0) {
        jobsList.innerHTML = '<p class="no-jobs">No jobs found matching your criteria.</p>';
        return;
    }

    jobsState.jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p class="location">${job.location}</p>
            <p class="type">${job.type}</p>
            <p class="salary">${job.salary}</p>
            <p class="description">${job.description}</p>
            <div class="requirements">
                ${job.requirements.map(req => `<span class="tag">${req}</span>`).join('')}
            </div>
            <button class="apply-btn">Apply Now</button>
        `;
        jobsList.appendChild(jobCard);
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initJobsPage); 
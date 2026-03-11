// Centralized mock data for CommUnity
// In production, this would be replaced with a real database

const resources = [
    {
        id: '1',
        name: 'Community Food Bank',
        type: 'food',
        description: 'Provides free food and groceries to those in need',
        address: '123 Main St, New York, NY',
        phone: '(555) 123-4567',
        hours: 'Mon-Fri: 9AM-5PM',
        services: ['Groceries', 'Hot Meals', 'Food Pantry'],
        distance: '0.5 miles',
        location: { lat: 40.7128, lng: -74.0060 }
    },
    {
        id: '2',
        name: 'Hope Food Pantry',
        type: 'food',
        description: 'Weekly grocery distribution for families',
        address: '456 Oak Ave, New York, NY',
        phone: '(555) 234-5678',
        hours: 'Mon-Sat: 8AM-6PM',
        services: ['Groceries', 'Food Pantry'],
        distance: '1.2 miles',
        location: { lat: 40.7180, lng: -74.0020 }
    },
    {
        id: '3',
        name: 'Safe Haven Shelter',
        type: 'housing',
        description: 'Emergency shelter and transitional housing',
        address: '789 Pine St, New York, NY',
        phone: '(555) 345-6789',
        hours: '24/7',
        services: ['Emergency Shelter', 'Transitional Housing'],
        distance: '0.8 miles',
        location: { lat: 40.7100, lng: -74.0080 }
    },
    {
        id: '4',
        name: 'Community Housing Center',
        type: 'housing',
        description: 'Affordable housing programs and assistance',
        address: '321 Elm St, New York, NY',
        phone: '(555) 456-7890',
        hours: 'Mon-Fri: 8AM-6PM',
        services: ['Affordable Housing', 'Housing Assistance'],
        distance: '1.5 miles',
        location: { lat: 40.7150, lng: -74.0100 }
    },
    {
        id: '5',
        name: 'Community Health Clinic',
        type: 'healthcare',
        description: 'Free medical services and health check-ups',
        address: '654 Maple Dr, New York, NY',
        phone: '(555) 567-8901',
        hours: 'Mon-Fri: 8AM-8PM',
        services: ['Primary Care', 'Mental Health', 'Preventive Care'],
        distance: '1.0 miles',
        location: { lat: 40.7200, lng: -74.0040 }
    },
    {
        id: '6',
        name: 'Wellness Center',
        type: 'healthcare',
        description: 'Basic healthcare and dental care services',
        address: '987 Cedar Ln, New York, NY',
        phone: '(555) 678-9012',
        hours: 'Mon-Sat: 9AM-7PM',
        services: ['Basic Healthcare', 'Dental Care'],
        distance: '1.8 miles',
        location: { lat: 40.7250, lng: -74.0010 }
    },
    {
        id: '7',
        name: 'Skills Development Center',
        type: 'employment',
        description: 'Free job training and career counseling',
        address: '147 Birch Rd, New York, NY',
        phone: '(555) 789-0123',
        hours: 'Mon-Fri: 9AM-5PM',
        services: ['Job Training', 'Skill Workshops'],
        distance: '1.3 miles',
        location: { lat: 40.7170, lng: -74.0050 }
    },
    {
        id: '8',
        name: 'Career Advancement Institute',
        type: 'employment',
        description: 'Vocational training and certification programs',
        address: '258 Spruce St, New York, NY',
        phone: '(555) 890-1234',
        hours: 'Mon-Sat: 8AM-6PM',
        services: ['Vocational Training', 'Certification Programs'],
        distance: '2.0 miles',
        location: { lat: 40.7220, lng: -74.0090 }
    },
    {
        id: '9',
        name: 'Goodwill Store',
        type: 'clothing',
        description: 'Affordable clothing and household items',
        address: '111 Charity Ave, New York, NY',
        phone: '(555) 111-2222',
        hours: 'Mon-Sat: 9AM-7PM',
        services: ['Affordable Clothing', 'Donations Accepted'],
        distance: '1.4 miles',
        location: { lat: 40.7160, lng: -74.0030 }
    },
    {
        id: '10',
        name: 'Community Thrift Shop',
        type: 'clothing',
        description: 'Clothing, shoes, and accessories at low cost',
        address: '222 Hope St, New York, NY',
        phone: '(555) 333-4444',
        hours: 'Mon-Fri: 10AM-6PM',
        services: ['Clothing', 'Shoes', 'Accessories'],
        distance: '2.1 miles',
        location: { lat: 40.7190, lng: -74.0070 }
    }
];

const jobs = [
    {
        id: '1',
        title: 'Software Developer',
        company: 'Tech Solutions Inc.',
        location: 'New York, NY',
        type: 'full-time',
        salary: '$80,000 - $100,000',
        description: 'Looking for an experienced software developer to join our team.',
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
        description: 'Join our design team to create beautiful user experiences.',
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
        description: 'Great opportunity for marketing students to gain real-world experience.',
        requirements: ['Social Media', 'Content Creation', 'Analytics'],
        postedDate: '2024-03-13'
    }
];

const posts = [
    {
        id: '1',
        author: 'Jane Smith',
        content: 'Just found a great resource for job training!',
        date: '2024-03-15T10:00:00Z',
        likes: 5,
        comments: 2
    },
    {
        id: '2',
        author: 'Mike Johnson',
        content: 'Anyone know of good healthcare resources in the area?',
        date: '2024-03-15T09:30:00Z',
        likes: 3,
        comments: 4
    }
];

const messages = [
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

const users = {
    '1': {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        language: 'en',
        avatar: '/assets/default-avatar.svg',
        notifications: {
            email: true,
            jobs: true,
            community: true
        },
        visibility: 'public'
    }
};

module.exports = { resources, jobs, posts, messages, users };

import { Job } from '@/types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Customer Service Representative',
    company: 'Local Retail Store',
    type: 'Full-time',
    location: '2.1 miles away',
    salaryMin: 18,
    salaryMax: 22,
    salaryPeriod: 'per hour',
    description: 'We are seeking a friendly and helpful Customer Service Representative to join our team. This role involves assisting customers with inquiries, processing transactions, and maintaining a positive shopping environment.',
    requirements: [
      'High school diploma or equivalent',
      'Previous retail or customer service experience preferred',
      'Strong communication and interpersonal skills',
      'Ability to stand for extended periods and lift up to 25 pounds'
    ],
    skills: ['Customer Service', 'Retail', 'POS Systems', 'Cash Handling', 'Communication'],
    postedDate: '2 days ago',
  },
  {
    id: '2',
    title: 'Warehouse Associate',
    company: 'Distribution Center',
    type: 'Full-time',
    location: '3.5 miles away',
    salaryMin: 20,
    salaryMax: 24,
    salaryPeriod: 'per hour',
    description: 'Join our team as a Warehouse Associate responsible for receiving, storing, and shipping products. You will operate equipment, prepare orders, and maintain inventory accuracy in a fast-paced environment.',
    requirements: [
      'High school diploma or equivalent',
      'Ability to lift up to 50 pounds regularly',
      'Forklift certification preferred but training provided',
      'Reliable transportation to work location'
    ],
    skills: ['Warehousing', 'Inventory Management', 'Order Picking', 'Shipping', 'Receiving'],
    postedDate: '5 days ago',
  },
  {
    id: '3',
    title: 'Home Health Aide',
    company: 'Community Care Services',
    type: 'Part-time',
    location: '1.8 miles away',
    salaryMin: 19,
    salaryMax: 23,
    salaryPeriod: 'per hour',
    description: 'We are looking for compassionate Home Health Aides to assist clients with daily activities, personal care, and light housekeeping. This role provides essential support to help clients maintain independence in their homes.',
    requirements: [
      'HHA certification required',
      'CPR and First Aid certification',
      'Reliable transportation',
      'Compassionate attitude and patience',
      'Ability to pass background check'
    ],
    skills: ['Caregiving', 'Patient Care', 'First Aid', 'Meal Preparation', 'Medication Reminders'],
    postedDate: '1 week ago',
  },
  {
    id: '4',
    title: 'Administrative Assistant',
    company: 'Business Solutions Inc.',
    type: 'Full-time',
    location: '2.7 miles away',
    salaryMin: 22,
    salaryMax: 26,
    salaryPeriod: 'per hour',
    description: 'Administrative Assistant needed to provide clerical and administrative support to our office. Duties include answering phones, scheduling appointments, filing documents, and data entry.',
    requirements: [
      'High school diploma required, Associate\'s degree preferred',
      'Proficient with Microsoft Office Suite',
      'Excellent written and verbal communication skills',
      'Previous office experience preferred'
    ],
    skills: ['Microsoft Office', 'Calendar Management', 'Data Entry', 'Filing', 'Customer Service'],
    postedDate: '3 days ago',
  },
  {
    id: '5',
    title: 'Food Service Worker',
    company: 'Healthy Meals Cafe',
    type: 'Part-time',
    location: '0.9 miles away',
    salaryMin: 17,
    salaryMax: 20,
    salaryPeriod: 'per hour',
    description: 'Join our team as a Food Service Worker preparing and serving healthy meals to customers. Responsibilities include food preparation, maintaining cleanliness, and providing excellent customer service.',
    requirements: [
      'No experience necessary, training provided',
      'Food Handler\'s certification (can obtain after hiring)',
      'Ability to work weekends and some evenings',
      'Customer-focused attitude'
    ],
    skills: ['Food Preparation', 'Customer Service', 'Cash Handling', 'Team Work', 'Cleaning'],
    postedDate: '1 day ago',
  }
];
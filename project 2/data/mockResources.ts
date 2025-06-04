import { Resource } from '@/types';

export const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Community Food Bank',
    category: 'Food',
    distance: '1.2 miles',
    hours: 'Open today until 6pm',
    phone: '(555) 123-4567',
    address: '123 Main Street, San Francisco, CA 94110',
    description: 'Provides free groceries, hot meals, and emergency food supplies to individuals and families in need. No ID required.',
    services: [
      'Food Pantry',
      'Hot Meals',
      'Emergency Food Boxes',
      'SNAP Application Assistance'
    ],
    requirements: 'None. Open to all community members.',
    website: 'https://communityfoodbank.org',
  },
  {
    id: '2',
    name: 'Housing Assistance Center',
    category: 'Housing',
    distance: '2.5 miles',
    hours: 'Open weekdays 9am-5pm',
    phone: '(555) 987-6543',
    address: '456 Housing Boulevard, San Francisco, CA 94103',
    description: 'Offers emergency shelter, rental assistance, and housing navigation services for individuals and families experiencing homelessness or housing insecurity.',
    services: [
      'Emergency Shelter',
      'Rental Assistance',
      'Housing Navigation',
      'Eviction Prevention'
    ],
    requirements: 'Proof of income and residency may be required for some services.',
    website: 'https://housingassistance.org',
  },
  {
    id: '3',
    name: 'Community Health Clinic',
    category: 'Healthcare',
    distance: '0.8 miles',
    hours: 'Open today until 8pm',
    phone: '(555) 234-5678',
    address: '789 Healthcare Avenue, San Francisco, CA 94117',
    description: 'Provides affordable primary care, mental health services, and preventative healthcare to uninsured and underinsured community members.',
    services: [
      'Primary Care',
      'Mental Health Counseling',
      'Prenatal Care',
      'Dental Services',
      'Prescription Assistance'
    ],
    requirements: 'Sliding scale fees based on income. Bring ID and proof of income if available.',
    website: 'https://communityhealthclinic.org',
  },
  {
    id: '4',
    name: 'Job Training Center',
    category: 'Employment',
    distance: '3.1 miles',
    hours: 'Open Mon-Fri 8am-6pm',
    phone: '(555) 876-5432',
    address: '101 Career Street, San Francisco, CA 94107',
    description: 'Offers free job training, resume assistance, interview preparation, and job placement services to help community members secure sustainable employment.',
    services: [
      'Job Training Programs',
      'Resume Building',
      'Interview Preparation',
      'Computer Skills Training',
      'Job Placement'
    ],
    requirements: 'Must be 18+ and eligible to work in the US.',
    website: 'https://jobtrainingcenter.org',
  },
  {
    id: '5',
    name: 'Legal Aid Society',
    category: 'Legal',
    distance: '2.3 miles',
    hours: 'Open weekdays 9am-5pm',
    phone: '(555) 345-6789',
    address: '222 Justice Way, San Francisco, CA 94105',
    description: 'Provides free legal assistance to low-income individuals for civil matters including housing, family law, immigration, and public benefits.',
    services: [
      'Legal Consultations',
      'Representation in Court',
      'Document Preparation',
      'Know Your Rights Workshops'
    ],
    requirements: 'Income qualification required. Bring proof of income and relevant documents.',
    website: 'https://legalaid.org',
  },
  {
    id: '6',
    name: 'Adult Education Center',
    category: 'Education',
    distance: '1.9 miles',
    hours: 'Classes vary by schedule',
    phone: '(555) 456-7890',
    address: '333 Learning Lane, San Francisco, CA 94112',
    description: 'Offers free adult education classes including GED preparation, English as a Second Language (ESL), computer literacy, and vocational training.',
    services: [
      'GED Preparation',
      'ESL Classes',
      'Computer Literacy',
      'Vocational Training',
      'Citizenship Classes'
    ],
    requirements: 'Open to adults 18+. Photo ID required for registration.',
    website: 'https://adulteducation.org',
  },
  {
    id: '7',
    name: 'Financial Empowerment Center',
    category: 'Financial',
    distance: '2.7 miles',
    hours: 'Open Tue-Sat 10am-6pm',
    phone: '(555) 567-8901',
    address: '444 Finance Street, San Francisco, CA 94102',
    description: 'Provides free financial counseling, credit building assistance, debt management, and savings programs to help individuals achieve financial stability.',
    services: [
      'Financial Counseling',
      'Credit Building',
      'Debt Management',
      'Tax Preparation Assistance',
      'Savings Programs'
    ],
    requirements: 'Appointments recommended but walk-ins welcome.',
    website: 'https://financialempowerment.org',
  }
];
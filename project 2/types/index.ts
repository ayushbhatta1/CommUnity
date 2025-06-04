export type ResourceCategory = 'Housing' | 'Food' | 'Healthcare' | 'Education' | 'Employment' | 'Legal' | 'Financial';

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory | string;
  distance: string;
  hours: string;
  phone: string;
  address: string;
  description: string;
  services: string[];
  requirements: string;
  website: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
}
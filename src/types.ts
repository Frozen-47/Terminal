export interface Project {
  name: string;
  description: string;
  url: string;
  type: 'Live' | 'GitHub';
  language?: string;
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Core' | 'Hosting'; // Added 'Hosting' here
}

export interface SocialLink {
  name: string;
  url: string;
  iconPath: string;
  color?: string;
}

export interface ChartData {
  subject: string;
  A: number;
  fullMark: number;
}
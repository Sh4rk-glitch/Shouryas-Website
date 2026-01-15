
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link?: string;
}

export interface KeyConfig {
  label: string;
  id: string;
  url?: string;
  isSpecial?: boolean;
  iconName?: string;
}
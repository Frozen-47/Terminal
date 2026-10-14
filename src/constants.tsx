import { Project, Skill, SocialLink } from './types';

export const PINNED_PROJECTS: Project[] = [
  {
    name: "AIverse",
    description: "Open-source AI encyclopedia. Organizing AI tools & models in one place. Looking for collaborators to help build this together! 🚀",
    url: "https://aiverse.frozenn.in",
    type: "Live"
  },
  {
    name: "Grade Calculator",
    description: "A clean and fast web app to calculate GPA and CGPA. Enter subjects, credits, and grades — instantly gives accurate results using a 10-point scale.",
    url: "https://getgpa.vercel.app/",
    type: "Live"
  },
  {
    name: "DevSnapz",
    description: "Official landing page and community codebase for DevSnapz — interactive project showcase, collaboration, and sponsorship hub for developers.",
    url: "https://github.com/DevSnapz/Landing",
    type: "GitHub"
  },
  {
    name: "To-do App",
    description: "An interactive terminal-style To-Do list application built with HTML & CSS. Designed to provide a command-line experience inside browser and Android.",
    url: "https://github.com/Frozen-47/To-do",
    type: "GitHub"
  },
  {
    name: "ArcticDEX",
    description: "A cross-platform, customizable science fiction terminal emulator with advanced monitoring & touchscreen support.",
    url: "https://github.com/Frozen-47/ArcticDEX",
    type: "GitHub"
  },
  {
    name: "Solunar",
    description: "A custom minimal Discord theme for Vencord, focused on clean UI, smooth colors, and a balanced dark/light experience.",
    url: "https://github.com/Frozen-47/Solunar",
    type: "GitHub"
  },
  {
    name: "WordsMuseum",
    description: "A creative collection of interactive word-based projects built with HTML. Showcases experiments with text, design, and layout dynamics.",
    url: "https://github.com/Frozen-47/WordsMuseum",
    type: "GitHub"
  }
];

export const PROJECTS: Project[] = PINNED_PROJECTS;

export const SKILLS: Skill[] = [
  { name: "Java", category: "Languages" },
  { name: "C & C++", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "HTML & CSS", category: "Languages" },
  { name: "Data Structures", category: "Core" },
  { name: "Algorithms", category: "Core" },
  { name: "Problem Solving", category: "Core" },
  { name: "OOPs", category: "Core" },
  { name: "Clerk", category: "Core" },
  { name: "Git", category: "Core" },
  { name: "Linux", category: "Core" },
  { name: "Vercel", category: "Hosting" },
  { name: "Netlify", category: "Hosting" },
  { name: "Render", category: "Hosting" },
  { name: "GitHub Pages", category: "Hosting" },
  { name: "Supabase", category: "Hosting" }
];

export const STATUS_MESSAGES = [
  "Available for work",
  "Open to opportunities",
  "Ready to collaborate",
  "Seeking new challenges"
];

export const SOCIALS: SocialLink[] = [
  {
    name: "Discord",
    url: "https://discord.com/users/1272910357517701147",
    iconPath: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.08.08 0 00.087-.027c.461-.63.873-1.295 1.226-1.994.021-.037.001-.08-.037-.092a13.107 13.107 0 01-1.872-.892.083.083 0 01-.008-.138c.125-.093.25-.19.371-.287a.078.078 0 01.082-.01c3.928 1.793 8.18 1.793 12.062 0a.079.079 0 01.083.011c.12.098.246.195.371.288a.083.083 0 01-.006.137 12.27 12.27 0 01-1.873.892.084.084 0 01-.037.092c.352.699.764 1.365 1.225 1.994a.08.08 0 00.086.028 19.86 19.86 0 006.002-3.03.082.082 0 00.032-.056c.561-4.317-.94-8.514-3.99-12.095a.065.065 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.92-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.92-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
    color: "text-[#5865f2]"
  },
  {
    name: "GitHub",
    url: "https://github.com/Frozen-47",
    iconPath: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
    color: "text-neutral-400 hover:text-white"
  }
];
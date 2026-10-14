export interface VirtualFile {
  name: string;
  type: 'file';
  content: string;
}

export interface VirtualDirectory {
  name: string;
  type: 'dir';
  children: Record<string, VirtualFile | VirtualDirectory>;
}

export const VIRTUAL_FS: Record<string, VirtualFile | VirtualDirectory> = {
  'about.txt': {
    name: 'about.txt',
    type: 'file',
    content: `================================================================================
ABOUT SABAREESH GANESAMOORTHI (FROZEN)
================================================================================

Role: IT Student & Software Developer
Location: Erode, Tamil Nadu, India
Aliases: Frozen / Frozen-47
Website: https://frozenn.in
GitHub: https://github.com/Frozen-47

PROFILE:
Passionate Information Technology student with a strong drive for software
development and cybersecurity. Experienced in building optimized systems with
Java, C++, Python, and modern web frameworks (React, TypeScript, Tailwind).
Constantly exploring new architectures, cryptographic concepts, and building
practical, high-impact software.

Currently building DevSnapz — an open-source hub for developer project showcases,
mentorship, and sponsorship.`
  },

  'experience': {
    name: 'experience',
    type: 'dir',
    children: {
      'overview.txt': {
        name: 'overview.txt',
        type: 'file',
        content: `CAREER TIMELINE & EXPERIENCE:

1. Founder & Builder — DevSnapz (Currently Building | Active)
   • Building a developer-first community hub to showcase creations, get mentorship, and sponsor open source.
   • Implemented Project Showcase, Guidance Boards, and Code Contributions using React, TypeScript, Tailwind, and Vite.
   • Integrated local-first state for persisting guidance threads, backer lists, and projects inside browser storage.

2. Independent Developer — Self-Directed (2023 – Present | Remote)
   • Designed, developed, and deployed multiple web applications using modern front-end technologies.
   • Configured Linux-based environments; managed packages, permissions, and shell scripts.
   • Maintained personal portfolio site with custom web hosting configuration and Git version control.

3. Collaborative Programming — GitHub Project (Past)
   • Built and maintained a shared repository for class programming exercises.
   • Implemented branch-based contributions where each student manages their own code.
   • Practiced Git workflows: branching, merging, pull requests, and conflict resolution.`
      },
      'devsnapz.txt': {
        name: 'devsnapz.txt',
        type: 'file',
        content: `PROJECT: DevSnapz
ROLE: Founder & Builder
STATUS: Currently Building (Active)
STACK: React, TypeScript, Tailwind CSS, Vite, Local-First Storage
DESCRIPTION:
DevSnapz is a community platform designed for developers to showcase their builds,
find project sponsors, and collaborate through dedicated guidance boards.
Repo: https://github.com/DevSnapz/Landing`
      },
      'independent.txt': {
        name: 'independent.txt',
        type: 'file',
        content: `EXPERIENCE: Independent Developer
TIMELINE: 2023 – Present
LOCATION: Remote / Erode, India
HIGHLIGHTS:
• Authored 20+ open source GitHub repositories spanning CLI tools, web apps, and utilities.
• Deep proficiency in Linux server configurations, system shell scripting, and automated deployment pipelines.`
      }
    }
  },

  'projects': {
    name: 'projects',
    type: 'dir',
    children: {
      'aiverse.txt': {
        name: 'aiverse.txt',
        type: 'file',
        content: `AIVERSE — Open-Source AI Encyclopedia
--------------------------------------------------
URL:  https://aiverse.frozenn.in
Type: Live Project
Tag:  Featured AI Registry
Details:
Organizes and categorizes AI tools, APIs, LLMs, and research models in a single place.
Built for developers and researchers seeking open collaboration.`
      },
      'grade-calculator.txt': {
        name: 'grade-calculator.txt',
        type: 'file',
        content: `GRADE CALCULATOR — Academic GPA & CGPA Engine
--------------------------------------------------
URL:  https://getgpa.vercel.app/
Type: Live Web Application
Details:
Clean, rapid GPA/CGPA calculator using standard 10-point academic scales.
Features dynamic credit management and real-time score computations.`
      },
      'todo-app.txt': {
        name: 'todo-app.txt',
        type: 'file',
        content: `TO-DO APP — Interactive Terminal Planner
--------------------------------------------------
Repo: https://github.com/Frozen-47/To-do
Type: Android / Web
Details:
An interactive command-line style task management application for developers who
prefer keyboard-first workflows.`
      },
      'arcticdex.txt': {
        name: 'arcticdex.txt',
        type: 'file',
        content: `ARCTICDEX — Sci-Fi Terminal Emulator
--------------------------------------------------
Repo: https://github.com/Frozen-47/ArcticDEX
Type: Cross-Platform Emulator
Details:
A cross-platform, customizable science fiction terminal emulator with advanced system
monitoring and touchscreen support.`
      },
      'solunar.txt': {
        name: 'solunar.txt',
        type: 'file',
        content: `SOLUNAR — Discord Theme for Vencord
--------------------------------------------------
Repo: https://github.com/Frozen-47/Solunar
Type: Theme
Details:
Custom minimal Discord theme for Vencord focusing on clean UI, smooth balanced colors,
and a tranquil dark/light aesthetic.`
      },
      'wordsmuseum.txt': {
        name: 'wordsmuseum.txt',
        type: 'file',
        content: `WORDSMUSEUM — Interactive Typography Experiments
--------------------------------------------------
Repo: https://github.com/Frozen-47/WordsMuseum
Type: Web Experiment
Details:
A creative collection of interactive word-based HTML experiments exploring text art,
structure, and layout dynamics.`
      },
      'devsnapz-landing.txt': {
        name: 'devsnapz-landing.txt',
        type: 'file',
        content: `DEVSNAPZ LANDING — Developer Showcase Platform
--------------------------------------------------
Repo: https://github.com/DevSnapz/Landing
Type: Web Platform
Details:
Official landing page and application codebase for DevSnapz: developer hub for
project showcase, mentorship, and sponsorships.`
      }
    }
  },

  'skills': {
    name: 'skills',
    type: 'dir',
    children: {
      'languages.txt': {
        name: 'languages.txt',
        type: 'file',
        content: `PROGRAMMING LANGUAGES:
• Java (Core, OOP, Collections, Backend)
• C & C++ (Algorithms, Memory Management, Systems)
• Python (Scripting, AI tooling, Automation)
• HTML5 & CSS3 (Semantic markup, Responsive layouts, Tailwind)`
      },
      'core.txt': {
        name: 'core.txt',
        type: 'file',
        content: `CORE COMPUTER SCIENCE & SYSTEMS:
• Data Structures & Algorithms (Trees, Graphs, Sorting, Dynamic Programming)
• Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism)
• Problem Solving & Algorithmic Optimization
• Linux System Administration & Shell Scripting
• Git Version Control & GitHub Collaborative Workflows
• Clerk Authentication & Security Architecture`
      },
      'hosting.txt': {
        name: 'hosting.txt',
        type: 'file',
        content: `HOSTING & CLOUD INFRASTRUCTURE:
• Vercel (Edge deployments & Serverless functions)
• Netlify (Static & Jamstack hosting)
• Supabase (PostgreSQL, Storage, Auth)
• Render (Web services & APIs)
• GitHub Pages (Docs & Static assets)`
      }
    }
  },

  'contact.txt': {
    name: 'contact.txt',
    type: 'file',
    content: `================================================================================
CONTACT COORDINATES — SABAREESH GANESAMOORTHI
================================================================================

• Email       : sabareeshgm47@gmail.com
• Discord     : frozen (User ID: 1272910357517701147)
• GitHub      : https://github.com/Frozen-47
• Portfolio   : https://frozenn.in
• Location    : Erode, Tamil Nadu, India
• Open to     : Collaborations, Internships, Engineering Opportunities`
  },

  'resume.txt': {
    name: 'resume.txt',
    type: 'file',
    content: `RÉSUMÉ — SABAREESH GANESAMOORTHI
================================================================================
Document File: /Resume.pdf (Type 'resume' to open directly in a new tab)

Summary:
IT Student & Software Developer passionate about backend systems, Java, C++,
and cybersecurity. Founder of DevSnapz and contributor to 20+ open-source repos.`
  },

  'humans.txt': {
    name: 'humans.txt',
    type: 'file',
    content: `/* TEAM */
Developer & Designer: Sabareesh (Frozen)
Location: Erode, Tamil Nadu, India
Contact: sabareeshgm47@gmail.com
GitHub: https://github.com/Frozen-47

/* SITE */
Standards: HTML5, CSS3, ES2024
Components: React 19, TypeScript, Tailwind CSS, Lucide Icons
Audio: Death Note OST 1 & 2 Collection
AI Assistant: Elsa AI (Groq LLM + Local Knowledge Base)`
  },

  'secrets': {
    name: 'secrets',
    type: 'dir',
    children: {
      'secret_cipher.key': {
        name: 'secret_cipher.key',
        type: 'file',
        content: `ENCRYPTED SYSTEM CIPHER BLOCK:
0x8F9A4E2B -> Type 'game' in terminal to initiate the binary decryption sandbox challenge!`
      },
      'passkey_hint.txt': {
        name: 'passkey_hint.txt',
        type: 'file',
        content: `HINT: Open your browser's Developer Tools Console (F12 or Ctrl+Shift+I).
There is a hidden secret passkey printed in the logs on page load!
Type that passkey directly into the terminal to unlock verified developer access.`
      }
    }
  },

  'readme.md': {
    name: 'readme.md',
    type: 'file',
    content: `# Sabareesh's Interactive Terminal Portfolio Workstation

Available Commands:
- help        : Show all commands with descriptions
- neofetch    : Display ASCII banner with system specifications
- about       : View biographical info & background
- skills      : Browse technical skills & proficiency matrix
- projects    : Explore pinned & open-source projects
- experience  : Review career history & timeline
- contact     : Get email, Discord, and social coordinates
- resume      : Open Sabareesh's résumé (/Resume.pdf)
- music       : Death Note OST music controller (play/pause/next/list)
- ai          : Chat with Elsa AI assistant
- lang <code> : Switch language (en, ta, hi, es, de, ja, fr)
- game        : Play cybersecurity binary decryption game
- secrets     : Easter egg & utility commands (weather, joke, advice, ip, qr)
- tree        : Print virtual filesystem directory tree
- ls / cd / cat: Navigate virtual filesystem files
- theme       : Switch theme between dark and light
- clear       : Clear the console screen`
  }
};

export const resolvePath = (currentPath: string[], targetStr: string): string[] => {
  const trimmed = targetStr.trim();
  if (!trimmed || trimmed === '~' || trimmed === '/') {
    return [];
  }

  let isAbsolute = false;
  let cleanStr = trimmed;

  if (cleanStr.startsWith('~/')) {
    isAbsolute = true;
    cleanStr = cleanStr.slice(2);
  } else if (cleanStr.startsWith('/')) {
    isAbsolute = true;
    cleanStr = cleanStr.slice(1);
  }

  const baseParts = isAbsolute ? [] : [...currentPath];
  const targetSegments = cleanStr.split('/').filter(Boolean);

  for (const segment of targetSegments) {
    if (segment === '.') {
      continue;
    }
    if (segment === '..') {
      if (baseParts.length > 0) {
        baseParts.pop();
      }
    } else {
      baseParts.push(segment);
    }
  }

  return baseParts;
};

export const getNodeAtPath = (path: string[]): VirtualFile | VirtualDirectory | Record<string, VirtualFile | VirtualDirectory> | null => {
  if (path.length === 0) {
    return VIRTUAL_FS;
  }

  let currentDir: Record<string, VirtualFile | VirtualDirectory> = VIRTUAL_FS;
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    const item = currentDir[segment];
    if (!item) return null;

    if (i === path.length - 1) {
      return item;
    }

    if (item.type === 'dir') {
      currentDir = item.children;
    } else {
      return null;
    }
  }
  return null;
};

export const getDirContentsAtPath = (path: string[]): Record<string, VirtualFile | VirtualDirectory> | null => {
  const node = getNodeAtPath(path);
  if (!node) return null;
  if (path.length === 0) {
    return VIRTUAL_FS;
  }
  if ('type' in node && node.type === 'dir') {
    return node.children;
  }
  return null;
};

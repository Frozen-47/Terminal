import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-4 h-4" }) => {
  const iconName = name.toLowerCase();


  // Python
  if (iconName.includes('python')) {
    return <img src="https://cdn.simpleicons.org/python" alt="Python" className={`${className} object-contain`} loading="lazy" />;
  }

  // Java
  if (iconName.includes('java') && !iconName.includes('script')) {
    return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className={`${className} object-contain`} loading="lazy" />;
  }

  // C & C++
  if (iconName.includes('c++') || iconName.includes('c & c++') || iconName === 'c') {
    return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" className={`${className} object-contain`} loading="lazy" />;
  }


  // HTML & CSS
  if (iconName.includes('html') || iconName.includes('css')) {
    return <img src="https://cdn.simpleicons.org/html5" alt="HTML5" className={`${className} object-contain`} loading="lazy" />;
  }

  // Git
  if (iconName.includes('git') && !iconName.includes('hub')) {
    return <img src="https://cdn.simpleicons.org/git" alt="Git" className={`${className} object-contain`} loading="lazy" />;
  }

  // Linux
  if (iconName.includes('linux')) {
    return <img src="https://cdn.simpleicons.org/linux" alt="Linux" className={`${className} object-contain`} loading="lazy" />;
  }

  // Vercel
  if (iconName.includes('vercel')) {
    return <img src="https://cdn.simpleicons.org/vercel" alt="Vercel" className={`${className} object-contain dark:invert`} loading="lazy" />;
  }

  // Netlify
  if (iconName.includes('netlify')) {
    return <img src="https://cdn.simpleicons.org/netlify" alt="Netlify" className={`${className} object-contain`} loading="lazy" />;
  }

  // Render
  if (iconName.includes('render')) {
    return <img src="https://cdn.simpleicons.org/render" alt="Render" className={`${className} object-contain dark:invert`} loading="lazy" />;
  }

  // Supabase
  if (iconName.includes('supabase')) {
    return <img src="https://cdn.simpleicons.org/supabase" alt="Supabase" className={`${className} object-contain`} loading="lazy" />;
  }


  // GitHub Pages / GitHub
  if (iconName.includes('github')) {
    return <img src="https://cdn.simpleicons.org/github" alt="GitHub" className={`${className} object-contain dark:invert`} loading="lazy" />;
  }

  // Clerk
  if (iconName.includes('clerk')) {
    return <img src="https://cdn.simpleicons.org/clerk" alt="Clerk" className={`${className} object-contain`} loading="lazy" />;
  }

  // Data Structures
  if (iconName.includes('data structures') || iconName.includes('structures')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="8.5" rx="1" />
        <path d="M10 12h4" />
        <path d="M14 6.5h-2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
      </svg>
    );
  }

  // Algorithms
  if (iconName.includes('algorithm')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="8" x="3" y="3" rx="2" />
        <path d="M7 11v4a2 2 0 0 0 2 2h4" />
        <rect width="8" height="8" x="13" y="13" rx="2" />
      </svg>
    );
  }

  // Problem Solving
  if (iconName.includes('problem') || iconName.includes('solving')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    );
  }

  // OOPs
  if (iconName.includes('oops') || iconName.includes('object')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21 16-9 5-9-5 9-5 9 5z" />
        <path d="m21 12-9 5-9-5" />
        <path d="m21 8-9 5-9-5 9-5 9 5z" />
      </svg>
    );
  }

  // Fallback
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};

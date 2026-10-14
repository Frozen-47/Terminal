import React, { useState } from 'react';
import { SKILLS } from '../../constants';
import { TRANSLATIONS, LanguageCode } from '../../translations';

interface SkillsViewProps {
  currentLang: LanguageCode;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const categories = ['All', 'Languages', 'Core', 'Hosting'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const getSkillProficiency = (name: string): number => {
    const proficiencies: Record<string, number> = {
      'Java': 90,
      'C & C++': 85,
      'Python': 80,
      'HTML & CSS': 92,
      'Data Structures': 90,
      'Algorithms': 85,
      'Problem Solving': 90,
      'OOPs': 92,
      'Clerk': 80,
      'Git': 90,
      'Linux': 85,
      'Vercel': 88,
      'Netlify': 85,
      'Render': 80,
      'GitHub Pages': 90,
      'Supabase': 82
    };
    return proficiencies[name] || 80;
  };

  const renderMeter = (percent: number) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return `[${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}] ${percent}%`;
  };

  return (
    <div className="w-full h-full flex flex-col font-mono bg-[#000000] text-[#e6edf3] overflow-y-auto macos-terminal-scroll p-4 space-y-4 select-text">
      {/* Top Status Header */}
      <div className="p-3 border border-[#22262e] bg-[#0d1117] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#1793d1] font-bold text-sm">󰣇</span>
          <span className="text-xs font-bold text-[#e6edf3]">
            btop / capabilities-matrix --verbose | {SKILLS.length} technologies
          </span>
        </div>

        {/* Filter Keys */}
        <div className="flex items-center gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 font-bold transition-none cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1793d1] text-black'
                  : 'bg-[#161b22] text-[#8b949e] hover:text-white border border-[#30363d]'
              }`}
            >
              [ {cat} ]
            </button>
          ))}
        </div>
      </div>

      {/* ASCII Meters Table */}
      <div className="border border-[#22262e] bg-[#0a0c10] p-4 space-y-4">
        <div className="text-xs font-bold text-[#50fa7b] pb-2 border-b border-[#22262e] flex items-center justify-between">
          <span>┌──[ SYSTEM RUNTIMES & STACK METRICS ]</span>
          <span className="text-[#6e7681]">Arch Linux x86_64</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {filteredSkills.map((skill, idx) => {
            const prof = getSkillProficiency(skill.name);
            return (
              <div
                key={idx}
                className="p-2 border border-[#1e232a] bg-[#000000] flex flex-col justify-between space-y-1 hover:border-[#1793d1] transition-none"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    {skill.name}
                  </span>
                  <span className="text-[10px] text-[#6e7681]">
                    [ {skill.category} ]
                  </span>
                </div>
                <div className="text-[#1793d1] font-mono text-xs tracking-tighter">
                  {renderMeter(prof)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Engineering Principles Box */}
      <div className="border border-[#22262e] bg-[#0d1117] p-3 space-y-2 text-xs">
        <span className="text-[#f1fa8c] font-bold block">
          ┌──[ CS FOUNDATIONAL DISCIPLINES ]
        </span>
        <div className="space-y-1 text-[#d8dee9] pl-2 text-[12px]">
          <div>├── <span className="text-white font-bold">Data Structures & Algorithmic Efficiency</span>: Memory bounds, Big-O analysis, HashMaps, Trees, Graphs.</div>
          <div>├── <span className="text-white font-bold">Systems & Unix Environments</span>: Linux kernel parameters, POSIX shell automation, Git workflows.</div>
          <div>└── <span className="text-white font-bold">Secure Design</span>: Defensive programming, Clerk session management, cryptographic challenge sandboxes.</div>
        </div>
      </div>
    </div>
  );
};

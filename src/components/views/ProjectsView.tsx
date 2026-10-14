import React, { useState, useEffect } from 'react';
import { PINNED_PROJECTS } from '../../constants';
import { TRANSLATIONS, LanguageCode } from '../../translations';
import { matchesProject } from '../../projectSearch';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  homepage?: string | null;
  topics?: string[];
}

interface ProjectsViewProps {
  currentLang: LanguageCode;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'pinned' | 'all'>('pinned');
  const [searchQuery, setSearchQuery] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.github.com/users/Frozen-47/repos?sort=updated&per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPinned = PINNED_PROJECTS.filter(project => {
    if (!searchQuery.trim()) return true;
    return matchesProject(
      { name: project.name, description: project.description, tag: project.type },
      searchQuery
    );
  });

  const filteredAllRepos = repos.filter(repo => {
    if (!searchQuery.trim()) return true;
    return matchesProject(
      { name: repo.name, description: repo.description, language: repo.language, topics: repo.topics },
      searchQuery
    );
  });

  return (
    <div className="w-full h-full flex flex-col font-mono bg-[#000000] text-[#e6edf3] overflow-hidden select-text">
      {/* TUI Sub-Header */}
      <div className="p-3 border-b border-[#22262e] bg-[#0d1117] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#1793d1] font-bold text-sm">󰣇</span>
          <span className="text-xs font-bold text-[#e6edf3]">
            pacman -Qe projects | {activeTab === 'pinned' ? filteredPinned.length : filteredAllRepos.length} packages listed
          </span>
        </div>

        {/* FZF Search prompt */}
        <div className="flex items-center gap-1.5 flex-1 max-w-sm justify-end">
          <span className="text-xs text-[#50fa7b] font-bold">[search]$</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="fzf filter..."
            className="w-full max-w-xs bg-[#161b22] border border-[#30363d] px-2.5 py-1 text-xs text-white placeholder:text-[#484f58] outline-none font-mono focus:border-[#1793d1]"
          />
        </div>
      </div>

      {/* Mode Bar */}
      <div className="px-3 py-1.5 border-b border-[#22262e] bg-[#0a0c10] flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pinned')}
            className={`px-2 py-0.5 font-bold transition-none cursor-pointer ${
              activeTab === 'pinned'
                ? 'bg-[#1793d1] text-black'
                : 'text-[#8b949e] hover:text-white bg-[#161b22] border border-[#30363d]'
            }`}
          >
            [ 1: PINNED BUILDS ({PINNED_PROJECTS.length}) ]
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2 py-0.5 font-bold transition-none cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1793d1] text-black'
                : 'text-[#8b949e] hover:text-white bg-[#161b22] border border-[#30363d]'
            }`}
          >
            [ 2: GITHUB REPOSITORIES ({repos.length}) ]
          </button>
        </div>

        <a
          href="https://github.com/Frozen-47"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1793d1] hover:text-[#50fa7b] text-xs font-bold underline"
        >
          github.com/Frozen-47 ↗
        </a>
      </div>

      {/* Projects Table List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 macos-terminal-scroll bg-[#000000]">
        {activeTab === 'pinned' ? (
          <div className="border border-[#22262e] divide-y divide-[#1e232a]">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-3 py-1.5 bg-[#0d1117] text-[11px] font-bold text-[#8b949e] uppercase tracking-wider">
              <span className="col-span-1">#</span>
              <span className="col-span-3">PROJECT</span>
              <span className="col-span-2">TYPE</span>
              <span className="col-span-4">TARGET URL</span>
              <span className="col-span-2 text-right">ACTION</span>
            </div>

            {filteredPinned.map((proj, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 px-3 py-2.5 hover:bg-[#0d1117] transition-none items-center text-xs gap-1 border-t border-[#1e232a]"
              >
                <span className="col-span-1 text-[#6e7681] font-mono">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="col-span-3">
                  <span className="font-bold text-[#e6edf3] hover:text-[#50fa7b] block">
                    {proj.name}
                  </span>
                  <span className="text-[11px] text-[#8b949e] block line-clamp-1">
                    {proj.description}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className={`px-1.5 py-0.2 text-[10px] font-bold uppercase ${
                    proj.type === 'Live' ? 'bg-[#50fa7b] text-black' : 'bg-[#1793d1] text-black'
                  }`}>
                    {proj.type}
                  </span>
                </div>
                <div className="col-span-4 truncate text-[#8b949e] text-[11px]">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1793d1] underline"
                  >
                    {proj.url}
                  </a>
                </div>
                <div className="col-span-2 text-right">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 text-[11px] font-mono bg-[#161b22] hover:bg-[#1793d1] text-white hover:text-black border border-[#30363d] inline-block font-bold cursor-pointer"
                  >
                    [ OPEN ↗ ]
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#22262e] divide-y divide-[#1e232a]">
            <div className="grid grid-cols-12 px-3 py-1.5 bg-[#0d1117] text-[11px] font-bold text-[#8b949e] uppercase tracking-wider">
              <span className="col-span-4">REPOSITORY</span>
              <span className="col-span-2">LANGUAGE</span>
              <span className="col-span-2">STATS</span>
              <span className="col-span-4 text-right">TARGET</span>
            </div>

            {isLoading && repos.length === 0 ? (
              <div className="p-8 text-center text-[#8b949e] text-xs">
                synchronizing with api.github.com/users/Frozen-47/repos...
              </div>
            ) : (
              filteredAllRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="grid grid-cols-12 px-3 py-2 hover:bg-[#0d1117] transition-none items-center text-xs gap-1 border-t border-[#1e232a]"
                >
                  <div className="col-span-4 min-w-0">
                    <span className="font-bold text-[#50fa7b] block truncate">
                      {repo.name}
                    </span>
                    <span className="text-[11px] text-[#8b949e] block truncate">
                      {repo.description || "Open-source codebase by Sabareesh."}
                    </span>
                  </div>
                  <div className="col-span-2 text-[#e6edf3] text-[11px]">
                    {repo.language ? `[ ${repo.language} ]` : '--'}
                  </div>
                  <div className="col-span-2 text-[11px] text-[#8b949e]">
                    ★ {repo.stargazers_count} · ⑂ {repo.forks_count}
                  </div>
                  <div className="col-span-4 text-right">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-[11px] font-mono bg-[#161b22] hover:bg-[#50fa7b] text-white hover:text-black border border-[#30363d] inline-block font-bold"
                    >
                      [ REPO ↗ ]
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAudioPlayer } from '../../context/AudioContext';

export const MusicPlayerView: React.FC = () => {
  const {
    playlist,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle
  } = useAudioPlayer();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const tags = ['ALL', 'L', 'KIRA', 'MISA', 'DN', 'OP', 'ED'];

  const filteredPlaylist = playlist.filter((track) => {
    const matchesTag = selectedTag === 'ALL' || track.tag === selectedTag;
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.trackNumber.includes(searchQuery);
    return matchesTag && matchesSearch;
  });

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const renderProgressBar = (pct: number) => {
    const totalChars = 40;
    const filled = Math.round((pct / 100) * totalChars);
    const empty = Math.max(0, totalChars - filled);
    return `[${'='.repeat(Math.max(0, filled - 1))}>${'-'.repeat(empty)}]`;
  };

  return (
    <div className="w-full h-full flex flex-col font-mono bg-[#000000] text-[#e6edf3] overflow-hidden select-text">
      {/* NCMPCPP Top Bar */}
      <div className="p-3 border-b border-[#22262e] bg-[#0d1117] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#1793d1] font-bold text-sm">󰣇</span>
          <span className="text-xs font-bold text-[#e6edf3]">
            ncmpcpp v0.9.2 :: DEATH NOTE ORIGINAL SOUNDTRACK (30 TRACKS)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#50fa7b] font-bold">
            [{isPlaying ? '▶ PLAYING' : '⏸ PAUSED'}]
          </span>
          <span className="text-[#8b949e]">
            Vol: {isMuted ? 'MUTE' : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane: Now Playing & Audio Controls */}
        <div className="w-full lg:w-5/12 p-4 border-b lg:border-b-0 lg:border-r border-[#22262e] bg-[#0a0c10] flex flex-col justify-between space-y-4 overflow-y-auto">
          {/* Track Box */}
          <div className="border border-[#22262e] bg-[#000000] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8b949e] border-b border-[#1e232a] pb-2">
              <span className="text-[#1793d1] font-bold">┌──[ NOW PLAYING ]</span>
              <span>{currentTrack.edition} #{currentTrack.trackNumber}</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-sm font-bold text-white">
                {currentTrack.title}
              </div>
              <div className="text-[#8b949e]">
                Artist: <span className="text-[#d8dee9]">{currentTrack.artist}</span>
              </div>
              <div className="text-[#8b949e]">
                Album : <span className="text-[#d8dee9]">{currentTrack.album}</span>
              </div>
              <div className="text-[#8b949e]">
                Tag   : <span className="text-[#50fa7b] font-bold">[{currentTrack.tag}]</span>
              </div>
            </div>

            {/* ASCII Time Scrubber */}
            <div className="pt-2 space-y-1">
              <div className="text-xs font-mono text-[#1793d1] flex items-center justify-between">
                <span>{formatTime(currentTime)}</span>
                <span className="tracking-tighter">{renderProgressBar(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* ASCII Visualizer Banner */}
          <div className="border border-[#22262e] bg-[#000000] p-3 space-y-1 text-center select-none">
            <span className="text-[10px] text-[#6e7681] block">SPECTRUM ANALYZER</span>
            <div className="text-[#50fa7b] text-xs tracking-widest font-mono">
              {isPlaying
                ? "|| | ||| |||| | ||||| ||| || |||| ||| |||||"
                : ".. . ... .... . ..... ... .. .... ... ....."}
            </div>
          </div>

          {/* Terminal Playback Control Buttons */}
          <div className="border border-[#22262e] bg-[#000000] p-3 space-y-2">
            <div className="text-xs text-[#8b949e] pb-1 border-b border-[#1e232a]">
              COMMAND SHORTCUTS:
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={togglePlay}
                className="px-2.5 py-1 font-bold bg-[#1793d1] hover:bg-[#50fa7b] text-black transition-none cursor-pointer"
              >
                {isPlaying ? "[ PAUSE ]" : "[ PLAY ]"}
              </button>
              <button
                onClick={prevTrack}
                className="px-2 py-1 bg-[#161b22] hover:bg-[#21262d] text-white border border-[#30363d] cursor-pointer"
              >
                [ PREV ]
              </button>
              <button
                onClick={nextTrack}
                className="px-2 py-1 bg-[#161b22] hover:bg-[#21262d] text-white border border-[#30363d] cursor-pointer"
              >
                [ NEXT ]
              </button>
              <button
                onClick={toggleShuffle}
                className={`px-2 py-1 border border-[#30363d] cursor-pointer ${
                  isShuffle ? 'bg-[#50fa7b] text-black font-bold' : 'bg-[#161b22] text-white'
                }`}
              >
                [ SHUFFLE ]
              </button>
              <button
                onClick={toggleMute}
                className="px-2 py-1 bg-[#161b22] hover:bg-[#21262d] text-white border border-[#30363d] cursor-pointer"
              >
                {isMuted ? "[ UNMUTE ]" : "[ MUTE ]"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Pane: Playlist Table */}
        <div className="w-full lg:w-7/12 flex flex-col bg-[#000000] overflow-hidden">
          {/* Filter Bar */}
          <div className="p-2.5 border-b border-[#22262e] bg-[#0d1117] flex items-center justify-between gap-2 shrink-0 text-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="filter tracks..."
              className="bg-[#161b22] border border-[#30363d] px-2 py-1 text-xs text-white placeholder:text-[#484f58] outline-none font-mono focus:border-[#1793d1] w-48"
            />
            <div className="flex items-center gap-1 overflow-x-auto">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(t)}
                  className={`px-1.5 py-0.5 text-[11px] font-bold cursor-pointer ${
                    selectedTag === t
                      ? 'bg-[#1793d1] text-black'
                      : 'bg-[#161b22] text-[#8b949e] hover:text-white border border-[#30363d]'
                  }`}
                >
                  [{t}]
                </button>
              ))}
            </div>
          </div>

          {/* Tracks List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1e232a] macos-terminal-scroll">
            {filteredPlaylist.map((track) => {
              const isCurrent = playlist[currentTrackIndex]?.id === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    const actualIdx = playlist.findIndex(p => p.id === track.id);
                    if (actualIdx !== -1) playTrack(actualIdx);
                  }}
                  className={`w-full px-3 py-2 flex items-center justify-between text-left text-xs font-mono transition-none cursor-pointer ${
                    isCurrent
                      ? 'bg-[#1793d1] text-black font-bold'
                      : 'hover:bg-[#0d1117] text-[#d8dee9]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="w-6 shrink-0 text-right opacity-80">
                      {track.trackNumber}
                    </span>
                    <span className="shrink-0">{isCurrent && isPlaying ? "▶" : " "}</span>
                    <span className="truncate">{track.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-1 py-0.2 uppercase ${
                      isCurrent ? 'bg-black text-[#50fa7b]' : 'bg-[#161b22] text-[#8b949e]'
                    }`}>
                      {track.tag}
                    </span>
                    <span className="text-[11px] opacity-80">
                      {track.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Music, Shuffle, ListMusic } from 'lucide-react';
import { DEATH_NOTE_TRACKS, DeathNoteTrack } from '../../data/deathNoteTracks';

export default function SpotifyWidget() {
  const [playlist, setPlaylist] = useState<DeathNoteTrack[]>(DEATH_NOTE_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Dragging States & Refs
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const draggedDistanceRef = useRef(0);
  const widgetRef = useRef<HTMLElement | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const currentTrack = playlist[currentTrackIndex] || DEATH_NOTE_TRACKS[0];

  const startDrag = (clientX: number, clientY: number, currentTarget: HTMLElement) => {
    setIsDragging(true);
    draggedDistanceRef.current = 0;

    let initialX: number;
    let initialY: number;

    if (position) {
      initialX = position.x;
      initialY = position.y;
    } else {
      const rect = currentTarget.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;
    }

    dragRef.current = {
      startX: clientX,
      startY: clientY,
      posX: initialX,
      posY: initialY
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    
    // Ignore inputs, sliders
    if (target.tagName === 'INPUT' || target.closest('input')) {
      return;
    }

    // Ignore child buttons inside the card (except the container button itself)
    const closestButton = target.closest('button');
    if (closestButton && closestButton !== widgetRef.current) {
      return;
    }

    // Ignore interactive child controls
    const closestInteractive = target.closest('.cursor-pointer');
    if (closestInteractive && closestInteractive !== widgetRef.current) {
      return;
    }

    e.preventDefault();
    startDrag(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    
    // Ignore inputs, sliders
    if (target.tagName === 'INPUT' || target.closest('input')) {
      return;
    }

    // Ignore child buttons inside the card
    const closestButton = target.closest('button');
    if (closestButton && closestButton !== widgetRef.current) {
      return;
    }

    // Ignore interactive child controls
    const closestInteractive = target.closest('.cursor-pointer');
    if (closestInteractive && closestInteractive !== widgetRef.current) {
      return;
    }

    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, e.currentTarget);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      draggedDistanceRef.current = Math.sqrt(dx * dx + dy * dy);

      let newX = dragRef.current.posX + dx;
      let newY = dragRef.current.posY + dy;

      const rect = widgetRef.current?.getBoundingClientRect();
      const width = rect?.width || 256;
      const height = rect?.height || 180;
      newX = Math.max(0, Math.min(window.innerWidth - width, newX));
      newY = Math.max(0, Math.min(window.innerHeight - height, newY));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragRef.current.startX;
      const dy = touch.clientY - dragRef.current.startY;
      draggedDistanceRef.current = Math.sqrt(dx * dx + dy * dy);

      let newX = dragRef.current.posX + dx;
      let newY = dragRef.current.posY + dy;

      const rect = widgetRef.current?.getBoundingClientRect();
      const width = rect?.width || 256;
      const height = rect?.height || 180;
      newX = Math.max(0, Math.min(window.innerWidth - width, newX));
      newY = Math.max(0, Math.min(window.innerHeight - height, newY));

      setPosition({ x: newX, y: newY });
    };

    const stopDragging = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', stopDragging);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging]);

  // Constrain position on minimize/expand transitions to prevent going off-screen
  useEffect(() => {
    if (!position) return;
    const width = isMinimized ? 48 : 256;
    const height = isMinimized ? 48 : 220;
    const newX = Math.max(0, Math.min(window.innerWidth - width, position.x));
    const newY = Math.max(0, Math.min(window.innerHeight - height, position.y));
    if (newX !== position.x || newY !== position.y) {
      setPosition({ x: newX, y: newY });
    }
  }, [isMinimized]);

  // Auto-minimize when clicking outside of the widget
  useEffect(() => {
    if (isMinimized) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsMinimized(true);
      }
    };

    const handleTouchStartOutside = (event: TouchEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleTouchStartOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchStartOutside);
    };
  }, [isMinimized]);

  const containerStyle: React.CSSProperties = position 
    ? { 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        bottom: 'auto',
        transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
        willChange: isDragging ? 'left, top' : undefined
      } 
    : {
        transition: 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'
      };

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audio.volume = isMuted ? 0 : volume;
    audio.loop = false;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    let didTryFallback = false;
    const handleError = () => {
      // If primary stream fails, try fallback if available
      if (!didTryFallback && currentTrack.fallbackUrl && currentTrack.fallbackUrl !== currentTrack.url) {
        didTryFallback = true;
        audio.src = currentTrack.fallbackUrl;
        if (isPlaying) {
          audio.play().catch(() => handleNext());
        }
        return;
      }
      // Auto-skip to next track if audio fails to load
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // If it was playing, resume playing the new track
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack.url]);

  // Handle Play/Pause changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle Volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const toggleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextShuffle = !isShuffle;
    setIsShuffle(nextShuffle);

    if (nextShuffle) {
      // Shuffle remaining playlist tracks, keeping currently playing track at index 0
      const remainingTracks = playlist.filter((_, idx) => idx !== currentTrackIndex);
      for (let i = remainingTracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingTracks[i], remainingTracks[j]] = [remainingTracks[j], remainingTracks[i]];
      }
      const shuffled = [currentTrack, ...remainingTracks];
      setPlaylist(shuffled);
      setCurrentTrackIndex(0);
    } else {
      // Restore original unshuffled list sequence
      const originalIndex = DEATH_NOTE_TRACKS.findIndex(t => t.id === currentTrack.id);
      setPlaylist(DEATH_NOTE_TRACKS);
      setCurrentTrackIndex(originalIndex >= 0 ? originalIndex : 0);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!audioRef.current || !progressRef.current || duration === 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = percentage * duration;
    setProgress(percentage * 100);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const coverImage = currentTrack.cover || currentTrack.artwork;

  return (
    <>
      <style>{`
        @keyframes soundwave {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
        .visualizer-bar {
          width: 2px;
          background-color: rgb(16 185 129);
          animation: soundwave 1.2s ease-in-out infinite;
        }
        .visualizer-bar:nth-child(2) { animation-delay: 0.15s; animation-duration: 0.9s; }
        .visualizer-bar:nth-child(3) { animation-delay: 0.3s; animation-duration: 1.4s; }
        .visualizer-bar:nth-child(4) { animation-delay: 0.45s; animation-duration: 0.7s; }
        .visualizer-bar:nth-child(5) { animation-delay: 0.1s; animation-duration: 1.1s; }
        .widget-no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .widget-no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {isMinimized ? (
        // Minimized State - A beautiful floating spinning vinyl record
        <button
          ref={el => { widgetRef.current = el; }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => {
            if (draggedDistanceRef.current > 5) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            setIsMinimized(false);
          }}
          style={containerStyle}
          className="fixed bottom-6 left-6 z-[100] group flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:scale-105 select-none cursor-pointer focus:outline-none cursor-grab active:cursor-grabbing"
          title="Death Note Music Player"
          aria-label="Open Death Note music player"
        >
          {/* Vinyl Disc */}
          <div className="relative w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center overflow-hidden">
            {/* Spinning cover with actual image */}
            <img
              src={coverImage}
              alt={currentTrack.title}
              className={`w-full h-full object-cover rounded-full animate-[spin_6s_linear_infinite] ${!isPlaying ? 'opacity-80' : ''}`}
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
            {/* Vinyl grooves */}
            <div className="absolute inset-0 rounded-full border border-black/30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.2)_50%,transparent_60%)]" />
          </div>

          {/* Small music note badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white scale-90 shadow-sm">
            {isPlaying ? (
              // Mini music visualizer bars in bubble
              <div className="flex gap-[1px] items-end h-2">
                <span className="w-[1px] h-1 bg-white animate-pulse" />
                <span className="w-[1px] h-2 bg-white animate-pulse [animation-delay:0.2s]" />
                <span className="w-[1px] h-1 bg-white animate-pulse [animation-delay:0.4s]" />
              </div>
            ) : (
              <Music className="w-2.5 h-2.5" />
            )}
          </div>
        </button>
      ) : (
        // Expanded State - Sleek Glassmorphic Music Player Card
        <div 
          ref={el => { widgetRef.current = el; }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={containerStyle}
          className="fixed bottom-6 left-6 z-[100] w-64 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-lg p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col gap-3.5 select-none scale-100 origin-bottom-left cursor-grab active:cursor-grabbing widget-no-scrollbar"
          role="region"
          aria-label="Death Note Soundtrack Player"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold tracking-widest text-black/40 dark:text-white/40 uppercase flex items-center gap-1.5">
              <span className="flex h-1.5 w-1.5 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? 'bg-emerald-400' : 'bg-zinc-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isPlaying ? 'bg-emerald-500' : 'bg-zinc-500'}`}></span>
              </span>
              DEATH NOTE OST
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowPlaylist(prev => !prev); }}
                className={`p-1 rounded text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer ${showPlaylist ? 'text-emerald-500 dark:text-emerald-400' : ''}`}
                title={showPlaylist ? "Hide tracklist" : "View tracklist"}
                aria-label="Toggle tracklist"
              >
                <ListMusic className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                className="p-1 rounded text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer"
                title="Minimize"
                aria-label="Minimize player"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Playlist View or Main Player View */}
          {showPlaylist ? (
            <div 
              className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-0.5 text-xs widget-no-scrollbar" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="text-[9px] font-semibold tracking-wider text-black/40 dark:text-white/40 uppercase px-1 pb-1 flex justify-between">
                <span>Select Track</span>
                <span>{playlist.length} Tracks</span>
              </div>
              {playlist.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                const trackCover = track.cover || track.artwork;
                return (
                  <button
                    key={track.id || idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentTrackIndex(idx);
                      setIsPlaying(true);
                      setShowPlaylist(false);
                    }}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer w-full ${
                      isSelected 
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium' 
                        : 'hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70'
                    }`}
                  >
                    <img src={trackCover} alt="" className="w-6 h-6 rounded object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-[11px] font-medium leading-tight">{track.title}</div>
                      <div className="truncate text-[9px] text-black/40 dark:text-white/40">{track.edition} • {track.artist}</div>
                    </div>
                    <span className="text-[9px] font-mono text-black/30 dark:text-white/30 shrink-0">{track.duration}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              {/* Info Area */}
              <div className="flex items-center gap-3">
                {/* Spinning Vinyl with Actual Image */}
                <div className="relative w-12 h-12 rounded-full bg-zinc-950 flex-shrink-0 flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src={coverImage}
                    alt={currentTrack.title}
                    className="w-12 h-12 object-cover rounded-full animate-[spin_8s_linear_infinite]"
                    style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                  />
                  {/* Vinyl grooves and center hole */}
                  <div className="absolute inset-0 rounded-full border border-black/30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.2)_50%,transparent_60%)]" />
                </div>

                {/* Title & Artist */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-black dark:text-white truncate tracking-tight" title={currentTrack.title}>
                    {currentTrack.title}
                  </h4>
                  <p className="text-[10px] text-black/50 dark:text-white/50 truncate tracking-wide mt-0.5" title={`${currentTrack.artist} • ${currentTrack.edition}`}>
                    {currentTrack.artist} • {currentTrack.edition}
                  </p>
                </div>

                {/* Sound wave visualizer */}
                {isPlaying && (
                  <div className="flex items-end gap-[1.5px] h-3.5 mb-1 px-1">
                    <span className="visualizer-bar" />
                    <span className="visualizer-bar" />
                    <span className="visualizer-bar" />
                    <span className="visualizer-bar" />
                    <span className="visualizer-bar" />
                  </div>
                )}
              </div>

              {/* Progress Bar & Timing */}
              <div className="space-y-1">
                <div 
                  ref={progressRef}
                  onClick={handleProgressBarClick}
                  className="h-1 w-full bg-black/10 dark:bg-white/10 rounded-full cursor-pointer overflow-hidden relative group"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-100 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-black/45 dark:text-white/45">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Bar */}
              <div className="flex items-center justify-between pt-0.5">
                {/* Playback Controls */}
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={handlePrevious}
                    className="w-7 h-7 rounded-full border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                    title="Previous Track"
                    aria-label="Previous track"
                  >
                    <SkipBack className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                  </button>
                  <button 
                    onClick={() => handleNext()}
                    className="w-7 h-7 rounded-full border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                    title="Next Track"
                    aria-label="Next track"
                  >
                    <SkipForward className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button 
                    onClick={toggleShuffle}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                      isShuffle 
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400' 
                        : 'border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    title={isShuffle ? "Shuffle: ON" : "Shuffle: OFF"}
                    aria-label="Toggle shuffle"
                  >
                    <Shuffle className="w-3 h-3" />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-14 h-[3px] accent-emerald-500 cursor-pointer bg-black/10 dark:bg-white/10 rounded-full appearance-none outline-none"
                    aria-label="Volume slider"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

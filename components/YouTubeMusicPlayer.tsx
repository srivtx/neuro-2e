"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronUp, ChevronDown, Search, Key, Loader2 } from "lucide-react";

interface QuickPlay {
  id: string;
  name: string;
  videoId: string;
}

const DEFAULT_QUICK_PLAYS: QuickPlay[] = [
  { id: "msmw", name: "Late Night", videoId: "lTRiuFIWV54" },
  { id: "warmup", name: "Lofi Radio", videoId: "7NOSDKb0HlU" },
  { id: "derivation", name: "Deep Focus", videoId: "amfWIRasxtI" },
  { id: "break", name: "Chill Beats", videoId: "PNwplS-YFzU" },
];

const VOLUME_KEY = "neuro-os-music-volume";
const API_KEY_KEY = "neuro-os-youtube-api-key";
const CUSTOM_PLAYLISTS_KEY = "neuro-os-custom-playlists";

interface SearchResult {
  videoId: string;
  title: string;
  thumbnail: string;
  channel: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoaded = false;
let apiCallbacks: (() => void)[] = [];

function loadYouTubeAPI() {
  if (apiLoaded) return;
  if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) return;

  window.onYouTubeIframeAPIReady = () => {
    apiLoaded = true;
    apiCallbacks.forEach((cb) => cb());
    apiCallbacks = [];
  };

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function onAPIReady(callback: () => void) {
  if (apiLoaded && window.YT?.Player) {
    callback();
  } else {
    apiCallbacks.push(callback);
    loadYouTubeAPI();
  }
}

export default function YouTubeMusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(VOLUME_KEY);
      return saved ? parseInt(saved, 10) : 50;
    }
    return 50;
  });
  const [currentTrackTitle, setCurrentTrackTitle] = useState("—");
  const [currentQuickIdx, setCurrentQuickIdx] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [customPlaylists, setCustomPlaylists] = useState<QuickPlay[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CUSTOM_PLAYLISTS_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(API_KEY_KEY) || "";
    }
    return "";
  });
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchCacheRef = useRef<Map<string, SearchResult[]>>(new Map());

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerCreatedRef = useRef(false);
  const allQuickPlays = [...DEFAULT_QUICK_PLAYS, ...customPlaylists];

  function updateTitle(player: any) {
    try {
      const data = player.getVideoData();
      if (data?.title) {
        setCurrentTrackTitle(data.title);
      }
    } catch {
      // ignore
    }
  }

  // Initialize player — runs ONCE only
  useEffect(() => {
    if (playerCreatedRef.current) return;
    
    onAPIReady(() => {
      if (playerCreatedRef.current || !containerRef.current) return;
      playerCreatedRef.current = true;

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          width: "200",
          height: "113",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(volume);
              setPlayerReady(true);
              updateTitle(event.target);
            },
            onStateChange: (event: any) => {
              const isNowPlaying = event.data === window.YT.PlayerState.PLAYING;
              setIsPlaying(isNowPlaying);
              if (isNowPlaying) {
                updateTitle(event.target);
              }
            },
            onError: () => {
              setError("Playback error. Try another video.");
              setTimeout(() => setError(null), 3000);
            },
          },
        });
      } catch {
        setError("Failed to initialize player. Reload the page.");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Progress tracking — polls every second while playing
  useEffect(() => {
    if (!isPlaying || isSeeking) return;
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
        try {
          setCurrentTime(playerRef.current.getCurrentTime());
          setDuration(playerRef.current.getDuration());
        } catch {
          // ignore
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isSeeking]);

  // Persist volume
  useEffect(() => {
    localStorage.setItem(VOLUME_KEY, String(volume));
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  // Persist custom playlists
  useEffect(() => {
    localStorage.setItem(CUSTOM_PLAYLISTS_KEY, JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  // Search with debounce and rate limiting
  useEffect(() => {
    if (!apiKey || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.trim();
    
    if (searchCacheRef.current.has(query)) {
      setSearchResults(searchCacheRef.current.get(query)!);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 600);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, apiKey]);

  async function performSearch(query: string) {
    if (!apiKey || !query) return;
    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${apiKey}`
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.error?.code === 403) {
          setError("API quota exceeded or key invalid.");
        } else {
          setError("Search failed. Check your API key.");
        }
        setIsSearching(false);
        return;
      }

      const data = await response.json();
      const results: SearchResult[] = data.items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.default?.url || "",
        channel: item.snippet.channelTitle,
      }));

      searchCacheRef.current.set(query, results);
      setSearchResults(results);
    } catch {
      setError("Network error. Check connection.");
    } finally {
      setIsSearching(false);
    }
  }

  const playVideo = (videoId: string) => {
    if (!playerRef.current?.loadVideoById || !playerReady) return;
    playerRef.current.loadVideoById(videoId);
    setIsPlaying(true);
    setSearchResults([]);
    setSearchQuery("");
    setError(null);
  };

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo?.();
    } else {
      // If no video is loaded yet (fresh page), load the first quick play
      const currentState = playerRef.current.getPlayerState?.();
      if (currentState === -1 || currentState === 5 || !playerRef.current.getVideoData?.()?.video_id) {
        switchPlaylist(0);
      } else {
        playerRef.current.playVideo?.();
      }
    }
  };

  const nextTrack = () => {
    if (!playerReady) return;
    const nextIdx = (currentQuickIdx + 1) % allQuickPlays.length;
    switchPlaylist(nextIdx);
  };

  const prevTrack = () => {
    if (!playerReady) return;
    const prevIdx = (currentQuickIdx - 1 + allQuickPlays.length) % allQuickPlays.length;
    switchPlaylist(prevIdx);
  };

  const switchPlaylist = (index: number) => {
    if (!playerRef.current?.loadVideoById || !playerReady) return;
    const quick = allQuickPlays[index];
    if (!quick) return;

    try {
      playerRef.current.loadVideoById(quick.videoId);
      setCurrentQuickIdx(index);
      setIsPlaying(true);
      setError(null);
    } catch {
      setError("Failed to load video.");
    }
  };

  const saveApiKey = () => {
    const key = apiKeyInput.trim();
    if (!key) return;
    setApiKey(key);
    localStorage.setItem(API_KEY_KEY, key);
    setShowApiKeyInput(false);
    setApiKeyInput("");
    setError(null);
  };

  const removeApiKey = () => {
    setApiKey("");
    localStorage.removeItem(API_KEY_KEY);
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <>
      {/* Iframe container — stable ref that React never reconciles */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: 200,
          height: 113,
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Widget */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2">
        {/* Expanded Mode */}
        {isExpanded && (
          <div className="w-80 bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <Music size={14} className="text-zinc-400" />
                <span className="text-xs font-mono text-zinc-400 uppercase">Music</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* API Key Section */}
            <div className="px-3 py-2 border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-zinc-500 font-mono uppercase">YouTube API Key</div>
                {apiKey && (
                  <button
                    onClick={removeApiKey}
                    className="text-[10px] text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              {apiKey ? (
                <div className="text-xs text-emerald-400 mt-1">Active</div>
              ) : (
                <div className="mt-1.5 space-y-1.5">
                  {!showApiKeyInput ? (
                    <button
                      onClick={() => setShowApiKeyInput(true)}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      <Key size={12} /> Add API key to enable search
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveApiKey()}
                        placeholder="Paste your YouTube Data API v3 key"
                        className="flex-1 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-600 outline-none"
                      />
                      <button
                        onClick={saveApiKey}
                        disabled={!apiKeyInput.trim()}
                        className="px-2 py-1 bg-white text-black text-xs rounded hover:bg-zinc-200 transition-colors disabled:opacity-30"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Search */}
            {apiKey && (
              <div className="px-3 py-2 border-b border-neutral-800">
                <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1.5">Search YouTube</div>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && performSearch(searchQuery)}
                      placeholder="Search for music..."
                      className="w-full px-2 py-1.5 pl-7 bg-neutral-900 border border-neutral-800 rounded text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-600 outline-none"
                    />
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600" />
                  </div>
                  <button
                    onClick={() => performSearch(searchQuery)}
                    disabled={!searchQuery.trim() || isSearching}
                    className="px-2.5 py-1.5 bg-white text-black text-xs rounded hover:bg-zinc-200 transition-colors disabled:opacity-30 flex items-center gap-1"
                  >
                    {isSearching ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}
                  </button>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.videoId}
                        onClick={() => playVideo(result.videoId)}
                        className="w-full flex items-center gap-2 p-1.5 rounded hover:bg-neutral-900 transition-colors text-left"
                      >
                        {result.thumbnail && (
                          <img
                            src={result.thumbnail}
                            alt=""
                            className="w-10 h-8 object-cover rounded flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-zinc-300 truncate">{result.title}</div>
                          <div className="text-[10px] text-zinc-500 truncate">{result.channel}</div>
                        </div>
                        <Play size={12} className="text-zinc-500 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Track info */}
            <div className="px-3 py-2">
              <div className="text-[10px] text-zinc-500 font-mono uppercase mb-0.5">Now Playing</div>
              <div className="text-xs text-zinc-300 truncate" title={currentTrackTitle}>
                {currentTrackTitle}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 w-8 text-right">
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-1.5 bg-neutral-800 rounded-full cursor-pointer relative group"
                  onClick={(e) => {
                    if (!playerRef.current?.seekTo || !duration) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    const time = pct * duration;
                    playerRef.current.seekTo(time, true);
                    setCurrentTime(time);
                  }}
                >
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%`, transform: `translate(-50%, -50%)` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 w-8">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 px-3 py-2">
              <button
                onClick={prevTrack}
                disabled={!playerReady}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
              >
                <SkipBack size={16} />
              </button>
              <button
                onClick={togglePlay}
                disabled={!playerReady}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors disabled:opacity-30"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
              <button
                onClick={nextTrack}
                disabled={!playerReady}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
              >
                <SkipForward size={16} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-neutral-800">
              <button
                onClick={() => setVolume(volume === 0 ? 50 : 0)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                className="flex-1 h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-white"
              />
              <span className="text-[10px] font-mono text-zinc-500 w-6 text-right">{volume}</span>
            </div>

            {/* Quick Plays */}
            <div className="px-3 py-2 border-t border-neutral-800">
              <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1.5">Quick Play</div>
              <div className="space-y-1">
                {allQuickPlays.map((pl, i) => (
                  <button
                    key={pl.id}
                    onClick={() => switchPlaylist(i)}
                    disabled={!playerReady}
                    className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors disabled:opacity-30 ${
                      currentQuickIdx === i
                        ? "bg-neutral-800 text-white"
                        : "text-zinc-400 hover:bg-neutral-900 hover:text-zinc-300"
                    }`}
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-3 py-2 bg-amber-950/20 border-t border-amber-900/50">
                <div className="text-xs text-amber-400">{error}</div>
              </div>
            )}
          </div>
        )}

        {/* Minimized Pill */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-9 h-9 bg-neutral-950 border border-neutral-800 rounded-full shadow-lg hover:border-zinc-600 transition-colors flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause size={14} className="text-white" />
            ) : (
              <Play size={14} className="text-zinc-400 ml-0.5" />
            )}
          </button>
        )}
      </div>
    </>
  );
}

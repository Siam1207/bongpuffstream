"use client";

import { useState, useCallback } from "react";
import VideoPlayer from "./components/VideoPlayer";
import ChannelList from "./components/ChannelList";
import NowPlayingLogo from "./components/NowPlayingLogo";
import { channels, type Channel } from "./data/channels";

export default function Home() {
  const [activeChannel, setActiveChannel] = useState<Channel>(channels[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChannelSelect = useCallback((channel: Channel) => {
    setActiveChannel(channel);
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="shrink-0 flex items-center justify-between px-4 md:px-6 h-14 border-b border-white/[0.06] bg-[#0d0d14]/80 backdrop-blur-xl z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm5 3l6 3-6 3V9z" />
            </svg>
            <span className="text-base font-semibold tracking-tight text-white">
              bongpuff<span className="text-purple-400">stream</span>
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
            Live TV
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-2 text-xs text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {channels.filter((c) => c.isLive).length} channels live
          </span>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg border border-white/[0.06] transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Channels
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Player Area */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex items-center justify-center bg-black p-3 md:p-6 relative">
            <div className="player-glow" />

            <div className="relative z-10 w-full max-w-6xl">
              <VideoPlayer
                src={activeChannel.streamUrl}
                channelName={activeChannel.name}
              />
            </div>
          </div>

          {/* Now Playing Bar */}
          <div className="shrink-0 flex items-center justify-between px-4 md:px-6 py-3 bg-[#0d0d14] border-t border-white/[0.06]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center overflow-hidden">
                <NowPlayingLogo channel={activeChannel} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white/90 truncate">
                  {activeChannel.name}
                </p>
                <p className="text-[11px] text-white/30">
                  {activeChannel.category}
                  {activeChannel.viewers && (
                    <span className="ml-2">
                      · {(activeChannel.viewers / 1000).toFixed(1)}K watching
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live
              </span>
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase bg-white/[0.04] text-white/40 rounded-md border border-white/[0.06]">
                HD
              </span>
            </div>
          </div>
        </main>

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-80 xl:w-96 shrink-0 border-l border-white/[0.06] bg-[#0d0d14]">
          <ChannelList
            channels={channels}
            activeChannelId={activeChannel.id}
            onSelect={handleChannelSelect}
          />
        </aside>

        {/* ── Mobile Sidebar Overlay ── */}
        {sidebarOpen && (
          <div className="lg:hidden absolute inset-0 z-20 flex">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative ml-auto w-80 max-w-[85vw] h-full bg-[#0d0d14] border-l border-white/[0.06] shadow-2xl animate-slide-in">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                  Channels
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ChannelList
                channels={channels}
                activeChannelId={activeChannel.id}
                onSelect={handleChannelSelect}
              />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

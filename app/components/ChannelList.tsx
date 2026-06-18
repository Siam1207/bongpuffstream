"use client";

import { useState } from "react";
import type { Channel } from "../data/channels";

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string;
  onSelect: (channel: Channel) => void;
}

function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function ChannelLogo({ channel }: { channel: Channel }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${channel.gradientClass || "from-purple-600 to-pink-600"}`}>
        <span className="text-lg font-bold text-white/90 drop-shadow-lg">
          {channel.name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={channel.logo}
      alt={channel.name}
      className="w-7 h-7 object-contain opacity-80"
      onError={() => setImgError(true)}
    />
  );
}

export default function ChannelList({
  channels,
  activeChannelId,
  onSelect,
}: ChannelListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold tracking-wide text-white/90 uppercase">
          Channels
        </h2>
        <p className="text-xs text-white/30 mt-0.5">
          {channels.length} available
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-3 flex flex-col gap-1">
          {channels.map((channel) => {
            const isActive = channel.id === activeChannelId;

            return (
              <button
                key={channel.id}
                onClick={() => onSelect(channel)}
                className={`group relative flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] border border-white/[0.1] shadow-lg shadow-black/20"
                    : "border border-transparent hover:bg-white/[0.04] hover:border-white/[0.05]"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/[0.06] to-transparent" />
                )}

                <div className="relative shrink-0 w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center overflow-hidden">
                  <ChannelLogo channel={channel} />
                </div>

                <div className="flex-1 min-w-0 relative">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium truncate ${
                        isActive ? "text-white" : "text-white/70 group-hover:text-white/90"
                      }`}
                    >
                      {channel.name}
                    </span>
                    {channel.isLive && (
                      <span className="shrink-0 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-white/30">
                      {channel.category}
                    </span>
                    {channel.viewers && (
                      <>
                        <span className="text-white/10">·</span>
                        <span className="text-[11px] text-white/30">
                          {formatViewers(channel.viewers)} watching
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {isActive && (
                  <div className="shrink-0 relative">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className="w-0.5 bg-purple-400 rounded-full animate-pulse"
                          style={{
                            height: `${8 + i * 4}px`,
                            animationDelay: `${i * 150}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

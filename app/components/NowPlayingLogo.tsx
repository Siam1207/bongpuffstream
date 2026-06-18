"use client";

import { useState } from "react";
import type { Channel } from "../data/channels";

interface NowPlayingLogoProps {
  channel: Channel;
}

export default function NowPlayingLogo({ channel }: NowPlayingLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${channel.gradientClass || "from-purple-600 to-pink-600"}`}>
        <span className="text-xs font-bold text-white/90 drop-shadow-lg">
          {channel.name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={channel.logo}
      alt={channel.name}
      className="w-5 h-5 object-contain opacity-70"
      onError={() => setImgError(true)}
    />
  );
}

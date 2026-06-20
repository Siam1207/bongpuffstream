"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type Player = ReturnType<typeof videojs>;

interface VideoPlayerProps {
  src: string;
  channelName: string;
}

export default function VideoPlayer({ src, channelName }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef<number>(0);
  const maxRetries = 5;
  const [streamError, setStreamError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleStreamError = useCallback((player: Player) => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    if (retryCountRef.current < maxRetries) {
      retryCountRef.current++;
      const delay = Math.min(1000 * Math.pow(2, retryCountRef.current - 1), 5000);
      setIsRetrying(true);
      setStreamError(`Reconnecting... (${retryCountRef.current}/${maxRetries})`);

      retryTimeoutRef.current = setTimeout(() => {
        if (!player.isDisposed()) {
          const currentSrc = player.currentSrc();
          player.src({ src: currentSrc, type: "application/x-mpegURL" });
          player.play()?.catch(() => {});
        }
      }, delay);
    } else {
      setStreamError(
        "Stream connection lost. Please check your internet connection or try another channel."
      );
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered", "vjs-fluid");
    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      controls: true,
      autoplay: true,
      muted: false,
      preload: "auto",
      fluid: true,
      responsive: true,
      liveui: true,

      // HLS Configuration - Premium Streaming Settings
      html5: {
        vhs: {
          overrideNative: true,
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
          handleManifestRedirects: true,
          limitRenditionByPlayerDimensions: true,
          useNetworkInformationApi: true,
          useDevicePixelRatio: true,
          bandwidth: 4194304, // 4 Mbps initial estimate
          experimentalBufferBasedABR: true,
          experimentalExactManifestTimings: true,
          experimentalLLHLS: true,
          liveSyncDuration: 10,
          liveMaxLatencyDuration: 30,
          lowLatencyMode: true,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      },

      // LiveTracker Configuration
      liveTracker: {
        trackingThreshold: 10,
        liveTolerance: 15,
      },

      // Source Buffer Configuration
      sourceBuffer: {
        backBufferLength: 90,
        bufferTimeToLive: 120,
      },

      // Playback Rates
      playbackRates: [0.5, 1, 1.25, 1.5, 2],

      // Control Bar
      controlBar: {
        children: [
          "playToggle",
          "volumePanel",
          "currentTimeDisplay",
          "timeDivider",
          "durationDisplay",
          "progressControl",
          "liveDisplay",
          "seekToLive",
          "remainingTimeDisplay",
          "customControlSpacer",
          "playbackRateMenuButton",
          "chaptersButton",
          "subtitlesButton",
          "captionsButton",
          "pictureInPictureToggle",
          "fullscreenToggle",
        ],
      },

      // Sources
      sources: [
        {
          src,
          type: "application/x-mpegURL",
        },
      ],
    });

    playerRef.current = player;

    // Error handling with auto-retry
    player.on("error", () => {
      handleStreamError(player);
    });

    // Network error handling
    player.on("loadeddata", () => {
      retryCountRef.current = 0;
      setStreamError(null);
      setIsRetrying(false);
    });

    // Stall detection and recovery
    player.on("waiting", () => {
      const timeout = setTimeout(() => {
        if (player.paused() === false && player.buffered().length === 0) {
          handleStreamError(player);
        }
      }, 5000);

      player.one("playing", () => clearTimeout(timeout));
      player.one("error", () => clearTimeout(timeout));
    });

    // Add quality switcher button
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = player as any;
    const qualityButton = p.controlBar.addChild("button", {
      className: "vjs-quality-button vjs-control",
      controlText: "Quality",
    });

    qualityButton.el().innerHTML = `
      <div class="vjs-icon-placeholder">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style="margin: auto;">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-4c0-.55-.45-1-1-1H8v-2h4V5h2v5.5h2V19z"/>
        </svg>
      </div>
    `;

    qualityButton.on("click", () => {
      const tech = p.tech({ IWillNotUseThisInPlugins: true });
      const vhs = tech.vhs;
      if (vhs && vhs.playlists) {
        const playlists = vhs.playlists;
        const currentBandwidth = vhs.bandwidth;
        console.log("Current bandwidth:", currentBandwidth);
        console.log("Available playlists:", playlists.playlists);
      }
    });

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [handleStreamError]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || player.isDisposed()) return;

    const currentSrc = player.currentSrc();
    if (currentSrc !== src) {
      retryCountRef.current = 0;
      setStreamError(null);
      player.src({ src, type: "application/x-mpegURL" });
      player.play()?.catch(() => {});
    }
  }, [src]);

  return (
    <div className="relative w-full">
      <div ref={videoRef} className="w-full" />

      {/* Error Message Display */}
      {streamError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-20 rounded-lg">
          <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${isRetrying ? "bg-yellow-500/20" : "bg-red-500/20"}`}>
              {isRetrying ? (
                <svg className="w-6 h-6 text-yellow-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M9 3h6a3 3 0 013 3v18a3 3 0 01-3 3H9a3 3 0 01-3-3V6a3 3 0 013-3z" />
                </svg>
              )}
            </div>
            <div>
              <p className={`font-semibold ${isRetrying ? "text-yellow-400" : "text-red-400"}`}>
                {isRetrying ? "Reconnecting..." : "Stream Error"}
              </p>
              <p className="text-sm text-white/70 mt-2">{streamError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 pointer-events-none">
        <span className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider text-white uppercase">
            Live
          </span>
        </span>
        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs font-medium text-white/80">
          {channelName}
        </span>
      </div>
    </div>
  );
}

export interface Channel {
  id: string;
  name: string;
  category: string;
  logo: string;
  streamUrl: string;
  viewers?: number;
  isLive?: boolean;
  gradientClass?: string;
}

export const channels: Channel[] = [
  {
    id: "1",
    name: "Stream 1",
    category: "Live",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop",
    streamUrl: "https://1nyaler.streamhostingcdn.top/stream/94/index.m3u8",
    viewers: 12400,
    isLive: true,
    gradientClass: "from-blue-600 to-purple-600",
  },
  {
    id: "2",
    name: "CNN International",
    category: "News",
    logo: "https://images.unsplash.com/photo-1586882829491-66121022b0cf?w=200&h=200&fit=crop",
    streamUrl: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    viewers: 8300,
    isLive: true,
    gradientClass: "from-red-600 to-red-700",
  },
  {
    id: "3",
    name: "MTV Music",
    category: "Music",
    logo: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=200&h=200&fit=crop",
    streamUrl: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
    viewers: 5600,
    isLive: true,
    gradientClass: "from-yellow-500 to-pink-600",
  },
  {
    id: "4",
    name: "Discovery Channel",
    category: "Documentary",
    logo: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=200&h=200&fit=crop",
    streamUrl: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    viewers: 3200,
    isLive: true,
    gradientClass: "from-blue-700 to-cyan-600",
  },
  {
    id: "5",
    name: "Cartoon Network",
    category: "Kids",
    logo: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop",
    streamUrl: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
    viewers: 9100,
    isLive: true,
    gradientClass: "from-pink-500 to-purple-500",
  },
  {
    id: "6",
    name: "Sky Cinema",
    category: "Movies",
    logo: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop",
    streamUrl: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    viewers: 7400,
    isLive: true,
    gradientClass: "from-indigo-900 to-purple-900",
  },
  {
    id: "7",
    name: "National Geographic",
    category: "Documentary",
    logo: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200&h=200&fit=crop",
    streamUrl: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
    viewers: 4500,
    isLive: true,
    gradientClass: "from-yellow-600 to-orange-600",
  },
  {
    id: "8",
    name: "BBC World News",
    category: "News",
    logo: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=200&h=200&fit=crop",
    streamUrl: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    viewers: 15200,
    isLive: true,
    gradientClass: "from-red-700 to-black",
  },
];

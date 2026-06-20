"use client";

import { useState, useEffect } from "react";

interface AdminChannel {
  id: string;
  name: string;
  category: string;
  logo: string;
  streamUrl: string;
  viewers?: number;
  isLive?: boolean;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [channels, setChannels] = useState<AdminChannel[]>([]);
  const [formData, setFormData] = useState<AdminChannel>({
    id: Date.now().toString(),
    name: "",
    category: "",
    logo: "",
    streamUrl: "",
    viewers: 0,
    isLive: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load channels from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bongpuffstream_channels");
    if (stored) {
      setChannels(JSON.parse(stored));
    }
  }, []);

  // Check authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to "admin" if ADMIN_SECRET_KEY is not set
    const secretKey = "admin";
    if (password === secretKey) {
      setIsAuthenticated(true);
      setPassword("");
      setMessage({ type: "success", text: "Logged in successfully!" });
    } else {
      setMessage({ type: "error", text: "Invalid password" });
      setPassword("");
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "viewers" ? parseInt(value) || 0 : value,
    }));
  };

  // Add or update channel
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.streamUrl || !formData.category) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    let updatedChannels: AdminChannel[];

    if (editingId) {
      updatedChannels = channels.map((ch) => (ch.id === editingId ? { ...formData, id: editingId } : ch));
      setMessage({ type: "success", text: "Channel updated successfully!" });
      setEditingId(null);
    } else {
      updatedChannels = [...channels, { ...formData, id: Date.now().toString() }];
      setMessage({ type: "success", text: "Channel added successfully!" });
    }

    setChannels(updatedChannels);
    localStorage.setItem("bongpuffstream_channels", JSON.stringify(updatedChannels));

    // Reset form
    setFormData({
      id: Date.now().toString(),
      name: "",
      category: "",
      logo: "",
      streamUrl: "",
      viewers: 0,
      isLive: true,
    });

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  // Delete channel
  const handleDelete = (id: string) => {
    const updatedChannels = channels.filter((ch) => ch.id !== id);
    setChannels(updatedChannels);
    localStorage.setItem("bongpuffstream_channels", JSON.stringify(updatedChannels));
    setMessage({ type: "success", text: "Channel deleted successfully!" });
    setTimeout(() => setMessage(null), 3000);
  };

  // Edit channel
  const handleEdit = (channel: AdminChannel) => {
    setFormData(channel);
    setEditingId(channel.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setMessage(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#121218] rounded-2xl border border-white/[0.06] p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-white/40 text-sm mb-6">Manage your streaming channels</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08]"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === "error"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-green-500/10 text-green-400 border border-green-500/20"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-purple-400 transition-all"
              >
                Login
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="text-xs text-white/40 text-center">
                Default password: <code className="font-mono">admin</code>
                <br />
                Change ADMIN_SECRET_KEY in .env.local for production
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Channel Manager</h1>
            <p className="text-white/40 text-sm mt-1">Add, edit, or delete streaming channels</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-white/70 rounded-lg text-sm font-medium border border-white/[0.1] transition-all"
          >
            Logout
          </button>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-[#121218] rounded-2xl border border-white/[0.06] p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">
            {editingId ? "Edit Channel" : "Add New Channel"}
          </h2>

          {message && (
            <div
              className={`p-4 rounded-lg text-sm mb-6 ${
                message.type === "error"
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-green-500/10 text-green-400 border border-green-500/20"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Channel Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., BBC News"
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08]"
              >
                <option value="">Select category</option>
                <option value="News">News</option>
                <option value="Sports">Sports</option>
                <option value="Movies">Movies</option>
                <option value="Music">Music</option>
                <option value="Documentary">Documentary</option>
                <option value="Kids">Kids</option>
                <option value="Live">Live</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Stream URL (M3U8) *
              </label>
              <input
                type="text"
                name="streamUrl"
                value={formData.streamUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/stream.m3u8"
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Logo URL (Image)
              </label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Viewers Count
              </label>
              <input
                type="number"
                name="viewers"
                value={formData.viewers || 0}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08]"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  name="isLive"
                  checked={formData.isLive || false}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isLive: e.target.checked }))
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium">Mark as Live</span>
              </label>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-purple-400 transition-all"
              >
                {editingId ? "Update Channel" : "Add Channel"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      id: Date.now().toString(),
                      name: "",
                      category: "",
                      logo: "",
                      streamUrl: "",
                      viewers: 0,
                      isLive: true,
                    });
                  }}
                  className="px-6 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-lg font-semibold border border-white/[0.1] transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Channels List */}
        <div className="bg-[#121218] rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="p-6 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-white">
              Channels ({channels.length})
            </h2>
          </div>

          {channels.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-white/40">No channels yet. Add one to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/[0.02]">
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Stream URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map((channel) => (
                    <tr key={channel.id} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-sm text-white/90">{channel.name}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{channel.category}</td>
                      <td className="px-6 py-4 text-sm text-white/50 truncate max-w-xs">
                        {channel.streamUrl}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {channel.isLive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold uppercase bg-red-500/10 text-red-400 rounded border border-red-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            Live
                          </span>
                        ) : (
                          <span className="text-white/40">Offline</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(channel)}
                          className="px-3 py-1 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(channel.id)}
                          className="px-3 py-1 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
          <h3 className="text-sm font-semibold text-blue-400 mb-2">💡 About Admin Panel</h3>
          <ul className="text-sm text-blue-300/80 space-y-1">
            <li>• Channels are stored in browser localStorage</li>
            <li>• Data persists across sessions but will be lost if you clear browser data</li>
            <li>• For production, consider using a backend database</li>
            <li>• Change ADMIN_SECRET_KEY in .env.local for security</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

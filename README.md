````markdown name=README.md
# BongpuffStream 🎬

A modern, high-performance live TV streaming platform built with Next.js, featuring a beautiful dark-themed UI and smooth HLS video playback.

**Live Demo:** https://bongpuffstream.vercel.app/  
**Admin Panel:** https://bongpuffstream.vercel.app/admin

## ✨ Features

- 📺 **Live TV Streaming** - HLS/M3U8 stream support with adaptive bitrate selection
- 🎨 **Modern Dark UI** - Beautiful, responsive design optimized for all devices
- ⚡ **High Performance** - Optimized video player with automatic quality switching
- 🔄 **Auto-Retry** - Intelligent retry mechanism for failed streams with user-friendly error messages
- 🎛️ **Admin Panel** - Manage channels dynamically without code changes
- 🔐 **Password Protected** - Secure admin access with custom authentication
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🌍 **SEO Optimized** - Complete metadata and Open Graph configuration
- 📊 **Performance Monitoring** - Integrated Vercel Speed Insights
- 🌐 **Multi-Domain Ready** - Environment-based configuration for any domain

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/Siam1207/bongpuffstream.git
cd bongpuffstream
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` and update the following:
```env
# Local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=bongpuffstream

# For Vercel, use:
# NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Admin password (change this!)
ADMIN_SECRET_KEY=admin
```

4. **Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Viewing Streams

1. Go to the main page
2. Select a channel from the list
3. Stream starts automatically
4. Use video controls for playback options (quality, subtitles, fullscreen, etc.)

### Using the Admin Panel

1. Navigate to `/admin`
2. Log in with your admin password (default: `admin`)
3. Add, edit, or delete channels
4. Changes are saved and persist across sessions

**Note:** Channels stored in localStorage are only available on the current device/browser. For production multi-user scenarios, set up a backend database.

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root with these variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME=bongpuffstream
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_DESCRIPTION=Watch Live TV & Sports Streaming Free

# For Vercel production deployment:
# NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# For custom domain:
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Admin Panel
NEXT_PUBLIC_ADMIN_PATH=/admin
ADMIN_SECRET_KEY=your-secure-password-here

# Stream Configuration
NEXT_PUBLIC_ENABLE_STREAM_HEALTH_CHECK=true
NEXT_PUBLIC_STREAM_TIMEOUT=30000

# Analytics (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Adding Stream URLs

You have two options:

**Option 1: Hardcoded (for development)**
Edit `app/data/channels.ts`:
```typescript
export const channels: Channel[] = [
  {
    id: "1",
    name: "BBC News",
    category: "News",
    logo: "https://example.com/bbc.png",
    streamUrl: "https://example.com/bbc/stream.m3u8",
    viewers: 5000,
    isLive: true,
  },
];
```

**Option 2: Admin Panel (recommended)**
1. Go to `/admin`
2. Log in with admin password
3. Add channels through the UI
4. Changes are saved automatically

### Deployment Domains

**For Vercel Deployment:**
```env
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**For Custom Domain:**
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

The metadata (Open Graph, Twitter, canonical URLs) will automatically update based on your domain.

## 🔧 Customization

### Change Admin Password

Update `.env.local`:
```env
ADMIN_SECRET_KEY=my-super-secret-password
```

### Update Site Metadata

The site automatically generates metadata from environment variables. Edit `.env.local`:
```env
NEXT_PUBLIC_SITE_NAME=YourBrand
NEXT_PUBLIC_SITE_DESCRIPTION=Your custom description
```

### Customize Theme Colors

Edit `app/globals.css` and `app/page.tsx` to change:
- Primary color (currently purple #9333ea)
- Background color (currently #0a0a0f)
- Accent colors
- Font styling

### Change Player Controls

Edit `app/components/VideoPlayer.tsx` to modify:
- Control bar buttons and layout
- Playback rate options
- Quality selection behavior
- Auto-retry settings

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Create Vercel Project:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Set Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add these variables:
     ```
     NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
     NEXT_PUBLIC_SITE_NAME=bongpuffstream
     ADMIN_SECRET_KEY=your-secure-password
     ```
   - Redeploy the project

4. **Configure Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., yourdomain.com)
   - Follow DNS configuration steps provided by Vercel
   - Update `NEXT_PUBLIC_SITE_URL` in environment variables

## 📱 Mobile Optimization

The app includes mobile-first optimizations:
- Touch-friendly video player controls
- Responsive sidebar (collapses on mobile)
- Mobile-optimized network requests
- Smooth animations on low-end devices
- Viewport optimization

## 🔐 Security

### For Development
- Default admin password is `admin`
- Fine for local testing only

### For Production
1. **Change admin password:**
   ```env
   ADMIN_SECRET_KEY=your-random-secure-password
   ```

2. **Use HTTPS:**
   - Vercel provides automatic HTTPS
   - Custom domains use Let's Encrypt

3. **Additional Recommendations:**
   - Don't commit `.env.local` to version control
   - Use environment variables for sensitive data
   - Consider adding rate limiting for admin panel
   - Implement proper authentication for production

## 🐛 Troubleshooting

### Streams Not Loading

**Check 1: Valid M3U8 URL**
```bash
# Try accessing the URL directly:
curl -I https://example.com/stream.m3u8
# Should return: Content-Type: application/vnd.apple.mpegurl
```

**Check 2: Browser Console**
- Press F12 to open Developer Tools
- Look for CORS errors or network failures
- Check if the stream URL is accessible from your location

**Check 3: Stream Format**
- Ensure stream is in HLS format (.m3u8)
- Test with Mux streams: `https://test-streams.mux.dev/x36xhzz/x3zzjlecw.m3u8`

### Admin Panel Access Issues

```bash
# Wrong password?
# Default: admin
# Check ADMIN_SECRET_KEY in .env.local

# Still can't access?
# Clear browser cache and localStorage:
localStorage.clear()
```

### Performance Issues

**Slow streams:**
- Check internet connection (needs 2+ Mbps)
- Try different quality option in player
- Switch to another channel and back

**Memory usage:**
- Close unnecessary tabs/windows
- Check browser console for JavaScript errors
- Restart browser if using for extended periods

## 📊 Stream Optimization Tips

1. **Choose reliable streams:**
   - Use CDN-hosted streams when possible
   - Verify stream uptime before adding
   - Test different bitrates

2. **Add streams efficiently:**
   - Use admin panel for easy management
   - Keep channel list organized by category
   - Remove non-working streams promptly

3. **Database Setup (Recommended for Production):**
   - PostgreSQL with Vercel Postgres
   - MongoDB Atlas
   - Firebase Firestore
   - Allows multi-user, persistent data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support & Community

- 📧 GitHub Issues for bug reports
- 💬 GitHub Discussions for questions
- 🔗 Check existing issues for solutions
- ⭐ Star the repo if you find it useful!

## 🗺️ Project Roadmap

- [ ] Backend database integration (PostgreSQL/MongoDB)
- [ ] User authentication system
- [ ] Channel categories/filtering
- [ ] Watch history & bookmarks
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Stream health monitoring dashboard
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Video.js](https://videojs.com/) - Video player
- [Vercel](https://vercel.com/) - Hosting platform
- [Mux](https://mux.com/) - Test streams

---

Made with ❤️ by [BongpuffStream](https://github.com/Siam1207/bongpuffstream)

**Questions?** Open an issue on GitHub!
````

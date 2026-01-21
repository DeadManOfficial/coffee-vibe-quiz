# ☕ What's Your Coffee Vibe?

A viral personality quiz built with Next.js 14, Tailwind CSS, and Vercel Analytics.

![Coffee Vibe Quiz](https://via.placeholder.com/800x400/1a1a1a/f59e0b?text=What's+Your+Coffee+Vibe?)

## Features

- 🎯 **8-question personality quiz** with 4 unique results
- 📱 **Mobile-first responsive design** with dark mode
- 🔗 **Viral sharing** - Twitter, TikTok, copy link
- 📧 **Email capture** with Zapier webhook integration
- 📊 **Vercel Analytics** built-in
- 🖼️ **OpenGraph images** for social sharing
- ⚡ **One-click Vercel deploy**

## Personalities

| Vibe | Emoji | Description |
|------|-------|-------------|
| **Espresso Addict** | ⚡ | Intense, ambitious, probably vibrating |
| **Latte Art Master** | 🎨 | Aesthetic, cozy, main character energy |
| **Chill Cold Brew** | 🧊 | Efficient, unbothered, low-maintenance |
| **Chaos Matcha** | 🍵 | Trendy, chaotic, spiritually caffeinated |

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Deploy to Vercel

### Option 1: One-Click Deploy
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deploy
```bash
npm i -g vercel
vercel --prod
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Required variables:
- `ZAPIER_WEBHOOK_URL` - Your Zapier webhook for email capture

### Setting up Zapier

1. Create a new Zap
2. Trigger: **Webhooks by Zapier** → **Catch Hook**
3. Copy the webhook URL to your environment variables
4. Action: Connect to your email provider (Mailchimp, ConvertKit, etc.)

## Customization

### Change Quiz Content

Edit `data/quiz-data.json`:
- Modify questions and options
- Change personality results
- Update scoring weights

### Change Styling

Edit `tailwind.config.js` and `app/globals.css`:
- Custom colors in `theme.extend.colors`
- Animations in `theme.extend.animation`

### Add OG Images

Add images to `public/images/`:
- `og-default.png` (1200x630) - Default share image
- `og-espresso.png` - Espresso Addict result
- `og-latte.png` - Latte Art Master result
- `og-coldbrew.png` - Chill Cold Brew result
- `og-matcha.png` - Chaos Matcha result

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel
- **Email Integration**: Zapier Webhooks

## Project Structure

```
coffee-vibe-quiz/
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/page.tsx         # Quiz questions
│   ├── results/[vibe]/page.tsx  # Dynamic results
│   ├── api/submit/route.ts   # Email capture API
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── data/
│   └── quiz-data.json        # Quiz content
├── public/
│   └── images/               # OG images
├── deploy.sh                 # One-click deploy
└── README.md
```

## License

MIT - Do whatever you want with it! ☕

---

Built with Claude Code 🤖

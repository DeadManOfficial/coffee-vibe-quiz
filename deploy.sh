#!/bin/bash

# Coffee Vibe Quiz - One-Click Deploy to Vercel
# =============================================

echo "☕ Coffee Vibe Quiz - Deploying to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build check
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo ""
echo "🚀 Deploying to Vercel..."
echo ""

# Deploy to production
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Set up your ZAPIER_WEBHOOK_URL in Vercel Environment Variables"
echo "2. Add OG images to /public/images/"
echo "3. Share your quiz and go viral! 🔥"

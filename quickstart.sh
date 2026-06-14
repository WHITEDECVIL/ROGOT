#!/usr/bin/env bash

# Prompt Injection Shield - Quick Start Setup
# Run this script to initialize and start the project

set -e

echo ""
echo "   ╔══════════════════════════════════════════════════════════════╗"
echo "   ║                                                              ║"
echo "   ║        🛡️  PROMPT INJECTION SHIELD - QUICK START 🛡️         ║"
echo "   ║                                                              ║"
echo "   ╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if API key is set
if [ -z "$CLAUDE_API_KEY" ]; then
    echo "⚠️  CLAUDE_API_KEY not set in environment"
    echo "   Please export your Anthropic API key:"
    echo ""
    echo "   export CLAUDE_API_KEY='sk-...'"
    echo ""
    exit 1
fi

echo "✅ CLAUDE_API_KEY is set"
echo ""

# Backend setup
echo "📦 Setting up backend..."
cd "$(dirname "$0")/server"

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "   Created server/.env"
fi

# Verify .env has the key
if ! grep -q "CLAUDE_API_KEY=" .env; then
    sed -i.bak "s/CLAUDE_API_KEY=.*/CLAUDE_API_KEY=$CLAUDE_API_KEY/" .env
    rm -f .env.bak
    echo "   Updated CLAUDE_API_KEY in server/.env"
fi

if [ ! -d "node_modules" ]; then
    npm install > /dev/null 2>&1
    echo "   ✓ npm install complete"
fi

npm run build > /dev/null 2>&1
echo "   ✓ TypeScript compiled"

cd ..

# Mobile setup
echo ""
echo "📱 Setting up mobile..."
cd mobile

if [ ! -d "node_modules" ]; then
    npm install > /dev/null 2>&1
    echo "   ✓ npm install complete"
fi

cd ..

echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "✨ SETUP COMPLETE!"
echo ""
echo "🚀 To start the project:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd server && npm run dev"
echo ""
echo "   Terminal 2 (Mobile):"
echo "   $ cd mobile && npm start"
echo ""
echo "📖 Documentation:"
echo "   - README.md              → Overview and features"
echo "   - IMPLEMENTATION.md      → Architecture and deployment"
echo "   - USAGE_EXAMPLES.md      → API examples"
echo "   - PROJECT_SUMMARY.md     → Complete file structure"
echo ""
echo "🧪 Test the API:"
echo "   $ ./test-api.sh"
echo ""
echo "✅ Verify project structure:"
echo "   $ ./verify.sh"
echo ""
echo "🐳 Docker deployment:"
echo "   $ docker-compose up"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""

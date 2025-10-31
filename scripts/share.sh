#!/bin/bash
# =============================================
# KYC Platform - SHARE Script
# =============================================

set -e

echo "🌐 Setting up online sharing..."

# Check if ngrok is installed
if ! command -v ngrok > /dev/null; then
    echo "❌ ngrok is not installed."
    echo "📥 Installing ngrok..."
    
    # Detect platform and install ngrok
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
        echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
        sudo apt update && sudo apt install ngrok
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install ngrok/ngrok/ngrok
    else
        echo "❌ Unsupported OS. Please install ngrok manually from:"
        echo "   https://ngrok.com/download"
        exit 1
    fi
fi

# Check if ngrok is authenticated
if ! ngrok config check > /dev/null 2>&1; then
    echo "🔐 Ngrok requires authentication."
    echo "💡 Please sign up at https://ngrok.com and get your authtoken."
    echo "   Then run: ngrok config add-authtoken YOUR_TOKEN"
    echo ""
    echo "🔄 Starting without authentication (limited sessions)..."
fi

# Start the platform if not running
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "🚀 Platform not running. Starting it first..."
    ./scripts/start.sh &
    sleep 10
fi

echo "🔗 Starting ngrok tunnel..."
ngrok http 5173 > /dev/null &
NGROK_PID=$!
echo $NGROK_PID > /tmp/ngrok.pid

# Wait for ngrok to start
sleep 5

# Get public URL
echo "⏳ Getting public URL..."
sleep 3

NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[^"]*' | head -1)

if [ -n "$NGROK_URL" ]; then
    echo ""
    echo "🎉 Platform is now accessible online!"
    echo "====================================="
    echo ""
    echo "🌐 Public URL: $NGROK_URL"
    echo ""
    echo "👥 Share this link:"
    echo "   $NGROK_URL"
    echo ""
    echo "🔐 Admin access:"
    echo "   $NGROK_URL/admin/baybank/login"
    echo ""
    echo "📋 Demo instructions:"
    echo "   1. Open the URL above"
    echo "   2. Click 'Enter as User'"
    echo "   3. Use NNI: 2001123456"
    echo "   4. Complete KYC form"
    echo "   5. Check status in admin panel"
    echo ""
    echo "🛑 To stop sharing: ./scripts/stop.sh"
    echo "📊 Tunnel status: http://localhost:4040"
else
    echo "❌ Failed to get public URL"
    echo "💡 Check ngrok status: http://localhost:4040"
    kill $NGROK_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo "⏳ Ngrok is running in background. Press Ctrl+C to stop."
wait

#!/bin/bash
# This is a reference script - Windows users should use RUN_ALL.bat or RUN_ALL.ps1

echo "🚀 Startup Benefits Platform - Starting..."
echo ""

# Kill existing node processes (Unix/macOS)
killall node 2>/dev/null || true

# Start Backend
echo "[1/3] Starting Backend Server..."
cd startup-benefits-backend
npm run dev &
BACKEND_PID=$!
sleep 3

# Start Frontend
echo "[2/3] Starting Frontend Server..."
cd ../startup-benefits-frontend
npm run dev &
FRONTEND_PID=$!
sleep 3

# Open Browser
echo "[3/3] Opening application..."
open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null || echo "Please open http://localhost:3000 in your browser"

echo ""
echo "✅ Application Started!"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"
wait

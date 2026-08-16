#!/bin/bash

# ShowRoom App - Start Both Backend & Frontend Servers
# Usage: ./start-servers.sh

echo "🚀 Starting ShowRoom App servers..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Start Frontend
echo -e "${BLUE}Starting Frontend (Vite)...${NC}"
cd "$PROJECT_ROOT/apps/web"
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
echo "   Running on: http://localhost:3001"
echo ""

# Start Backend
echo -e "${BLUE}Starting Backend (NestJS)...${NC}"
cd "$PROJECT_ROOT/apps/backend"
node dist/main.js > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
echo "   Running on: http://localhost:3000"
echo ""

# Wait a moment for servers to start
sleep 3

# Verify both are running
echo -e "${BLUE}Verifying servers...${NC}"
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend responding${NC}"
else
    echo -e "${YELLOW}⚠️  Backend not responding yet (may take a moment)${NC}"
fi

if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend responding${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend not responding yet${NC}"
fi

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Both servers are running!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Frontend: http://localhost:3001"
echo "Backend:  http://localhost:3000"
echo ""
echo -e "${YELLOW}To stop servers, run:${NC}"
echo "  kill $FRONTEND_PID  # Stop frontend"
echo "  kill $BACKEND_PID   # Stop backend"
echo ""
echo "Or save these PIDs for later:"
echo "  Frontend PID: $FRONTEND_PID"
echo "  Backend PID:  $BACKEND_PID"
echo ""
echo "Press Ctrl+C to stop watching logs (servers keep running)"
echo ""

# Keep script running and show logs
tail -f /tmp/frontend.log /tmp/backend.log

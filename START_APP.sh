#!/bin/bash
echo "🚀 Starting Form Automation..."

# Start backend
cd backend
source venv/bin/activate
python server.py >> ../backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
cd ..

# Wait for backend to start
sleep 3

# Start frontend
cd frontend
npm start >> ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
cd ..

echo ""
echo "✅ App running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "To stop: ./STOP_APP.sh"

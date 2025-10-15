#!/bin/bash
echo " Stopping app..."
pkill -f "python server.py"
pkill -f "npm start"
echo "✅ Stopped!"

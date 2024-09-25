#!/bin/bash
# Stop any running Node.js application
echo "Stopping any existing Node.js/React application..."
pm2 stop all || true

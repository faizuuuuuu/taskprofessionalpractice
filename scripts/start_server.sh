#!/bin/bash
# Start the Node.js server or React build
cd /var/www/html

echo "Starting the Node.js/React application..."
npm start > app.log 2>&1 &

# Wait for a few seconds to ensure the app has started
sleep 10

# Check if the application is running
if pgrep -f "node" > /dev/null
then
    echo "Application started successfully."
else
    echo "Application failed to start."
    exit 1
fi

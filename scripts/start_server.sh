#!/bin/bash
# Start the React application
cd /var/www/html
echo "Starting the React application on port 3002..."
PORT=3002 npm start > app.log 2>&1 &

# Wait for a few seconds to ensure the app has started
sleep 10

# Check if the application is running
if pgrep -f "react-scripts" > /dev/null
then
    echo "Application started successfully."
else
    echo "Application failed to start."
    exit 1
fi

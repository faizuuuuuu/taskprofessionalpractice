#!/bin/bash
# Start the React application in the correct directory
cd /var/www/html

# Set the port to 3002
export PORT=3002

echo "Starting the React application on port 3002..."
npm start > app.log 2>&1 &

# Wait for a few seconds to ensure the app has started
sleep 20

# Check if the application is running
if pgrep -f "react-scripts start" > /dev/null
then
    echo "Application started successfully."
else
    echo "Application failed to start."
    exit 1
fi

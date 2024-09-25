#!/bin/bash
# Navigate to application directory
cd /var/www/html

# Stop existing Docker containers
docker stop react-app || true
docker rm react-app || true

# Start the Docker container
echo "Starting Docker container on port 3002..."
docker run -d -p 3002:3000 react-app

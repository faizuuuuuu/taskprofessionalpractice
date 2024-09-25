#!/bin/bash
# Validate that the application is running
echo "Validating application status..."

# Wait for the application to start
sleep 100

# Check if the application is running on port 3002
curl -I http://localhost:3002

if [ $? -ne 0 ]; then
    echo "Validation failed. Application is not running."
    exit 1
else
    echo "Validation succeeded. Application is running."
    exit 0
fi

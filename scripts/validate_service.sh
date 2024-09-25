#!/bin/bash
# Validate that the application is running on port 3002
echo "Validating application status..."

# Wait to ensure the application has had time to start
sleep 30

# Check if the application is accessible
curl -I http://localhost:3002

if [ $? -ne 0 ]; then
    echo "Validation failed. Application is not running."
    exit 1
else
    echo "Validation succeeded. Application is running."
    exit 0
fi

#!/bin/bash
echo "Validating application status..."
curl -I http://localhost:3002
if [ $? -ne 0 ]; then
    echo "Validation failed. Application is not running."
    exit 1
fi
echo "Validation succeeded. Application is running."

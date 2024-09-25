#!/bin/bash
# Change to the deployment directory
cd /var/www/html

# Check if package.json exists before running npm install
if [ -f "package.json" ]; then
    echo "Found package.json, installing dependencies..."
    npm install
else
    echo "Error: package.json not found in /var/www/html"
    exit 1
fi

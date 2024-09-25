#!/bin/bash
# Install npm dependencies
cd /var/www/html

echo "Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "npm install failed."
    exit 1
fi
echo "Dependencies installed successfully."

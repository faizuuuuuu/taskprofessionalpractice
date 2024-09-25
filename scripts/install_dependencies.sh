#!/bin/bash
# Navigate to the application directory
cd /var/www/html

# Clean up any existing node_modules directory to avoid conflicts
rm -rf node_modules

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "npm install failed."
    exit 1
fi

echo "Dependencies installed successfully."

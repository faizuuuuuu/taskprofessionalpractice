#!/bin/bash
# Install Node.js and npm if not already installed
if ! command -v npm &> /dev/null
then
    echo "npm not found. Installing Node.js and npm..."
    curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
    sudo yum install -y nodejs
fi

# Change to the deployment directory
cd /var/www/html

# Install dependencies
npm install

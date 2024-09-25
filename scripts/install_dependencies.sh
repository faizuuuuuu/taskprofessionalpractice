#!/bin/bash
# Install Node.js and npm dependencies
echo "Installing Node.js and npm dependencies..."
cd /var/www/html
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
npm install

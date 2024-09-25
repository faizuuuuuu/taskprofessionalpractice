#!/bin/bash
# Start the Node.js server or React build
cd /var/www/html
npm start > app.log 2>&1 &

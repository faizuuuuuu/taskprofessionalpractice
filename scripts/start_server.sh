#!/bin/bash
# Navigate to the application directory
cd /var/www/html

# Start the React application
npm start > app.log 2>&1 &

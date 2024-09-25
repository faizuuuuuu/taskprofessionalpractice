# Start the Docker container
docker run -d -p 3002:3002 react-app

# Check if the container is running
if docker ps | grep react-app > /dev/null
then
    echo "Docker container started successfully."
else
    echo "Failed to start Docker container."
    exit 1
fi

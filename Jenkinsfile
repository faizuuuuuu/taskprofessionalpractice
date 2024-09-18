pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t react-app .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // (Optional) Run tests inside the Docker container if you have any tests in your React app
                    // You can remove this if you don't have any tests yet
                    sh 'docker run react-app npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop any currently running container
                    sh 'docker stop $(docker ps -q --filter ancestor=react-app) || true'

                    // Remove the stopped container
                    sh 'docker rm $(docker ps -a -q --filter ancestor=react-app) || true'

                    // Run the newly built Docker container on the desired port (e.g., 3000)
                    sh 'docker run -d -p 3002:80 react-app'
                }
            }
        }
    }
}

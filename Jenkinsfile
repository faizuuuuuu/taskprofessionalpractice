pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image for the React app
                    sh 'docker build -t react-app .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Start the React app in Docker container
                    sh 'docker run --rm -d -p 3002:80 react-app'
                    
                    // Install dependencies and run the Selenium test
                    sh '''
                    npm install
                    npm install selenium-webdriver
                    node tests/testApp.js
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop any currently running container
                    sh 'docker stop $(docker ps -q --filter ancestor=react-app) || true'
                    
                    // Deploy the newly built Docker container
                    sh 'docker run -d -p 3002:80 react-app'
                }
            }
        }
    }
}

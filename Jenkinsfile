pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t react-app .'

                    // Create the production build for React
                    sh 'npm run build'

                    // Zip the build folder
                    sh 'cd /Users/faiz/task6.2hd && zip -r artifact.zip build'

                    // Upload the zip file to S3 bucket
                    sh 'aws s3 cp /Users/faiz/task6.2hd/artifact.zip s3://my-app-deployment-bucket/deployments/artifact.zip'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run the Docker container and test
                    sh 'docker run --rm -d -p 3002:80 react-app'
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
                    // Stop and remove the old Docker container
                    sh 'docker stop $(docker ps -q --filter ancestor=react-app) || true'
                    sh 'docker rm $(docker ps -a -q --filter ancestor=react-app) || true'
                    
                    // Run the new Docker container
                    sh 'docker run -d -p 3002:80 react-app'
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') { // 'SonarQube' is the name of your SonarQube server in Jenkins
                        // Use credentialsId to get the token from Jenkins credentials store
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            def scannerHome = tool 'SonarQubeScanner' // Ensure 'SonarQubeScanner' matches your global tool name
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=my-react-app -Dsonar.sources=./src -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$SONAR_TOKEN"
                        }
                    }
                }
            }
        }

        // Release Stage using AWS CodeDeploy
        stage('Release') {
            steps {
                script {
                    // Deploy the artifact.zip to the EC2 instance using CodeDeploy
                    awsCodeDeploy applicationName: 'my-app',
                                  deploymentGroupName: 'my-deployment-group',
                                  revisionLocationType: 'S3',
                                  s3Bucket: 'my-app-deployment-bucket',
                                  s3Key: 'deployments/artifact.zip',
                                  waitForCompletion: true
                }
            }
        }
    }
}

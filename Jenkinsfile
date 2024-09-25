pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies using npm
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t react-app .'

                    // Create the production build for React
                    sh 'npm run build'

                    // Verify current directory
                    sh 'pwd'

                    // List files in the current directory for verification
                    sh 'ls'

                    // Zip the build folder
                sh 'zip -r artifact.zip build scripts appspec.yml *'



                    // Upload the zip file to S3 bucket
                    sh 'aws s3 cp artifact.zip s3://my-app-deployment-bucket/deployments/artifact.zip'
                }
            }
        }
/*
        stage('Test') {
            steps {
                script {
                    // Run the app in a Docker container
                    sh 'docker run --rm -d -p 3002:80 react-app'

                    // Install testing dependencies
                    sh 'npm install selenium-webdriver'

                    // Run the Selenium tests
                    sh 'node tests/testApp.js'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop any running containers for the app
                    sh 'docker stop $(docker ps -q --filter ancestor=react-app) || true'

                    // Remove stopped containers
                    sh 'docker rm $(docker ps -a -q --filter ancestor=react-app) || true'

                    // Start the app in a Docker container
                    sh 'docker run -d -p 3002:80 react-app'
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            def scannerHome = tool 'SonarQubeScanner'
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=my-react-app -Dsonar.sources=./src -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$SONAR_TOKEN"
                        }
                    }
                }
            }
        }
*/
        stage('Release') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-codedeploy']]) {
                        sh '''
                        aws deploy create-deployment \
                        --application-name my-app \
                        --deployment-group-name my-deployment-group \
                        --s3-location bucket=my-app-deployment-bucket,key=deployments/artifact.zip,bundleType=zip
                        '''
                    }
                }
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                script {
                    datadog {
                        // Send a simple build status to Datadog
                        echo "Sending build status to Datadog..."
                    }
                }
            }
        }
    }
}

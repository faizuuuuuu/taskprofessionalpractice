pipeline {
    agent any

    stages {
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
                    sh 'zip -r artifact.zip build'

                    // Upload the zip file to S3 bucket
                    sh 'aws s3 cp artifact.zip s3://my-app-deployment-bucket/deployments/artifact.zip'
                }
            }
        }

        stage('Test') {
            steps {
                script {
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
                    sh 'docker stop $(docker ps -q --filter ancestor=react-app) || true'
                    sh 'docker rm $(docker ps -a -q --filter ancestor=react-app) || true'
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

        // Release Stage using AWS CodeDeploy
        stage('Release') {
            steps {
                script {
                    // Use the AWS credentials stored in Jenkins
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-codedeploy']]) {
                        // Deploy the artifact.zip to the EC2 instance using CodeDeploy
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
    }
}

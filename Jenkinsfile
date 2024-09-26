pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    // Clean the workspace to ensure no old files cause conflicts
                    sh 'rm -rf node_modules package-lock.json'
                    sh 'npm cache clean --force'
                }
            }
        }

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
                    // Set memory limit to avoid memory issues during build
                    sh 'export NODE_OPTIONS=--max_old_space_size=4096'
                    
                    // Create the production build for React
                    sh 'npm run build'

                    // Verify current directory
                    sh 'pwd'

                    // List files in the current directory for verification
                    sh 'ls'

                    // Zip the build folder along with the necessary files for deployment
                    sh 'zip -r artifact.zip build scripts appspec.yml -x "node_modules/*"'

                    // Upload the zip file to the S3 bucket
                    sh 'aws s3 cp artifact.zip s3://my-app-deployment-bucket/deployments/artifact.zip'
                }
            }
        }

        // Keep the rest of the Jenkinsfile stages unchanged
        stage('Test') {
            steps {
                script {
                    sh 'docker run --rm -d -p 3002:80 react-app'
                    sh 'npm install selenium-webdriver'
                    sh 'node tests/testApp.js'
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
                        echo "Sending build status to Datadog..."
                    }
                }
            }
        }
    }
}

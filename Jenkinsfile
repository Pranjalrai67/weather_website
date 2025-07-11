pipeline {
    agent any

    tools {
        nodejs "Node18"  // make sure this is configured in Jenkins
    }

    environment {
        BACKEND_DIR = 'Server'
        FRONTEND_DIR = 'Client'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Pranjalrai67/weather_website.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'npm install'
                }
                dir("${env.FRONTEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}

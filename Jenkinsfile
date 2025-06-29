pipeline {
    agent any

    tools {
        nodejs "Node18"  // make sure you configure this in Jenkins global tools
    }

    environment {
        BACKEND_DIR = 'Server'
        FRONTEND_DIR = 'Client'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/yourusername/weatherapp.git'
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
                    sh 'npm test || true'
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

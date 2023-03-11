pipeline {
    agent {
        docker { 
            image 'node:16-alpine'
        }
    }
    stages {
        stage('Clean') {
            steps {
                sh 'rm -rf node_modules'
                sh 'rm package-lock.json'
            }
        }
        stage('Build') {
            steps {
                sh 'ls -la'
                sh 'npm install'
            }
        }
    }
}
pipeline {
    agent {
        docker { 
            image 'node:16-alpine'
        }
    }
    stages {
        stage('Clean') {
            sh 'rm -rf node_modules'
            sh 'rm package-lock.json'
        }
        stage('Build') {
            steps {
                sh 'ls -la'
            }
        }
    }
}
pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:16-alpine'
                }
            }
            steps {
                sh 'ls -la'
                sh 'npm install'
            }
        }
    }
}
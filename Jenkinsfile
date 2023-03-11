pipeline {
    agent {
        docker { image: 'node:16-alpine' }
    }
    stages {
        stage('Pre-clean') {
            steps {
                sh 'rm -rf ./node_modules'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy') {
            steps {
                sh 'node ./src/index.js'
            }
        }
    }
}
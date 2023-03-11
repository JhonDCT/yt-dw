pipeline {
    agent {
           dockerfile true
    }
    stages {
        stage('Build') {
            steps {
                sh 'ls -la'
            }
        }
        stage('Build') {
            steps {
                app = docker.build()
            }
        }
        stage('Test') {
            steps {
                app.inside {
                sh 'ls -la'
                }
            }
        }
    }
}
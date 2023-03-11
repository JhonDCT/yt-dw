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
            scripts {
                app = docker.build()
            }
        }
        stage('Test') {
            scripts {
                app.inside {
                sh 'ls -la'
                }
            }
        }
    }
}
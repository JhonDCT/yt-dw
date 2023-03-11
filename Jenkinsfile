pipeline {
    def app
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
            app = docker.build()
        }
        stage('Test') {
            app.inside {
                sh 'ls -la'
            }
        }
    }
}
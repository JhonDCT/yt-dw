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
            def app = docker.build()
            app.inside {
                sh 'ls -la'
            }
        }
    }
}
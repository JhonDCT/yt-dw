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
            script {
                def app = docker.build()
                app.inside {
                    sh 'ls -la'
                }
            }
        }
    }
}
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
                def app = docker.build()                
            }
            script {
                app.inside {
                    sh 'ls -la'
                }
            }
        }
    }
}
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    sh ''
                    sh 'ls -la'
                    sh 'docker build -t yt-download .'
                }
            }
        }
    }    
}
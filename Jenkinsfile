pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t yt-download .'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker run -p 3000:3000 -d yt-downloader'
                }
            }
        }
    }    
}
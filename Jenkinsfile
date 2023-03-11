pipeline {
    agent { dockerfile true }
    stages {
        stage('Deploy') {
            steps {
                sh 'node --version'
                sh 'docker build . -t yt-downloader'
            }
        }
    }
}
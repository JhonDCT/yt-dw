pipeline {
    agent {
           dockerfile true
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build . -t yt-downloader'
                sh 'docker run -p 3000:3000 -d yt-downloader'
            }
        }
    }
}
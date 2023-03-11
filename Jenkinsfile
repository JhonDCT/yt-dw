pipeline {
    agent { dockerfile true}
    stages {
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t yt-download .'
                }
            }
        }
    }    
}
pipeline {
    agent { dockerfile true }
    stages {
        stage('Deploy') {
            steps {
                sh './sh.deploy.sh'
            }
        }
    }
}
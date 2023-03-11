pipeline {
    agent { dockerfile true}
    stages {
        stage('Build') {
            steps {
               script {
                dockerImage = docker.build + ":$BUILD_NUMBER"
               }
            }
        }
    }    
}
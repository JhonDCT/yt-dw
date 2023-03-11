pipeline {
    agent { dockerfile true }
    stages {        
        stage('Deploy') {
            steps {
                sh 'node ./src/index.js'
            }
        }
    }
}
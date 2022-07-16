pipeline {
    agent {
        docker {
            image 'node:16-alpine' 
            args '-p 3000:3000 -v $HOME:/home/jenkins' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}
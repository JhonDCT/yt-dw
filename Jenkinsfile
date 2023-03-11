node {
    checkout scm 

    def customImage = docker.build("yt-downloader")

    customImage.inside {
        sh 'pwd'
        sh 'ls -la'
    }
}
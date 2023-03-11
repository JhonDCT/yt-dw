node {
    checkout scm 

    def customImage = docker.build("yt-downloader")

    customImage.inside {
        sh 'ls -la'
    }
}
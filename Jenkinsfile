node {
    checkout scm

    docker.image('mysql:5').withRun(-e "MYSQL_ROOT_PASSWORD=Xanandra123" -p 3306:3306) { c -> 
        sh 'while | mysqladmin ping -h0.0.0.0 --silent; do sleep 1; done'
        sh 'make check'
    }
}
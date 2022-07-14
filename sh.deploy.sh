#!/bin/bash
branch_name="main"

while getopts b: flag; do
    case "${flag}" in
        b) branch_name=${OPTARG};;
    esac
done

echo $branch_name

git switch $branch_name
git pull $branch_name

sudo docker stop $(sudo docker ps | grep yt-downloader | awk '{print $1}' | head -1)
sudo docker rm $(sudo docker ps -a | grep yt-downloader | awk '{print $1}' | head -1)
sudo docker rmi yt-downloader

sudo docker build . -t yt-downloader
sudo docker run -p 3000:3000 -d yt-downloader

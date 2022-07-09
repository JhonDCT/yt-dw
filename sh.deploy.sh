#!/bin/bash

sudo docker rm $(sudo docker ps -a | grep yt-downloader | awk '{print $1}' | head -1)
sudo docker rmi yt-downloader

sudo docker build . -t yt-downloader
sudo docker run -p 8080:3000 -d yt-downloader

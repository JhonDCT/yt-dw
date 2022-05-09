# Deploy
docker build . -t yt-downloader

docker run -p 53205:3000 -d yt-downloader
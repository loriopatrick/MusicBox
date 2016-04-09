mkdir /tmp
echo 'Running server'
HOST=:8080 SONGS_PATH=./tmp/songs PLAYLIST_PATH=./tmp/play go run main.go app.go

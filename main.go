package main

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"mime"
	"net/http"
	"os"
	"path"
)

var app App = App{}

func RpcHandler(w http.ResponseWriter, req *http.Request) {
	params := req.URL.Query()
	method := params.Get("method")

	switch method {
	case "track.get":
		songPath, err := app.GetSongPath(params.Get("track"))
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		http.ServeFile(w, req, songPath)
	case "playlist.add":
		var files []string
		body, err := ioutil.ReadAll(req.Body)
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		err = json.Unmarshal(body, &files)
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		err = app.AddPlaylist(params.Get("playlist"), files)
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		io.WriteString(w, "OK")
	case "tracks.list":
		playlist := "all"
		playlists, have := params["playlist"]
		if have {
			playlist = playlists[0]
		}
		songs, err := app.GetSongsPlaylist(playlist)
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		data, err := json.Marshal(songs)
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		w.Write(data)
	case "playlists.list":
		playlists, err := app.GetPlaylists()
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		data, err := json.Marshal(playlists)
		if err != nil {
			io.WriteString(w, "ERROR")
			return
		}
		w.Write(data)
	}
}

func ServeFile(file string, w http.ResponseWriter) error {
	fd, err := os.Open(file)
	w.Header().Set("Content-Type", mime.TypeByExtension(path.Ext(file)))
	if err != nil {
		return err
	}
	io.Copy(w, fd)
	return nil
}

func AllFiles() ([]string, error) {
	files := make([]string, 0)
	return files, nil
}

func main() {
	var err error
	app, err = NewApp(os.Getenv("HOST"), os.Getenv("SONGS_PATH"), os.Getenv("PLAYLIST_PATH"))
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/rpc", RpcHandler)
	http.Handle("/", http.FileServer(http.Dir("public")))
	log.Fatal(http.ListenAndServe(app.Host, nil))
}

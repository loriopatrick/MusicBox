package main

import (
	"errors"
	"os"
	"path"
	"path/filepath"
	"sort"
	"strings"
)

type App struct {
	Host         string
	SongsPath    string
	PlaylistPath string
}

func NewApp(host string, songsPath string, playlistPath string) (App, error) {
	songs, err := filepath.Abs(songsPath)
	if err != nil {
		return App{}, err
	}
	playlist, err := filepath.Abs(playlistPath)
	if err != nil {
		return App{}, err
	}

	return App{
		Host:         host,
		SongsPath:    path.Clean(songs),
		PlaylistPath: path.Clean(playlist),
	}, nil
}

func getDeeperPath(root string, append string) (string, error) {
	deeper, err := filepath.Abs(path.Join(root, append))
	if err != nil {
		return "", err
	}
	root, err = filepath.Abs(root)
	if err != nil {
		return "", err
	}
	deeper = path.Clean(deeper)
	if !strings.HasPrefix(deeper, path.Clean(root)+"/") {
		return "", errors.New("Not deeper")
	}
	return deeper, nil
}

func (self *App) GetSongPath(track string) (string, error) {
	return getDeeperPath(self.SongsPath, track)
}

func (self *App) GetPlaylistPath(playlist string) (string, error) {
	if playlist == "all" {
		return self.SongsPath, nil
	}
	return getDeeperPath(self.PlaylistPath, playlist)
}

func (self *App) AddPlaylist(playlist string, files []string) error {
	playFolder, err := self.GetPlaylistPath(playlist)
	if err != nil {
		return err
	}
	os.MkdirAll(playFolder, 0777)
	for i := range files {
		filePath, err := self.GetSongPath(files[i])
		if err != nil {
			return err
		}
		destPath, err := getDeeperPath(playFolder, files[i])
		if err != nil {
			return err
		}
		os.Symlink(filePath, destPath)
	}
	return nil
}

func (self *App) GetSongsPlaylist(playlist string) ([]string, error) {
	songs := make([]string, 0)

	root, err := self.GetPlaylistPath(playlist)
	if err != nil {
		return songs, err
	}

	walk := func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			if info.Size() > 0 {
				songs = append(songs, info.Name())
			}
			return nil
		}
		if path == root {
			return nil
		}
		return filepath.SkipDir
	}

	filepath.Walk(root, walk)
	return songs, nil
}

func (self *App) GetPlaylists() ([]string, error) {
	playlists := make(map[string]int, 0)

	walk := func(loc string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			playlist, err := filepath.Rel(self.PlaylistPath, path.Dir(loc))
			if err != nil {
				return err
			}
			if playlist != "." {
				playlists[playlist] = 1
			}
		}
		return nil
	}

	err := filepath.Walk(self.PlaylistPath, walk)
	if err != nil {
		return nil, nil
	}

	res := make([]string, 0, len(playlists))
	for k := range playlists {
		res = append(res, k)
	}

	sort.Strings(res)
	return res, nil
}

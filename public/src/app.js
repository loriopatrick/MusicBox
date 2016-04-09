var React = require('react');
var r = require('r-dom');
var request = require('superagent');

var Player = require('./player');
var Tracks = require('./tracks');
var Sidebar = require('./sidebar');

var App = React.createClass({
    getInitialState: function() {
        return {
            playlist: 'all',
            playlists: [],
            tracks: [],
            hashes: [],
            playing: null,
            paused: true
        };
    },
    componentDidMount: function() {
        this.refresh();
    },
    refresh: function() {
        var self = this;
        request.get('/rpc?method=playlists.list').end(function(err, res) {
            var data = JSON.parse(res.text);
            self.setState({ playlists: data });
        });
        request.get('/rpc?method=tracks.list&playlist=' + this.state.playlist).end(function(err, res) {
            var data = JSON.parse(res.text);
            self.setState({ tracks: data });
        });
    },
    setPlayingTrack: function(track) {
        this.setState({ playing: track, paused: false });
    },
    addHash: function(track) {
        this.state.hashes.push(track);
        this.setState({ hashes: this.state.hashes });
    },
    rmHash: function(track) {
        this.state.hashes.splice(this.state.hashes.indexOf(track), 1);
        this.setState({ hashes: this.state.hashes });
    },
    setPlaylist: function(name) {
        var self = this;
        request.get('/rpc?method=tracks.list&playlist=' + name).end(function(err, res) {
            var data = JSON.parse(res.text);
            self.setState({ playlist: name, tracks: data });
        });
        this.setState({ playlist: name });
    },
    clearHashes: function() {
        this.setState({ hashes: [] });
    },
    addToPlaylistPrompt: function() {
        this.addToPlaylist(prompt('playlist name'));
    },
    addToCurrentPlaylist: function() {
        this.addToPlaylist(this.state.playlist);
    },
    togglePlay: function() {
        if (!this.state.playing && this.state.paused) {
            var tracks = this.state.tracks;
            if (tracks.length > 0) {
                this.setState({
                    playing: tracks[Math.floor(Math.random() * tracks.length)],
                    paused: false
                });
            }
        } else {
            this.setState({ paused: !this.state.paused });
        }
    },
    prevTrack: function() {
        this.upTrack(-1);
    },
    nextTrack: function() {
        this.upTrack(1);
    },
    upTrack: function(delta) {
        var tracks = this.state.tracks;
        if (tracks.length > 0) {
            var idx = (tracks.indexOf(this.state.playing) + delta + tracks.length * 2) % tracks.length;
            this.setState({
                playing: tracks[idx],
                paused: false
            });
        }
    },
    addToPlaylist: function(name) {
        if (!name) {
            return;
        }

        var self = this;
        request
        .post('/rpc?method=playlist.add&playlist=' + name)
        .send(this.state.hashes)
        .end(function(err, res) {
            self.refresh();
        });

        if (this.state.playlists.indexOf(name) === -1) {
            this.state.playlists.push(name);
        }
        this.setState({ tracks: this.state.tracks, hashes: [], playlists: this.state.playlists, playlist: name });
    },
    render: function() {
        return r.div({className: 'frame'}, [
            r(Sidebar, {
                playlist: this.state.playlist,
                hashes: this.state.hashes,
                playlists: this.state.playlists,
                onSetPlaylist: this.setPlaylist,
                onClearHashes: this.clearHashes,
                onCreatePlaylist: this.addToPlaylistPrompt,
                onAddPlaylist: this.addToCurrentPlaylist
            }),
            r.div({className: 'window'}, [
                r(Tracks, {
                    tracks: this.state.tracks,
                    queue: this.state.queue,
                    hashes: this.state.hashes,
                    playing: this.state.playing,
                    onAddHash: this.addHash,
                    onRmHash: this.rmHash,
                    onSetPlaylist: this.setPlaylist,
                    onPlay: this.setPlayingTrack
                })
            ]),
            r(Player, {
                track: this.state.playing,
                hashes: this.state.hashes,
                playing: !this.state.paused,
                addHash: this.addHash,
                rmHash: this.rmHash,
                onTogglePlay: this.togglePlay,
                onPrev: this.prevTrack,
                onNext: this.nextTrack
            })
        ]);
    }
});

module.exports = App;

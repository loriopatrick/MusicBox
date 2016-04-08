var React = require('react');
var r = require('r-dom');

var Player = require('./player');
var Tracks = require('./tracks');
var Sidebar = require('./sidebar');

var tracks = [
    {id: 1, title: 'Some Track', tags: ['test', 'foo']},
    {id: 2, title: 'Test', tags: ['bar', 'foo']}
];

var App = React.createClass({
    getInitialState: function() {
        return {
            playlist: 'all',
            playlists: ['test', 'foo', 'bar'],
            tracks: tracks,
            hashes: [],
            playing: tracks[0],
            paused: false
        };
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
    addToPlaylist: function(name) {
        if (!name) {
            return;
        }

        // TODO: api call
        this.state.hashes.forEach(function(track) {
            if (track.tags.indexOf(name) === -1) {
                track.tags.push(name);
            }
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
                    onSetPlaylist: this.setPlaylist
                })
            ]),
            r(Player, {
                track: this.state.playing,
                hashes: this.state.hashes,
                playing: !this.state.paused,
                addHash: this.addHash,
                rmHash: this.rmHash
            })
        ]);
    }
});

module.exports = App;

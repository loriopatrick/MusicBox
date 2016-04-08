var React = require('react');
var r = require('r-dom');

var Player = require('./player');
var Tracks = require('./tracks');
var Sidebar = require('./sidebar');

var tracks = [
    {id: 1, title: 'Some Track', tags: ['a', 'b', 'c']},
    {id: 2, title: 'Test', tags: ['a', 'b', 'c']}
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
    render: function() {
        return r.div({className: 'frame'}, [
            r(Sidebar, {
                playlist: this.state.playlist,
                hashes: this.state.hashes,
                setPlaylist: this.setPlaylist,
                playlists: this.state.playlists
            }),
            r.div({className: 'window'}, [
                r(Tracks, {
                    tracks: this.state.tracks,
                    queue: this.state.queue,
                    hashes: this.state.hashes,
                    playing: this.state.playing,
                    addHash: this.addHash,
                    rmHash: this.rmHash
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

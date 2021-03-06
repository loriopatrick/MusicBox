var React = require('react');
var r = require('r-dom');

var Track = require('./track');

var Tracks = React.createClass({
    onHash: function(track, add) {
        if (add) {
            this.props.onAddHash(track);
        } else {
            this.props.onRmHash(track);
        }
    },
    render: function() {
        var tracks = [];
        var self = this;

        return r.div(this.props.tracks.map(function(track) {
            return r(Track, {
                key: track,
                inHash: self.props.hashes.indexOf(track) > -1,
                playing: self.props.playing === track,
                track: track,
                onHash: self.onHash,
                onSetPlaylist: self.props.onSetPlaylist,
                onPlay: self.props.onPlay
            });
        }));
    }
});

module.exports = Tracks;

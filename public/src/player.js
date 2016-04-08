var React = require('react');
var r = require('r-dom');
var static = require('./static');

var PLAY_CHAR = '►';
var PAUSE_CHAR = '❚❚';
var LEFT_CHAR = '❰';
var HASH_CHAR = '#';
var RIGHT_CHAR = '❱';

var Player = React.createClass({
    getInitialState: function() {
        return {
            playing: false,
            track_title: 'Test',
            tags: []
        };
    },
    pause_play: function() {
        this.setState({playing: !this.state.playing})
    },
    play_next: function() {
    },
    play_prev: function() {
    },
    render: function() {
        var pp_btn_char = this.state.playing ? PAUSE_CHAR : PLAY_CHAR;
        return r.div({className: 'player'}, [
            r.a({className: 'btn', onClick: this.pause_prev}, HASH_CHAR),
            r.a({className: 'btn', onClick: this.pause_prev}, LEFT_CHAR),
            r.a({className: 'btn', onClick: this.pause_play}, pp_btn_char),
            r.a({className: 'btn', onClick: this.pause_next}, RIGHT_CHAR)
            //r.span({className: 'title'}, this.state.track_title)
        ]);
    }
});

module.exports = Player;

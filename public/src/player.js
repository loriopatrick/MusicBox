var React = require('react');
var r = require('r-dom');
var static = require('./static');

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
        var pp_btn_char = this.state.playing ? static.PAUSE_CHAR : static.PLAY_CHAR;
        return r.div({className: 'player'}, r.div({className: 'middle'}, [
            r.a({className: 'btn', href: '#', onClick: this.pause_prev}, static.LEFT_CHAR),
            r.a({className: 'btn', href: '#', onClick: this.pause_play}, pp_btn_char),
            r.a({className: 'btn', href: '#', onClick: this.pause_next}, static.RIGHT_CHAR),
            r.span({className: 'title'}, this.state.track_title)
        ]));
    }
});

module.exports = Player;

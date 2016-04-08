var React = require('react');
var r = require('r-dom');
var static = require('./static');

var PLAY_CHAR = '►';
var PAUSE_CHAR = '❚❚';
var LEFT_CHAR = '❰';
var HASH_CHAR = '#';
var RIGHT_CHAR = '❱';

var Player = React.createClass({
    onHash: function() {
        var track = this.props.track;
        if (this.props.hashes.indexOf(track) > -1) {
            this.props.rmHash(track);
        } else {
            this.props.addHash(track);
        }
    },
    onPP: function() {
        if (this.props.playing) {
            this.props.onPlay();
        } else {
            this.props.onPause();
        }
    },
    render: function() {
        var pp_btn_char = this.props.playing ? PAUSE_CHAR : PLAY_CHAR;
        var in_hash = this.props.hashes.indexOf(this.props.track) > -1;
        return r.div({className: 'player'}, [
            r.a({className: 'btn' + (in_hash? ' active' : ''), onClick: this.onHash}, HASH_CHAR),
            r.a({className: 'btn', onClick: this.props.onPrev}, LEFT_CHAR),
            r.a({className: 'btn', onClick: this.onPP}, pp_btn_char),
            r.a({className: 'btn', onClick: this.props.onNext}, RIGHT_CHAR)
            //r.span({className: 'title'}, this.state.track_title)
        ]);
    }
});

module.exports = Player;

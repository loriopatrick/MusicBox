var React = require('react');
var r = require('r-dom');

var PLAY_CHAR = '►';
var PAUSE_CHAR = '❚❚';
var LEFT_CHAR = '❰';
var HASH_CHAR = '#';
var RIGHT_CHAR = '❱';

var current_track = null;
var sound = null;

var Player = React.createClass({
    onHash: function() {
        var track = this.props.track;
        if (this.props.hashes.indexOf(track) > -1) {
            this.props.rmHash(track);
        } else {
            this.props.addHash(track);
        }
    },
    render: function() {
        var pp_btn_char;
        if (this.props.playing) {
            if (current_track != this.props.track) {
                current_track = this.props.track;
                if (sound) {
                    sound.stop();
                    sound = null;
                }
            }
            if (!sound) {
                console.log('new sound');
                sound = new buzz.sound('/rpc?method=track.get&track=' + this.props.track);
                sound.play();
            }
            if (sound.isPaused()) {
                sound.play();
            }
            pp_btn_char = PAUSE_CHAR;
        } else {
            if (sound) {
                sound.pause();
            }
            pp_btn_char = PLAY_CHAR;
        }

        var in_hash = this.props.hashes.indexOf(this.props.track) > -1;
        return r.div({className: 'player'}, [
            r.a({className: 'btn' + (in_hash? ' active' : ''), onClick: this.onHash}, HASH_CHAR),
            r.a({className: 'btn', onClick: this.props.onPrev}, LEFT_CHAR),
            r.a({className: 'btn', onClick: this.props.onTogglePlay}, pp_btn_char),
            r.a({className: 'btn', onClick: this.props.onNext}, RIGHT_CHAR),
            r.span({className: 'title'}, this.props.track)
        ]);
    }
});

module.exports = Player;

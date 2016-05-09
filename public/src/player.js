var React = require('react');
var r = require('r-dom');

var PLAY_CHAR = '►';
var PAUSE_CHAR = '❚❚';
var LEFT_CHAR = '❰';
var HASH_CHAR = '#';
var RIGHT_CHAR = '❱';
var SHUFFLE_CHAR = '🔀';

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
        var self = this;
        var pp_btn_char;
        if (this.props.playing) {
            if (current_track != this.props.track) {
                current_track = this.props.track;

                var newSound = new buzz.sound('/rpc?method=track.get&track=' + this.props.track);
                newSound.bind('ended', function() {
                    self.props.onNext();
                });
                newSound.bind('error', function() {
                    self.props.onTogglePlay();
                });
                if (sound) {
                    sound.unbind('ended');
                    sound.unbind('error');
                    console.log('stop');
                    sound.stop();
                }
                sound = newSound;
                setTimeout(function() {
                    sound.play();
                }, 100);
            } else if (sound.isPaused()) {
                sound.play();
            }
            pp_btn_char = PAUSE_CHAR;
        } else {
            if (sound) {
                console.log('pause');
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
            r.a({className: 'btn ' + (this.props.shuffle? 'active' : ''), onClick: this.props.onToggleShuffle}, SHUFFLE_CHAR),
            r.span({className: 'title'}, this.props.track)
        ]);
    }
});

module.exports = Player;

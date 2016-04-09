var React = require('react');
var r = require('r-dom');

var PLAY_CHAR = '►';

var Track = React.createClass({
    onHash: function(evt) {
        this.props.onHash(this.props.track, !this.props.inHash);
    },
    onPlay: function() {
        this.props.onPlay(this.props.track);
    },
    render: function() {
        return r.div({
            className: 'track' + (this.props.playing? ' active' : ''),
            onDoubleClick: this.onPlay
        }, [
            r.div({className: 'btns'}, [
                r.a({onClick: this.onHash, className: this.props.inHash? 'active' : ''}, '#')
            ]),
            r.div({className: 'title'}, this.props.track)
        ]);
    }
});

module.exports = Track;

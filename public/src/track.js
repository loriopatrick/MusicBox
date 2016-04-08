var React = require('react');
var r = require('r-dom');

var PLAY_CHAR = '►';

var Track = React.createClass({
    onHash: function() {
        this.props.onHash(this.props.track, !this.props.inHash);
    },
    render: function() {
        var tags = [];
        var self = this;
        this.props.track.tags.forEach(function(tag) {
            tags.push(r.span({
                key: tag,
                className: 'tag',
                onClick: function() {
                    self.props.onSetPlaylist(tag)
                }
            }, tag));
        });
        return r.div({className: 'track' + (this.props.playing? ' active' : '')}, [
            r.div({className: 'btns'}, [
                r.a({onClick: this.onHash, className: this.props.inHash? 'active' : ''}, '#')
            ]),
            r.div({className: 'title'}, this.props.track.title),
            tags
        ]);
    }
});

module.exports = Track;

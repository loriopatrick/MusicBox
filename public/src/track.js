var React = require('react');
var r = require('r-dom');

var PLAY_CHAR = '►';

var Track = React.createClass({
    getInitialState: function() {
        return {
            playing: false,
            tags: this.props.tags || [],
            title: this.props.title,
            selected: false
        };
    },
    render: function() {
        var tags = [];
        this.state.tags.forEach(function(tag) {
            tags.push(r.span({className: 'tag'}, tag));
        });
        return r.div({className: 'track'}, [
            r.div({className: 'btns'}, [
                r.a('+'),
                r.a('#')
            ]),
            r.div({className: 'title'}, this.state.title),
            tags
        ]);
    }
});

module.exports = Track;

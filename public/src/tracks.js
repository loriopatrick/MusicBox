var React = require('react');
var r = require('r-dom');


var Tracks = React.createClass({
    getInitialState: function() {
        return {
            tracks: [
                { id: 1, title: 'test', length: 1023, tags: ['test', 'food', 'apples'] },
                { id: 2, title: 'running', length: 231, tags: ['bad', 'food', 'apples'] }
            ]
        };
    },
    render: function() {
        var tracks = [];

        this.state.tracks.forEach(function(t) {
            var tags = [];
            t.tags.forEach(function(tag) {
                tags.push(r.span({className: 'tag'}, tag));
            });
            tracks.push(r.div({className: 'track', key: t.id}, [
                r.div({className: 'title'}, t.title),
                tags
            ]));
        });

        return r.div(tracks);
    }
});

module.exports = Tracks;

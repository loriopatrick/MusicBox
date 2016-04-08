var React = require('react');
var r = require('r-dom');

var Track = require('./track');

var Tracks = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var tracks = [];

        tracks.push(r(Track, {title: 'test', tags: ['foo', 'bar']}));
        tracks.push(r(Track, {title: 'apple', tags: ['bard', 'plorio']}));

        return r.div(tracks);
    }
});

module.exports = Tracks;

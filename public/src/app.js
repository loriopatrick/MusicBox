var React = require('react');
var r = require('r-dom');

var Player = require('./player');
var Tracks = require('./tracks');

var App = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return r.div({className: 'frame'}, [
            r.div({className: 'sidebar'}, [
                r.div({className: 'title'}, 'Music Box'),
                r.input({type: 'text', className: 'search', placeholder: 'playlist'}),
                r.div({className: 'playlists'}, [
                    r.a('all'),
                    r.a('plorio / test'),
                    r.a('nick / foo')
                ])
            ]),
            r.div({className: 'window'}, [
                r(Tracks)
            ]),
            r(Player)
        ]);
    }
});

module.exports = App;

var React = require('react');
var r = require('r-dom');

var Sidebar = React.createClass({
    getInitialState: function() {
        return {
            filter: null
        };
    },
    onFilterChange: function(evt) {
        var filter = evt.target.value;
        if (filter.length === 0) {
            filter = null;
        }
        this.setState({ filter: filter });
    },
    render: function() {
        var playlists = [];
        var current = this.props.playlist;

        var tracks = this.props.hashes;
        if (tracks.length > 0) {
            playlists.push(r.a({
                key: 'clear',
                onClick: this.props.clearPlaylist
            }, 'clear ' + tracks.length + ' track' + (tracks.length > 1 ? 's' : '')));

            playlists.push(r.a({
                key: 'new-play',
                onClick: this.props.createPlaylist
            }, 'create playlist'));

            if (current !== 'all') {
                playlists.push(r.a({
                    key: 'add-play',
                    onClick: this.props.addToPlaylist
                }, 'add to ' + current));
            }

            playlists.push(r.hr({key: 'sep'}));
        }

        var filter = this.state.filter;
        var self = this;

        function add(name) {
            playlists.push(r.a({
                key: 'play-' + name,
                className: current === name? 'active' : '',
                onClick: function() {
                    self.props.setPlaylist(name);
                }
            }, name));
        }

        add('all');
        this.props.playlists.forEach(function(playlist) {
            if (!filter || playlist.indexOf(filter) > -1 || playlist === current) {
                add(playlist);
            }
        });

        return r.div({className: 'sidebar'}, [
            r.div({className: 'title'}, 'Music Box'),
            r.input({type: 'text', className: 'search', placeholder: 'playlist', onChange: this.onFilterChange}),
            r.div({className: 'playlists'}, playlists)
        ]);
    }
});

module.exports = Sidebar;

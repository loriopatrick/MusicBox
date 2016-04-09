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

        var filter = this.state.filter;
        var self = this;

        function add(name) {
            playlists.push(r.a({
                key: name,
                className: current === name? 'active' : '',
                onClick: function() {
                    self.props.onSetPlaylist(name);
                }
            }, name.replace(/\//g, ' / ')));
        }

        add('all');
        this.props.playlists.forEach(function(playlist) {
            if (!filter || playlist.indexOf(filter) > -1 || playlist === current) {
                add(playlist);
            }
        });

        var settings = [
            r.a('-- no tracks selected --')
        ];

        var tracks = this.props.hashes;
        if (tracks.length > 0) {
            settings = [
                r.a({
                    key: 'count',
                }, tracks.length + ' track' + (tracks.length > 1 ? 's' : '') + ' selected'),
                r.a({
                    key: 'clear',
                    onClick: this.props.onClearHashes
                }, 'clear selection'),
                r.a({
                    key: 'new-play',
                    onClick: this.props.onCreatePlaylist
                }, 'create playlist')
            ];
        }

        return r.div({className: 'sidebar'}, [
            r.div({className: 'title'}, 'Music Box'),
            r.input({type: 'text', className: 'search', placeholder: 'playlist', onChange: this.onFilterChange}),
            r.div({className: 'playlists'}, playlists),
            r.div({className: 'settings'}, [
                r.hr(),
                r.h1('Create Playlist'),
                r.div(settings)
            ])
        ]);
    }
});

module.exports = Sidebar;

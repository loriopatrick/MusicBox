var React = require('react');
var r = require('r-dom');

var NavBar = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        return r.div({className: 'navbar'}, [
            r.a('test')
        ]);
    }
});

module.exports = NavBar;

var React = require('react');
var r = require('r-dom');

var Frame = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return r.div({className: 'frame'});
    }
});

module.exports = Frame;

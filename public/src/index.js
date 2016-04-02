var React = require('react');
var ReactDOM = require('react-dom');
var r = require('r-dom');

var App = require('./app');

ReactDOM.render(
      r(App),
      document.getElementById('app')
);

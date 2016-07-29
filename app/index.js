import React from 'react';
/*import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>ho-o-lalalala</div>,
    document.getElementById('app')
);*/

var style = require('./style/main.css');

var btn = document.createElement('button');
btn.className = style.redButton;
document.body.appendChild(btn);

var component = require('./components/Search');
document.body.appendChild(component());

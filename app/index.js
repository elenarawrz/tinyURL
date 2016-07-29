/*import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>ho-o-lalalala</div>,
    document.getElementById('app')
);*/
require('./style/main.css');

var component = require('./components/Search');

document.body.appendChild(component());

var style = require('../style/search.css');

module.exports = function () {
  var div = document.createElement('div');
  var element = document.createElement('h1');
  element.innerHTML = 'Hello worldddd asdfghjklñ__ñ!';
  div.appendChild(element);

  var btn = document.createElement('button');
  btn.className = style.redButton;
  div.appendChild(btn);

  return div;
};

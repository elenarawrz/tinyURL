module.exports = function () {
	var div = document.createElement('div');
	var element = document.createElement('h1');
	element.innerHTML = 'Helloasdfghjklñ__ñ!';
	div.appendChild(element);

	var btn = document.createElement('button');
	btn.className = 'redButton';
	div.appendChild(btn);

	return div;
};

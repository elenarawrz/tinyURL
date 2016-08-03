var tinyURL = require('./models/tinyURL');

module.exports = {
	configure: function(app) {
		app.get('/u/:tinyURL', function (req, res) {
			tinyURL.get(req.params.tinyURL, res);
		});

		app.get('/list', function (req, res) {
			tinyURL.getAll(res);
		});

		app.post('/', function (req, res) {
			tinyURL.create(req.body, res);
		});

		app.get('/get/:tinyURL', function (req, res) {
			tinyURL.redirect(req.params.tinyURL, res);
		});
	}
};

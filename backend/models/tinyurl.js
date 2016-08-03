var con = require('../connection');

function TinyURL (argument) {
	var shorten = function (original) {
		var tiny = '',
			tinyLength = 6,
			chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
			charsLength = chars.length,
			isRepeated = false;

		do {
			for (var i = 0; i < tinyLength; i++) {
				tiny += chars[Math.floor(Math.random() * charsLength)];
			}
		} while (isRepeated);

		return tiny;
	};

	this.create = function(original, res) {
		var tiny = shorten(original);
		con.acquire(function (err, con) {
			con.query('insert into urls (original, short) values (?, ?)', [original.url, tiny], function (err, result) {
				con.release();
				if(err)
					res.send({status: 1, message: 'URL shortening failed: ' + JSON.stringify(err)});
				else
					res.send({status: 0, tinyURL: tiny});
			});
		});
	};

	this.get = function(tiny, res) {
		con.acquire(function (err, con) {
			con.query('select original from urls where short = ?', tiny, function (err, result) {
				con.release();
				if(err)
					res.send({status: 1, message: JSON.stringify(err)});
				else
					res.send({status: 0, tinyURL: result});
			});
		});
	};

	this.redirect = function(tiny, res) {
		con.acquire(function (err, con) {
			con.query('select original from urls where short = ?', tiny, function (err, result) {
				con.release();
				if(err)
					res.send({status: 1, message: JSON.stringify(err)});
				else
					res.redirect(result[0].original);
					//res.send({ok:result});
			});
		});
	};

	this.getAll = function(res) {
		con.acquire(function (err, con) {
			con.query('select * from urls', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};

}

module.exports = new TinyURL();




/*
	} while (find(tiny).tinyURL);


	var find = function (tiny) {
		con.acquire(function (err, con) {
			con.query("select original from urls where short = ?", tiny, function (err, result) {
				con.release();
				if(err)
					return {status: 1, message: JSON.stringify(err)};
				else
					return {status: 0, tinyURL: result};
			});
		});
	}


	this.get = function(tiny, res) {
		res.send(find(tiny));
	};
	*/

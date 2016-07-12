var mysql = require('mysql');

function Connection() {
	this.pool = null;
	this.init = function() {
		this.pool = mysql.createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'tinyURL'
		});
	};

	this.acquire = function(callback) {
		this.pool.getConnection(function(err, conn) {
			callback(err, conn);
		});
	};
}

module.exports = new Connection();
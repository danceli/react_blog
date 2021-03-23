const mysql = require('mysql');
const co = require('co-mysql');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = require('../lib/config.js');

const connec = mysql.createPool({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE
});

module.exports = co(connec);
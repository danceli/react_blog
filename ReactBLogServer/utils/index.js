const crypto = require('crypto');
const { PASS_SECRET } =  require('../lib/config.js')

function cryPass(password) {
	const hash = crypto.createHash('md5');
	hash.update(`${PASS_SECRET}${password}`);
	return hash.digest('hex')
}

module.exports = {
	cryPass
}
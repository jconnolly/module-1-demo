
// Assumes 'pg' is used for PostgreSQL
const { Pool } = require('pg');

class ValidationError extends Error { constructor(msg) { super(msg); this.code = 'VALID_ERR'; } }

/**
 * Registers a new user if email_address does not exist.
 * @param {Pool} pool - pg Pool instance
 * @param {Object} user - { full_name, email_address, account_status, internal_clearance_level }
 * @returns {Promise<Object>} Inserted user row
 */
async function registerUser(pool, user) {
	const { full_name, email_address, account_status, internal_clearance_level } = user;
	// Check for existing user
	const checkRes = await pool.query(
		'SELECT id FROM users WHERE email_address = $1',
		[email_address]
	);
	if (checkRes.rows.length > 0) {
		throw new ValidationError('User with this email already exists.');
	}
	// Insert new user with minimum required fields
	const insertRes = await pool.query(
		`INSERT INTO users (full_name, email_address${account_status ? ', account_status' : ''}${internal_clearance_level ? ', internal_clearance_level' : ''})
		 VALUES ($1, $2${account_status ? ', $3' : ''}${internal_clearance_level ? (account_status ? ', $4' : ', $3') : ''})
		 RETURNING *`,
		[
			full_name,
			email_address,
			...(account_status ? [account_status] : []),
			...(internal_clearance_level ? [internal_clearance_level] : [])
		]
	);
	return insertRes.rows[0];
}

module.exports = { registerUser, ValidationError };

const Pool = require("pg").Pool;

//fs
const fs = require("fs");

const {
	POSTGRES_USER: DB_USER,
	POSTGRES_PASSWORD: DB_PASSWORD,
	POSTGRES_HOST: DB_HOST,
	POSTGRES_PORT: DB_PORT,
	POSTGRES_DB: DB_NAME,
} = process.env;

try {
	const PASSWORD = fs.readFileSync(DB_PASSWORD, "utf-8");

	console.log("DB_USER: ", DB_USER);
	console.log("DB_PASSWORD", PASSWORD, typeof (PASSWORD));
	console.log("DB_HOST", DB_HOST);
	console.log("DB_PORT", DB_PORT);
	console.log("DB_NAME", DB_NAME);

	//extract password from string which is file path







	const pool = new Pool({
		user: DB_USER,
		password: PASSWORD,
		host: DB_HOST,
		port: DB_PORT,
		database: DB_NAME,
	});

	module.exports = pool;

} catch (err) {
	console.error(err.message);
}




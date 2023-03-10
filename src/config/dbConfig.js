// confiuração da database;
require('dotenv').config()

const dbConfig = {
	logging: true,
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PWD,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	define: {
		timestamps: true, // atomaticaly create propeties: criatedAt e updatedAt
	}
}

module.exports = dbConfig;


CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	user_name VARCHAR(50) NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	password_digest VARCHAR(200) NOT NULL
);
CREATE TABLE products (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	p_name VARCHAR(60) NOT NULL UNIQUE,
	p_price INT NOT NULL,
	p_category VARCHAR(60) NOT NULL
);
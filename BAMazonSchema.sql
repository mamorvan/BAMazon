CREATE DATABASE BAMazonDB;

USE BAMazonDB;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price INT,
	stock_quantity INT,
	PRIMARY KEY (item_id)
);
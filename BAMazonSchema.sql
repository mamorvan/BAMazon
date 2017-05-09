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

CREATE TABLE departments(
	deparment_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs DECIMAL(10,2) NOT NULL,
	total_sales DECIMAL(10,2) DEFAULT 0,
	PRIMARY KEY (deparment_id)
	);

ALTER TABLE products
ADD product_sales DECIMAL(10,2) DEFAULT 0;
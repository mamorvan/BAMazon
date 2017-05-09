USE BAMazonDB;

CREATE TABLE departments(
	deparment_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs DECIMAL(10,2) NOT NULL,
	total_sales DECIMAL(10,2) DEFAULT 0,
	PRIMARY KEY (deparment_id)
	);

ALTER TABLE products
ADD product_sales DECIMAL(10,2) DEFAULT 0;

INSERT INTO departments (department_name, over_head_costs)
VALUES
	("air", 2000),
	("earth", 500),
	("fire", 2000),
	("water", 5000);
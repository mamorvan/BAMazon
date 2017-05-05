var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors/safe');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "BonnieMad1son",
	database: "BAMazonDB"
});

connection.connect(function(err) {
	if(err) throw err;
	console.log("connected as id" + connection.threadId + "\n");
});

//-----function to display available items with itemID, name, price and quantity------//
var viewProducts = function() {
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, DBresults) {
		if (err) throw err;
		console.log("Hi manager, here is the current inventory:");
		for (var i = 0; i < DBresults.length; i++) {
			console.log("ItemID: " + DBresults[i].item_id + ": " + DBresults[i].product_name + "  -- price: $" + DBresults[i].price + " -- quantity in stock: " + DBresults[i].stock_quantity);
		};
	});//end of connection.query callback
	connection.end();
}; //end of viewProducts function

//-----function to display all items with inventory count lower than 5-----//
var viewLow = function() {
	connection.query("SELECT product_name, stock_quantity FROM products", function(err, DBresults) {
		if (err) throw err;
		console.log("Hi manager, the following products have a low inventory:\n");
		for (var i = 0; i < DBresults.length; i++) {
			if (DBresults[i].stock_quantity < 5) {
				console.log("Warning!!!\n" + DBresults[i].product_name + " only has " + DBresults[i].stock_quantity + " items remaining.\nYou might want to go find some more!");
			}		
		};
	});//end of connection.query callback
	connection.end();
}; //end of viewLow function

//-----function to add inventory to existing items-----//
var addInventory = function() {

}; //end of addInventory function

//-----function to add a new product-----//
var addProduct = function() {

}; //end of addProduct function

inquirer.prompt([
	{
	name: "command",
	message: "What would you like to do?",
	type: "list",
	choices: ["View products", "View low inventory", "Add to inventory", "Add new product"]
	}
]).then(function(command) {
	if (command.command === "View products") {
		viewProducts();
	}
	else if (command.command === "View low inventory") {
		viewLow();
	}
	else if (command.command === "Add to inventory") {
		addInventory();
	}
	else {
		addProduct();
	}
});
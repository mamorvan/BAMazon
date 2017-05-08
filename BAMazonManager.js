var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "BonnieMad1son",
	database: "BAMazonDB"
});

connection.connect(function(err) {
	if(err) throw err;
	managerOptions();
});

//-----function to show manager options-----//
//use inquirer for better list format-----//
var managerOptions = function() {
	inquirer.prompt({
	    name: "command",
	    type: "list",
	    message: "Welcome to BAMazon's Manager Interface! What would you like to do?",
	    choices: [
	      "View products for sale",
	      "View low inventory",
	      "Add to inventory",
	      "Add new product",
	      "Delete a product",
	      "Exit"
	    ]
	  }).then(function(command) 
	  {
	  	switch(command.command) {
	  		case "View products for sale":
	  			viewProducts();
	  			break;

	  		case "View low inventory":
	  			viewLow();
	  			break;

	  		case "Add to inventory":
	  			addInventory();
	  			break;

	  		case "Add new product":
	  			addProduct();
	  			break;

	  		case "Delete a product":
	  			deleteProduct();
	  			break;

	  		case "Exit":
	  			console.log("Bye");
	  			connection.end();
	  			break;
	  	}	  	
	  })
}; //end of managerOptions function

//-----function to display available items with itemID, name, price and quantity------//
var viewProducts = function() {
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, DBresults) {
		if (err) throw err;
		console.log("\nHi manager, here is the current inventory:");
		for (var i = 0; i < DBresults.length; i++) {
			console.log("ItemID: " + DBresults[i].item_id + ": " + DBresults[i].product_name + "  -- price: $" + DBresults[i].price + " -- quantity in stock: " + DBresults[i].stock_quantity);
		};

	});//end of connection.query callback
	managerOptions();
}; //end of viewProducts function

//-----function to display all items with inventory count lower than 5-----//
var viewLow = function() {
	connection.query("SELECT product_name, stock_quantity FROM products", function(err, DBresults) {
		if (err) throw err;
		console.log("\nHi manager, the following products have a low inventory:\n");
		for (var i = 0; i < DBresults.length; i++) {
			if (DBresults[i].stock_quantity < 5) {
				console.log("Warning!!!\n" + DBresults[i].product_name + " only has " + DBresults[i].stock_quantity + " items remaining.\nYou might want to go find some more!\n");
			}		
		};
	});//end of connection.query callback
	managerOptions();
}; //end of viewLow function

//-----function to add inventory to existing items-----//
var addInventory = function() {
	connection.query("SELECT product_name, stock_quantity FROM products", function(err, DBresults) {
		inquirer.prompt([
		{
			name: "item",
			message: "Select the product you want to add more of:",
			type: "list",
			choices: function() {
				var itemArray = [];
				for (var i = 0; i < DBresults.length; i++) {
					itemArray.push(DBresults[i].product_name);
				}
				return itemArray;
			}
		},
		{
			name: "addTo",
			message: "How many items do you want to add to existing stock?"
		}
		]).then(function(managerInput) {
			//check if user actually input a number
			if(Number(managerInput.addTo)) { 
				// get index for chosen item
				var itemIndex;
				for (var i = 0; i < DBresults.length; i++){
					if(DBresults[i].product_name === managerInput.item) {
						itemIndex = i;
					}
				};

				var updatedStock = DBresults[itemIndex].stock_quantity + parseInt(managerInput.addTo);

				var query = "UPDATE products SET stock_quantity = ? WHERE product_name = ?";
				connection.query(query, [updatedStock, managerInput.item], function(err, DBresults) {
				if (err) throw err;
				console.log("\nnew stock added");
				})
				console.log(managerInput.item + " updatedStock : " + updatedStock);
				managerOptions();
			}
			else {
				console.log("Please use numbers only for stock quantity! Now you have to start all over!");
				managerOptions();
			}
		});//end of .then manager input

	});//end of connection.query callback

}; //end of addInventory function

//-----function to add a new product-----//
var addProduct = function() {
	connection.query("SELECT product_name, department_name, price, stock_quantity FROM products", function(err, DBresults) {
		inquirer.prompt([
		{
			name: "item",
			message: "What is the name of your product?",		
		},
		{
			name: "dept",
			message: "Which department does the new product go in?",
			type: "list",
			//will need to change these if departments change, keep trying to display from database with no repeats
			choices: ["air", "earth", "fire", "water"]	
		},
		{
			name: "price",
			message: "What is the cost of the new product?"
		},
		{
			name: "stock",
			message: "How many items of the new product do you want to add?"
		}
		]).then(function(managerInput) {
			//validate price is a number and more than 0
			if(!(Number(managerInput.price) && managerInput.price > 0)) {
				console.log("Please use numbers only for prices! Now you have to start over!");
				return addProduct();
			}
			//validate if quantity is a number
			if (!(Number(managerInput.stock))) {
				console.log("Please use numbers only for stock quantity! Now you have to start over!");
				return addProduct();
			}
			//validate that product doesn't already exist
			var existingProductArray = [];
			for (var i = 0; i < DBresults.length; i++) {
				existingProductArray.push(DBresults[i].product_name);
			}
			if (existingProductArray.indexOf(managerInput.item) !== -1) {
				console.log("product already exists");
				return addProduct();
			}

			//query to add product to db
			var query = "INSERT INTO products SET ?";
			var newProduct = {
				product_name:managerInput.item, 
				department_name:managerInput.dept, 
				price:parseInt(managerInput.price), 
				stock_quantity:parseInt(managerInput.stock)
			};
			
			connection.query(query, newProduct ,function(err, DBresults) {
				if (err) throw err;
				console.log("You have successfully added " + managerInput.stock + " " + managerInput.item + " to BAMazon!");
				managerOptions();
			});//end of add product connection query
			
		}); //end of inquirer .then
	});//end of select connection query to get existing product names
}; //end of addProduct function

//-----function to delete products-----//
var deleteProduct = function() {
	connection.query("SELECT * FROM products", function(err, DBresults) {
		inquirer.prompt([
		{
			name: "item",
			message: "Select the product you want to delete:",
			type: "list",
			choices: function() {
				var itemArray = [];
				for (var i = 0; i < DBresults.length; i++) {
					itemArray.push(DBresults[i].product_name);
				}
				return itemArray;
			}
		}
		]).then(function(managerInput) {
			var query = "DELETE from products WHERE product_name = ?";
			connection.query(query, [managerInput.item], function(err, DBresults) {
				if (err) throw err;
				console.log("\n" + managerInput.item + " has been deleted from BAMazon. Hope it didn't cause any damage on the way out!");
				managerOptions();
			}); // end of connection to delete product		
		});//end of .then manager input
	});//end of connection.query
}; //end of deleteProduct function




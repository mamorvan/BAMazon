var mysql = require("mysql");
var prompt = require("prompt");
var colors = require("colors/safe");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "BAMazonDB"
});

connection.connect(function(err){
	if(err) throw err;
	customerOptions();
});

//-----function to show customer options-----//
//use inquirer for better list format-----//
var customerOptions = function() {
	inquirer.prompt({
	    name: "command",
	    type: "list",
	    message: "Welcome to BAMazon! What would you like to do?",
	    choices: [
	      "See all available magical pets",
	      "I'm ready to adopt one or more magical pets",
	      "I have enough magic in my life, I'd like to exit"
	    ]
	  }).then(function(command) 
	  {
	  	if (command.command === "See all available magical pets") {
	  		displayProducts();
	  	}
	  	else if (command.command === "I'm ready to adopt one or more magical pets") {
	  		sale();
	  	}
	  	else {
	  		console.log("Bye. Come back soon!");
	  		connection.end();
	  	}
	  })
}; //end of customerOptions function

//------function to display products for sale - 
//with id, name and price (would like to include number in stock but following hw directions!
//sometimes i'm a rule follower---------//
var displayProducts = function() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, DBresults) {
		if (err) throw err;
		console.log("BAMazon offers the widest variety and best prices on magical creature adoptions! \nHave fun shopping!\n");
		for (var i = 0; i < DBresults.length; i++) {
			console.log("Item# " + DBresults[i].item_id + ": " + DBresults[i].product_name + " - Price: $" + DBresults[i].price);
		};
		console.log("\n");
	customerOptions();	
	});
	
};//end of displayProducts function

//------function to prompt customer input, check stock, calculate total and update db stock-----------//
//-----use prompt for easier validation and colors!----//
var sale = function() {	
	//set up prompt properties
	prompt.message = colors.cyan("BAMazon");
	prompt.delimiter = colors.magenta(" *** ");

	var schema =  {
		properties: {
			productID: {
				description: colors.green("Please enter the product ID for the magical pet you'd like to buy"),
				pattern: /^[0-9]+$/,
				message: colors.yellow("Product IDs contain only numbers, try again"),
				required: true
			},
			quantity: {
				description: colors.green("How many would you like?"),
				pattern: /^[0-9]+$/,
				message: colors.yellow("Please enter a number quantity, try again"),
				required: true
			}
		}		
	} //end of prompt schema

	prompt.start();

	prompt.get(schema, function(err, customerInput) {
		//query database for item IDs and make sure product ID exists
		connection.query("SElECT item_id FROM products", function(err, itemIDs) {
			var itemIDArray = [];
			for (var i = 0; i < itemIDs.length; i++) {
				itemIDArray.push(itemIDs[i].item_id);
			}
			if (itemIDArray.indexOf(parseInt(customerInput.productID)) === -1) {
				console.log ("I'm sorry, that product id does not exists.\nMaybe you should look at our list of products again.");
				return customerOptions();
			}
			//query database for chosen product data
			connection.query("SELECT * FROM products WHERE ?", {item_id : customerInput.productID}, function(err, DBresults) {
				var totalSale = customerInput.quantity * DBresults[0].price;
				//if there is not enough stock
				if (customerInput.quantity > DBresults[0].stock_quantity) {
					console.log("I'm sorry, we don't have that many of " + DBresults[0].product_name + ". We only have " + DBresults[0].stock_quantity + ".");
					console.log("Try changing your pet, quantity or both.");
					sale();
				}
				else {
					connection.query("UPDATE products SET stock_quantity = stock_quantity-" + customerInput.quantity 
						+ ", product_sales = product_sales+" + totalSale 
						+ " WHERE item_id =" + customerInput.productID, function(err) {
						if (err) throw err;
						console.log("Stock has been updated.");
						console.log("Congratulations! You have ordered " + customerInput.quantity + " of " + DBresults[0].product_name + "\nYour total cost is: $" + totalSale);
						connection.query("UPDATE departments SET total_sales = total_sales+" + totalSale 
							+ " WHERE department_name =" + JSON.stringify(DBresults[0].department_name), function(err) {
							if (err) throw err;
						});
						customerOptions();
					});
				}
			});//end of connection query	
		});//end of item query		
	});//end of prompt get
};//end of sale function






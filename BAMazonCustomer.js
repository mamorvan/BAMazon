var mysql = require("mysql");
var prompt = require("prompt");
var colors = require("colors/safe");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "BonnieMad1son",
	database: "BAMazonDB"
});

connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id" + connection.threadId + "\n");
});

//------function to display products for sale----------//
var displayProducts = function() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, DBresults) {
		if (err) throw err;
		console.log("BAMazon offers the widest variety and best prices on magical creature adoptions! \nHave fun shopping!\n")
		for (var i = 0; i < DBresults.length; i++) {
			console.log("Item# " + DBresults[i].item_id + ": " + DBresults[i].product_name + " - Price: $" + DBresults[i].price);
		};
		console.log("\n");
	sale();	
	});
	
};//end of displayProducts function

//------function to prompt customer input, check stock, calculate total and update db stock-----------//
var sale = function() {
	
	//set up prompt properties
	prompt.message = colors.green("Welcome to BAMazon");
	prompt.delimiter = colors.magenta(" *** ");

	var schema =  {
		properties: {
			productID: {
				description: colors.cyan("Please enter the product ID for the magical pet you'd like to buy"),
				pattern: /^[0-9]+$/,
				message: colors.yellow("Product IDs contain only numbers, try again"),
				required: true
			},
			quantity: {
				description: colors.cyan("How many would you like?"),
				pattern: /^[0-9]+$/,
				message: colors.yellow("Please enter a number quantity, try again"),
				required: true
			}
		}		
	} //end of prompt schema

	prompt.start();

	prompt.get(schema, function(err, customerInput) {
		//query database for chosen product data
		connection.query("SELECT * FROM products WHERE ?", {item_id : customerInput.productID}, function(err, DBresults) {
			//if there is not enough stock
			if (customerInput.quantity > DBresults[0].stock_quantity) {
				console.log("I'm sorry, we don't have that many of " + DBresults[0].product_name + ". We only have " + DBresults[0].stock_quantity + ".");
				console.log("Try changing your pet, quantity or both.");
				sale();
			}



		});//end of connection query
	});//end of prompt get

};//end of sale function

displayProducts();





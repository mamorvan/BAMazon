var mysql = require("mysql");
var prompt = require("prompt");

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

var displayProducts = function() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, results) {
		if (err) throw err;
		console.log("BAMazon offers the widest variety and best prices on magical creature adoptions! \nHave fun shopping!\n")
		for (var i = 0; i < results.length; i++) {
			console.log("Item# " + results[i].item_id + ": " + results[i].product_name + " - Price: $" + results[i].price);
		}
	});
};

displayProducts();




connection.end();
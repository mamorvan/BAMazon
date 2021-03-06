var mysql = require("mysql");
var Table = require("easy-table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "BAMazonDB"
});

connection.connect(function(err) {
	if(err) throw err;
	supervisorOptions();
});

//-----function to show supervisor options-----//
var supervisorOptions = function() {
	inquirer.prompt({
		name: "command",
		type: "list",
		message: "Welcome to BAMazon's Supervisor Interface!  What would you like to do?",
		choices: [
			"View product sales by department",
			"Create a new department",
			"Delete a department",
			"Exit"
		]
	}).then(function(command){
		switch(command.command) {
			case "View product sales by department":
				viewDeptSales();
				break;

			case "Create a new department":
				createDept();
				break;

			case "Delete a department":
				deleteDept();
				break;

			case "Exit":
				console.log("Bye");
				connection.end();
				break;
		}
	}); // end of inquirer .then
}; //end  of supervisorOptions function

//-----function to display product sales by dept-----//
var viewDeptSales = function() {
	connection.query("SELECT department_id, department_name, over_head_costs, total_sales, (total_sales-over_head_costs) AS total_profit FROM departments", function(err, DBresults) {
		if (err) throw err;
		
		var deptSalesTable = new Table;

		DBresults.forEach(function(deptInfo) {
			deptSalesTable.cell("Department ID", deptInfo.department_id)
			deptSalesTable.cell("Department Name", deptInfo.department_name)
			deptSalesTable.cell("Overhead Costs", deptInfo.over_head_costs)
			deptSalesTable.cell("Total Sales", deptInfo.total_sales)
			deptSalesTable.cell("Total Profit", deptInfo.total_profit, Table.number(2)),
			deptSalesTable.total("Total Profit"),
			deptSalesTable.newRow()
		});

		console.log("Latest Sales by Deparment:\n" + deptSalesTable.toString() + "\n");
		supervisorOptions();

	}); //end of departments query
}; //end viewDeptSales function

//-----function to create a new department-----//
//make sure to console.log reminder to manually add department to manager js file until developer figures out how to populate directly from db//
var createDept = function() {
	//get array of existing departmentsvalidate that department does not already exist
	var deptArray = [];
	connection.query("SELECT department_name FROM departments", function(err, DBresults) {
		for (var i = 0; i < DBresults.length; i++) {
		deptArray.push(DBresults[i].department_name);
		}
	 	//get input from supervisor
		inquirer.prompt([
			{
				name: "dept",
				message: "Which department do you want to add?"
			},
			{
				name: "cost",
				message: "What are the overhead costs for this department?"
			}
		]).then(function(deptInput) {
			//validate if department already exists
			if(deptArray.indexOf(deptInput.dept) !== -1) {
				console.log("That deparment already exists! Maybe you should check the sales table again!");
				return viewDeptSales();
			}
			//validate overhead is a number and more than 0
			if(!(Number(deptInput.cost) && deptInput.cost > 0)) {
				console.log("Please use numbers only for cost! Now you have to start over!");
				return createDept();
			}
			//create a new dept from input
			var newDept = {
				department_name:deptInput.dept,
				over_head_costs:deptInput.cost
			};
			//add new dept to db
			connection.query("INSERT INTO departments SET ?", newDept , function(err, DBresponse) {
				if (err) throw err;
				console.log("You have successfully added " + deptInput.dept + " department.  You can now start adding products in the Manager Interface.");
				supervisorOptions();
			});			
		}); //end of inquirer .then
	});
}; //end of createDept function

//------function to delete department-----//
var deleteDept = function() {
	connection.query("SELECT * FROM departments", function(err,DBresults) {
		inquirer.prompt([
			{
				name: "dept",
				message: "Select the department you want to delete:",
				type: "list",
				choices: function() {
					var deptArray = [];
					for (var i = 0; i < DBresults.length; i++) {
						deptArray.push(DBresults[i].department_name);
					}
					return deptArray;
				}
			}]).then(function(deptInput) {
				connection.query("DELETE from departments WHERE department_name = ?", [deptInput.dept], function(err, DBresponse){
					if (err) throw err;
					console.log("\nThe " + deptInput.dept + " department has been deleted.  They should have been more profitable!\nThe creatures in this department can be deleted by the manager or sold off at clearance prices.");
					supervisorOptions();
				});
			});//end of .then
	});//end of query
};//end of deleteDept function















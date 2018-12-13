var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  
  port: 3306,

  
  user: "root",

  
  password: "lakers123",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
   canBuy();
  });

  function canBuy() {

    inquirer.prompt([
        {
            name: "whichID",
            type: "input",
            message: "What is the ID from the product you want to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much of the product are you going to buy?"
        }])
        .then(function (results) {
            var totalCost = 0;
           
            var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ? AND stock_quantity > ?";
            
            connection.query(query, [results.quantity, results.whichID, results.quantity], function (err, res) {
            });
            
            connection.query("UPDATE products SET product_sales = product_sales + price * ? WHERE id = ?", [results.quantity, results.whichID], function (err, target) {
            })
           
            connection.query("SELECT * FROM products WHERE id = ?",[results.whichID], function (err, result) {
                console.table(result);
                console.log("Purchase of " + results.quantity + " " + result[0].product_name + " successful. Your total cost was: $" + result[0].price * results.quantity);
            })

            
            connection.end();
        });
};


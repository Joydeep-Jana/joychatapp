const mysql = require("mysql");

//Please fill required information in the connection object(if changes needed).
const db = mysql.createConnection(
    {
        host: "remotemysql.com",
	    user: "GNSlpyOfDf",
        password: "QmPs7ZQr10",
        database: "GNSlpyOfDf",
        port: 3306
    });

db.connect((err) => 
{
    if(err)
    {
        throw err;
    }

    console.log("Connected.");
});

module.exports = db;
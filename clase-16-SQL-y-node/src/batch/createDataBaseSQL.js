import mysql from 'mysql';

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });
con.connect((err)=> {
    if (err) throw err;
    console.log("Connected..!!");
    con.query("CREATE DATABASE miBase", function (err, result) {
      if (err) throw err;
      console.log("Database Created..!!")
      con.destroy()
    })
      
 })
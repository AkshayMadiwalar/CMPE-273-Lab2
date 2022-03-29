const mysql  =  require('mysql')

//connection pool
const db = mysql.createPool({
    host:"etsy.czf80i7yo4gh.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"Akshay1998",
    database:"etsy",
    port:'3306'
})


//Single connection
// var db = mysql.createConnection({
//     host:"etsy.chdckafyrses.ap-south-1.rds.amazonaws.com",
//     user:"admin",
//     password:"akshay1998",
//     database:"etsy",
//     port:'3306'
// });

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Akshay@1998",
//     database:"etsy",
//     port:'3306'
// })

// db.connect(function(err) {
//     if (err) throw err;
// });


module.exports = db
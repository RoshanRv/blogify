const mysql = require('mysql')

const db = mysql.createConnection({
    host:'sql6.freesqldatabase.com',
    user:'sql6494345',
    password:'1XyiEFeABH',
    database:'sql6494345',

})

module.exports = db
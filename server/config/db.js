const mysql = require('mysql')

const db = mysql.createConnection({
    host:'bop18qphcwvqdx51gkrm-mysql.services.clever-cloud.com',
    user:'ucjyhz4yht3dknhh',
    password:'a0Wtq6onZlhqjoRAmbXv',
    database:'bop18qphcwvqdx51gkrm',

})

module.exports = db
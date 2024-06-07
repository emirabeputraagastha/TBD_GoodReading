const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres', // Ganti dengan nama user yang digunakan
    server: 'localhost', // Ganti dengan nama host yang digunakan
    database: 'TBD_GoodReading', // Ganti dengan nama database yang digunakan
    password: 'Mae110373', // Ganti dengan password yang digunakan
    port: 5432, // Ganti dengan port yang digunakan
})

module.exports = pool;

pool.on('connect', pool => {
    console.log('connected to the Database');
});
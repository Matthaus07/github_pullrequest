//pg database configuration
const { Pool } = require('pg');
const bd = new Pool({
    user: 'muslxvjpcdchrz',
    host: 'ec2-54-163-255-1.compute-1.amazonaws.com',
    database: 'dko4vsbqbedpt',
    password: '3b1b41f65f2ab6406bc5645bc6ff48e97c7549278c1034331f56a94f7e42cec7',
    port: 5432,
    ssl:true
});

bd.connect();

module.exports = bd
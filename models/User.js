const client = require('../config/database');

const query = 
`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    address JSONB NULL,
    gender VARCHAR(10) NULL
);
`
// const createTableQuery = `CREATE TABLE my_table (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255)
// )`;
const insertQuery = `
      INSERT INTO users (id, name, age)
      VALUES ($1, $2, $3);
    `;
// const text = 'INSERT INTO user(id, name, age) VALUES($1, $2, $3) RETURNING *'
// const values = [1,'brianc'];

client.query(query, (err,result)=>{
    if(err){
        console.log('query error: ', err);
        
        // client.end();
    }
    else{
        console.log('Table successfully created');
    }
})

// client.query(text,values,(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result.rows[0]);
//         client.end();
//     }
// })

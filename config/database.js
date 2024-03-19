require('dotenv').config();
const {Client} = require('pg');

// DB URL
let DB_URL=`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bubble.db.elephantsql.com/${process.env.DB_USER}`;
// console.log(DB_URL);

let client=new Client(DB_URL);

client.connect(function(err){
    if(err){
        return console.error('could not connect to posgre', err);
    }
    console.log('Postgre connected');
    // client.end();
});



module.exports=client;


// client.connect(function(err){
//     if(err){
//         return console.error('could not connect to posgre', err);
//     }
//     client.query('SELECT NOW() AS "theTime"',function(err,result){
//         if(err){
//             return console.error('query gives error ', err);
//         }
//         console.log(result.rows[0].theTime);
//         client.end();
//     })
//     // console.log('Postgre connected');
// });

// client.on("connect", ()=>{
//     console.log('Database connected');
// })

// client.end("end", ()=>{
//     console.log("Connection end");
// })
const express=require('express');
const app=express();
const User = require('./models/User');
const userController = require('./controllers/userController');

const client=require('./config/database');
let userRoute=require('./routes/userRoute');
app.use('/',userRoute);
app.get('/',(req,res)=>{
    res.send('Hello, You are Home Route!');
})


app.listen(4000,()=>{
    console.log('app running on PORT 4000');
})

const csv = require('csvtojson');
// const { response } = require('../routes/userRoute');
const client  = require('../config/database');
const importUser=async(req,res)=>{
    try{
        let userData=[];
        csv()
        .fromFile(req.file.path)
        .then((response)=>{
            for(let x=0;x<response.length;x++){
                userData.push({
                    id:response[x].id,
                    name:response[x].firstName+response[x].lastName,
                    age:response[x].age
                })
            }
            for(let i=0;i<userData.length;i++){
                const text = 'INSERT INTO users(id, name, age) VALUES($1, $2, $3) RETURNING *'
                const values = [userData[i].id, userData[i].name, userData[i].age];
                client.query(text,values,(err,result)=>{
                    if(err){
                        console.log(err);
                        client.end();
                    }
                    else{
                        console.log(result.rows[0]);
                        client.end();
                    }
                })
            }
        })
        client.end();
        // console.log(req.file.path);
        res.send({success:true,msg:'csv imported'});
    } catch(error){
        res.send({success:false,msg:error.message});
    }
}

module.exports = {
    importUser
}
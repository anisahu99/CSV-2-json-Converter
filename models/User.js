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

client.query(query, (err,result)=>{
    if(err){
        console.log('query error: ', err);
    }
    else{
        console.log('Table created or exist');
    }
})

client.query('SELECT age FROM users',(err,result)=>{
    if(err){
        console.log('query error: ', err);
    }
    else{
        // console.log('Age result: ',result);
        const ages = result.rows.map(row => row.age);
        // console.log(ages);
        const totalUsers = ages.length;
        const ageDistribution = {
            '< 20': 0,
            '20 to 40': 0,
            '40 to 60': 0,
            '> 60': 0
        };

        ages.forEach(age => {
            if (age < 20) {
                ageDistribution['< 20']++;
            } else if (age >= 20 && age <= 40) {
                ageDistribution['20 to 40']++;
            } else if (age > 40 && age <= 60) {
                ageDistribution['40 to 60']++;
            } else {
                ageDistribution['> 60']++;
            }
        });
        const ageDistributionPercentage = {
            '< 20': ((ageDistribution['< 20'] / totalUsers) * 100).toFixed(2),
            '20 to 40': ((ageDistribution['20 to 40'] / totalUsers) * 100).toFixed(2),
            '40 to 60': ((ageDistribution['40 to 60'] / totalUsers) * 100).toFixed(2),
            '> 60': ((ageDistribution['> 60'] / totalUsers) * 100).toFixed(2)
        };

        const ageGroupArray = Object.keys(ageDistributionPercentage);
        console.log("Age-Group       % Distribution");
        ageGroupArray.forEach(ageGroup => {
            console.log(ageGroup.padEnd(15), ageDistributionPercentage[ageGroup]);
        });
    }
})


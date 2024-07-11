const mysql=require('mysql')


const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bloodbnak',
})
db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database')
    }else{
        console.log('Connected to the database')
    }
})

module.exports= db;
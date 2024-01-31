const express= require('express');
const bodyparser= require('body-parser');
const cors= require('cors');
const bcrypt=require('bcrypt')
const db=require('../server/src/models/db')
const jwt=require('jsonwebtoken')
const secretkey='asdfasfawerganigfdasdjhfgbajsdfg'

const app=express();

app.use(cors())
app.use(bodyparser.json())

app.post('/signup', async(req,res)=>{
    const {fullname, email, dob, bloodtype, password}=req.body;
        const hashpassword= await bcrypt.hash(password,10);
         
    const sql='INSERT INTO users (fullname, email, dob, bloodtype, password) VALUES (?,?,?,?,?)'
    db.query(sql,[ fullname, email, dob, bloodtype,hashpassword], (error, results)=>{
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).json({ error: 'Internal server error' });
          }
          if(results){
            alert("successfull login")
          }
          

    })
        }
     )

app.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const sql='SELECT * FROM users WHERE email= ?'
    db.query(sql,[email],async(error,result)=>{
        if(error){
            res.status(500).json({message:'error in searching data'})
            }else{
            res.status(201).json({message:'data found successful'})
        }
        if(result.length===0){
            console.log('no user found')
        }
        const user= result[0];
         const ispasswordMatch=await bcrypt.compare(password,user.password)
         if(ispasswordMatch)
         {
        let token=jwt.sign({email:user.email},secretkey,{expireIn:'10h'})
        const sql='UPDATE orgdetails SET jwt= ? WHERE orgemail= ?'
        db.query(sql,[token],(err)=>{
            if(err){
                console.log('token store in database successfully')
            }
            console.log('token store successfully')
           
        })
        res.json({token});
           }else{
        res.status(400).json({error:'user doesnot exits'})
     }
             })
    
    
    } )
    app.get('/userprofile',async (req,res)=>{
        const token=req.body;
        const sql="SELECT * FROM users where token = ? "
      const user= db.query(sql,[token],(error)=>{
            if(error){
                console.log(error);
            }
               })
        if(user.length===0){
            res.json({message:'user not found'})
        }
        const userdata= user[0]
        res.send({userdata})
        }
        )
    
app.post('/orgsignup', async(req,res)=>{
   // const {name,address,contact,email,password}=req.body;
const orgdetails=req.body;
console.log({orgdetails});
try {
    const hashpassword= await bcrypt.hash(orgdetails.orgpassword,10);
    console.log(orgdetails)
    const sqlquery='INSERT INTO orgdetails (orgname, orgaddress, orgcontact, orgemail, orgpassword) VALUES (?,?,?,?,?)'
    db.query(sqlquery,[orgdetails.orgname,orgdetails.orgaddress,orgdetails.orgcontact,orgdetails.orgemail,hashpassword],(error,result)=>{
        if(error){
            res.status(400).json({message:'problem in inserting prg details in database'})
        }(result)
        console.log('success org data input')
        res.status(200).json({message:'success ful inserting into databse'})
    })
} catch (error) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}
    
})

app.post('/orglogin', async(req,res)=>{
    const data=req.body;
    const Email=data.email;
    const password=data.password;

    const sqlquery='SELECT * FROM orgdetails WHERE orgemail = ?'
   
        db.query(sqlquery,[Email], (error,result)=>{
            if(error){
                console.log('error in searching data in orglogin ')
            }
            if( result.length === 0){
                console.log("no user found in org database")
                return res.status(401).json({message:"no user found"})
            }else{
                const user= result[0]
                
            const passwordmatch=   bcrypt.compare(password, user.orgpassword);
       if(passwordmatch){
        console.log("password match")
        return res.json({user})
    
       }
       console.log("password incorrect")
       return res.status(401).json({message:"password incorrect"})
            }
         
        })
   
     })
    

app.post('/orgprofile', async(req,res)=>{
  const id=req.body.id;
  console.log(id)
    const sqlquery='SELECT * FROM orgdetails WHERE id = ?'
    db.query(sqlquery,[ id ],(error,result)=>{
        if(error){
          
            console.log("error in finding organization in database")
        }
        if(result.length === 0){
            console.log('no user found')
            return res.status(404).json({ message: 'User not found' });

        }
        const org=result[0];
       console.log(org)
        return res.json({org})
    })
})

app.listen(5000, (err)=>{
if(err){
    console.log(err)
}else{
    console.log('server is running at 5000')
}
})
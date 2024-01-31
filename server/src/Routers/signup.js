const express=require('express')
const router=express.Router();
const Signup=require('../controllers/signup')

router.post('/', Signup.signup);

module.exports=router;
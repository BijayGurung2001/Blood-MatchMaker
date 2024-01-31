const express=require('express')
const router=express.Router();
const userprofile=require('../controllers/userprofile')

router.get('/', userprofile.profile);


module.exports=router;
const express=require('express');
const router=express.Router();
const passport=require('passport');

const likeController=require('../../controller/likeController');

router.post('/likePost',passport.authenticate('jwt',{session:false}),likeController.likePost);

module.exports=router;
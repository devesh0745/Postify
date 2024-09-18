const express=require('express');
const router=express.Router();
const passport=require('passport');

const postController=require('../../controller/postController');


router.post('/createPost',passport.authenticate('jwt',{session:false}),postController.createPost);
router.get('/getAllPost',passport.authenticate('jwt',{session:false}),postController.getAllPost);

module.exports=router;

const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../../controller/userController');

router.post('/sign-up',userController.signUp);
router.post('/sign-in',userController.signIn);
router.post('/follow-user',passport.authenticate('jwt',{session:false}),userController.followUser);
router.post('/unfollow-user',passport.authenticate('jwt',{session:false}),userController.unfollowUser);

module.exports=router;
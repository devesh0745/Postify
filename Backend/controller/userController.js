const User=require('../models/user');
const jwt=require('jsonwebtoken');

module.exports.signUp=async function signUp(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        console.log('Running')
        if(user){
            console.log('User already exist:',user);
            res.status(409).json({
                message:'User already exist...Sig-in please',
                user
            })
        }else{
            const user=await User.create(req.body);
            console.log('creating user:',user)
            res.status(200).json({message:'User created Successfully',
                user
            })
        }
    }catch(error){
        res.status(500).json({message:'Internal Server Error',
            error
        })
    }
}

module.exports.signIn=async function singIn(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        if(user.password==req.body.password){
            const token = jwt.sign(user.toJSON(), 'User', { expiresIn: '3h' });
              return res.status(200).json({
              message: 'Sign in successfully',
              user,
              token
            });
          }else{
            console.log("Incorrect email or password");
            res.json(400,{
              message:'Incorrect email or password'
            })
          }
    }catch(error){
        res.status(500).json({message:'Internal Server Error',
            error
        })
    }
};

module.exports.followUser = async function followUser(req, res) {
    try {
        const userIdToFollow = req.body.userId;
        const userId = req.user._id;

        if (!userIdToFollow) {
            return res.status(400).json({ message: 'User ID to follow is required' });
        }

        if (userIdToFollow === userId) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        const user = await User.findById(userId);
        if (user.following.includes(userIdToFollow)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        const userToFollow = await User.findById(userIdToFollow);
        if (!userToFollow) {
            return res.status(404).json({ message: 'User to follow not found' });
        }

        await User.findByIdAndUpdate(userId, { $push: { following: userIdToFollow } });

        await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: userId } });

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.unfollowUser = async function unfollowUser(req, res) {
    try {
        const userIdToUnfollow = req.body.userId;
        const loggedInUserId = req.user._id;

        if (!userIdToUnfollow) {
            return res.status(400).json({ message: 'User ID to unfollow is required' });
        }
        await User.findByIdAndUpdate(loggedInUserId, { $pull: { following: userIdToUnfollow } });
        await User.findByIdAndUpdate(userIdToUnfollow, { $pull: { followers: loggedInUserId } });

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

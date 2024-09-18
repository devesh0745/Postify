const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    contact:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const User=mongoose.model('User',UserSchema);

module.exports=User;
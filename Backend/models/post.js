const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;
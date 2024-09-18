const Post=require('../models/post');

module.exports.createPost = async function createPost(req, res) {
    try {
        const postData = {
            ...req.body,
            user: req.body.user
        };
        console.log('Creating post with data:', postData);
        const data = await Post.create(postData);
        const post=await data.populate('user','name followers')
      //  console.log('Created post:', data);
        res.status(200).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
};

module.exports.getAllPost = async function getAllPost(req, res) {
    try {
        console.log('Running getAllPost function');
        const {page=1,limit=3}=req.query; 
        const posts = await Post.find({})
                                        .skip((page-1)*limit)
                                        .limit(Number(limit))                                
                                        .populate('user', 'name');;
        console.log("Posts:", posts);

        if (posts.length === 0) { 
            res.status(200).json({ message: 'Post list is empty' });
        } else {
            res.status(200).json({
                message: 'All Posts',
                posts
            });
        }
    } catch (err) {
        console.error('Error in getAllPost:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

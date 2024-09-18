const Post = require('../models/post');
const Like = require('../models/like');

module.exports.likePost = async function likePost(req, res) {
    try {
        console.log(req.body);
        const { postId } = req.body;
        const userId = req.user._id;

        const existingLike = await Like.findOne({ user: userId, post: postId });
        if (existingLike) {
            return res.status(400).json({ message: 'User has already liked!!' });
        }
        const newLike = await Like.create({ user: userId, post: postId });
        
        await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });
        
        res.status(200).json({ message: 'Post liked successfully', like: newLike });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

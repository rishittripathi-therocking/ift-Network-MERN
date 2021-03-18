const Posts = require('../models/postModel');

const postController = {
    createPost: async(req,res) => {
        try {
            const {content, images} = req.body;

            if(images.length === 0) {
                return res.status(400).json({msg: 'Image is required for the post'});
            }

            const newPost = new Posts({
                content,images, user: req.user._id
            })
            await newPost.save();
            
            res.json({
                msg: 'Post Created',
                newPost
            })
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getPosts: async(req,res) => {
        try {
            const posts =await Posts.find({user: [...req.user.following, req.user._id]})
            .sort('-createdAt')
            .populate('user likes','avatar username fullname');
            res.json({
                msg: 'Success',
                result: posts.length,
                posts
            })
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    updatePosts: async(req,res) => {
        try {
            const {content, images} = req.body;
            const post = await Posts.findOneAndUpdate({_id: req.params.id}, {
                content, images
            }).populate("user likes","avatar username fullname")

            res.json({
                msg: "Post Updated",
                newPost: {
                    ...post._doc,
                    content,
                    images
                }
            })
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },

    
}

module.exports = postController;
const Posts = require('../models/postModel');

const postController = {
    createPost: async(req,res) => {
        try {
            const {content, images} = req.body;
            const newPost = new Posts({
                content,images
            })
            await newPost.save();
            
            res.json({
                msg: 'Post Created',
                newPost
            })
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = postController;
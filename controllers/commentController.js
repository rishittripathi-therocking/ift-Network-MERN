const Posts = require('../models/postModel');
const Comments = require('../models/commentModel');


const commentController = {
    createComment: async(req,res) => {
       try{
            const {postId, content, tag, reply,postUserId} = req.body;
            const newComment = new Comments({
                user: req.user._id, content, tag, reply, postUserId, postId
            })

            await Posts.findOneAndUpdate({_id: postId}, {
                $push: {comments: newComment._id}
            }, {new: true})
            await newComment.save();
            res.json({newComment});
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    updateComment: async(req,res) => {
        try{
            const {content} = req.body;
            await Comments.findOneAndUpdate({_id: req.params.id, user: req.user._id},{content});
            res.json({msg: "Comment Updated Succesfully"})
         } catch(err) {
            return res.status(500).json({msg: err.message});
         }
     },
     likeComment: async(req,res) => {
        try {
            const comment = await Comments.find({_id: req.params.id, likes: req.user._id});
            if(comment.length > 0) return res.status(400).json({msg: "You Already Liked this Comment"});
            await Comments.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            },{new: true})

            res.json({msg: 'You Liked the Comment'});
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    unlikeComment: async(req,res) => {
        try {
            
            await Comments.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            },{new: true})

            res.json({msg: 'You UnLiked the Comment'});
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteComment: async(req,res) => {
        try{
            const comment = await Comments.findOneAndDelete({_id: req.params.id, $or: [{user: req.user._id},{postUserId: req.user._id}]});
            await Posts.findOneAndUpdate({_id: comment.Id}, {
                $pull: {comments: req.params.id}
            })
            if(comment.err) return res.status(400).json({msg: post.err});
        
            res.json({msg: "You Deleted your comment"});
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
        
    },
}

module.exports = commentController;
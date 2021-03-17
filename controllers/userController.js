const Users = require('../models/userModel');

const userController = {
    searchUser: async(req,res) => {
        try {
            const users = await Users.find({username:{$regex: req.query.username}})
            .limit(10).select("fullname username avatar")
            res.json({users})
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getUser: async(req,res) => {
        try{
            const user = await Users.findById(req.params.id).select('-password');
            if(!user) {
                return res.status(400).json({msg: "User Does Not Exits"});
            }
            res.json({user});
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
        
    },
    updateUser: async(req,res) => {
        try{
            const {avatar,fullname,mobile,address,story,website,gender} = req.body;
            if(!fullname){
                return res.status(400).json({msg: 'Please add full name'})
                
            }
            await Users.findOneAndUpdate({_id: req.user._id},{
                avatar,fullname,mobile,address,story,website,gender
            })

            res.json({msg: 'Update Successful'});
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    follow: async(req,res) => {
        try{
            const user = await Users.find({_id: req.params.id, followers: req.user._id});
            if(user.length > 0) return res.status(400).json({msg: "You Followed this user"});

            await Users.findByIdAndUpdate({_id: req.params.id},{
                $push: {followers: req.user._id}
            },{new: true});

            await Users.findByIdAndUpdate({_id: req.user._id},{
                $push: {following: req.params.id}
            },{new: true});

            return res.status(200).json({msg: 'User Followed'});

        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
    unfollow: async(req,res) => {
        try{
            

            await Users.findByIdAndUpdate({_id: req.params.id},{
                $pull: {followers: req.user._id}
            },{new: true});

            await Users.findByIdAndUpdate({_id: req.user._id},{
                $pull: {following: req.params.id}
            },{new: true});

            return res.status(200).json({msg: 'User UnFollowed'});

        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    },
}

module.exports = userController;
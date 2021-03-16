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
    }
}

module.exports = userController;
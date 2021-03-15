const Users = require('../models/userModel');

const userController = {
    searchUser: async(req,res) => {
        try {
            const user = await Users.find({username:{$regex: req.query.username}})
            .limit(10).select("fullname username avatar")
            res.json({users})
        } catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = userController;
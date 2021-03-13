const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authController ={
    register: async(req,res) => {
        try{
            const {fullname, username,email, password, gender} = req.body;
            let newUserName = username.toLowerCase().replace(/ /g,'');

            const user_name = await Users.findOne({username: newUserName});
            if(user_name){
                return res.status(400).json({
                    msg: 'Username already exists'
                })
            }
            const user_email = await Users.findOne({email});
            if(user_email){
                return res.status(400).json({
                    msg: 'Email already exists'
                })
            }
            if(password.length < 8){
                return res.status(400).json({
                    msg: "Passwords can't be less length of 8 characters"
                })
            }
            var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if(re.test(password)==false){
                return res.status(400).json({
                    msg: "Passwords must contain at least a symbol, upper and lower case letters and a number"
                })
            }
            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = new Users({
                fullname, username,email, password: passwordHash, gender
            });
            const access_token = createAccessToken({is: newUser._id});
            const refresh_token = refreshAccessToken({is: newUser._id});
            res.cookie('refreshtoken',refresh_token,{
                httpOnly: true,
                path:'/socialapi/refresh_token',
                maxAge: 30*24*60*60*1000
            });

            await newUser.save();

            res.json({
                msg: 'User Registred Succesfully',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })

        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    login: async(req,res) => {
        try{
            const {email, password} = req.body;
            const user = await Users.findOne({email})
            .populate("followers following","-password");
            if(!user){
                return res.status(400).json({msg: 'User with this email does not exist'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg: 'Username or Password Does Not matched'});
            }
            const access_token = createAccessToken({is: user._id});
            const refresh_token = refreshAccessToken({is: user._id});
            res.cookie('refreshtoken',refresh_token,{
                httpOnly: true,
                path:'/socialapi/refresh_token',
                maxAge: 30*24*60*60*1000
            });
            res.json({
                msg: 'User Logged in Succesfully',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })

        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    logout: async(req,res) => {
        try{
            res.clearCookie('refreshToken',{
                path: '/socialapi/refresh_token'
            })
            return  res.json({msg:'Logged Out Successfully'})
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    generateAccessToken: async(req,res) => {
        try{

        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'});
}

const refreshAccessToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});
}

module.exports = authController;
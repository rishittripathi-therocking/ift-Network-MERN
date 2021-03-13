const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const authController ={
    register: async(req,res) => {
        try{
            const {fullname, username,email, password, gender} = req.body;
            res.json({});
            res.json({
                msg: 'Registred'
            })

        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    login: async(req,res) => {
        try{

        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    logout: async(req,res) => {
        try{

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

module.exports = authController;
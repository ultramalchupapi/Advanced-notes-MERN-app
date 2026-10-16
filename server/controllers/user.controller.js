const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signup = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)
        const token = await jwt.sign(user.email, process.env.SECRET)

        res.status(200).json({user: user.email, token})
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    try{
        if(!email || !password){
        throw Error('Fill in all fields')
        }
        const user = await User.login(email, password)
        const token = await jwt.sign(user.email, process.env.SECRET)
        res.status(200).json({user: user.email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    signup,
    login
}
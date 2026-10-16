const User = require('../model/user.model')

const signup = async (req, res) => {
    const {email, password} = req.body
    try{
       const user = await User.signup(email, password)
        res.status(200).json(user)
    }catch(error){
        console.log(error)
        res.status(400).json({error: error})
    }
}

const login = async (req, res) => {
    res.send('login')
}

module.exports = {
    signup,
    login
}
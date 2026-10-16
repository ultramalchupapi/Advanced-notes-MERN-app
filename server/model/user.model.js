const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.statics.signup = async function (email, password) {
    const exist = await this.findOne({ email })

    if (exist) {
        throw Error('Email already exists')
        return
    }



    if (!email.trim && !password.trim) {
        throw Error('Fill in all fields')
    }

    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await this.create({ email: email, password: hash })
        
        return user
    } catch (error) {
        console.log({error: error.message})
    }

}

// userSchema.static.signup()

module.exports = mongoose.model('User', userSchema)
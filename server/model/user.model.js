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
    if(!email || !password){
        throw Error('Fill in all fields')
    }

    const exist = await this.findOne({ email })

    if (exist) {
        throw Error('Email already exists')
        return
    }

    if (!email.trim || !password.trim) {
        throw Error('Fill in all fields')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await this.create({ email: email, password: hash })

        return user
    } catch (error) {
        console.log({ error: error.message })
        throw Error(error.message)
    }

}

userSchema.statics.login = async function (email, password) {
    if (!email.trim || !password.trim) {
        throw Error('Fill in all fields')
    }

    const user = await this.findOne({ email: email })

    if (!user) {
        throw Error("Email doesn't exist")
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')
const validate = require('validator')
const bcrypt = require('bcryptjs')
const ENV = require('../config')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validate.isEmail(email)) {
                throw new Error('Invalid email')
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
            token: {
                type: String,

            }
        }]
})

userSchema.set('toJSON',{
    transform : (doc, ret, options) => {
        const user = new Object(ret)
        delete user.password
        delete user.tokens
        delete user.role
        return user
    }
})

userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 9);
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
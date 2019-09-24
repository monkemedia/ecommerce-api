const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({
          error: 'Invalid email address'
        })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.generateAuthToken = async () => {
  // Genrate an auth token for user
  const user = this
  const token = jwt.sign({
    _id: user._id
  }, process.env.JWT_KEY)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password
  const user = await user.findOne({ email })

  if (!user) {
    throw new Error({
      error: 'Invalid login credentials'
    })
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new Error({
      error: 'Invalid login credentials'
    })
  }

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
  

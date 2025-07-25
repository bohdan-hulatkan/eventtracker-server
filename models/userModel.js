const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    eventCount: { type: Number, default: 0 },
})

const userModel = mongoose.model('User',  userSchema)

module.exports = userModel

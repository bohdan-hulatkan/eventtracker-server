const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const eventModel = mongoose.model('Event',  eventSchema)

module.exports = eventModel

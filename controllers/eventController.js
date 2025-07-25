const eventModel = require('../models/eventModel')
const userModel = require('../models/userModel')

async function createEvent(req, res) {
    try {
        const eventList = await eventModel.find({ user: req.params._id })

        const newStart = new Date(req.body.startDate)
        const newEnd = new Date(req.body.endDate)

        for(const eventItem of eventList) {
            const eventStart = new Date(eventItem.startDate)
            const eventEnd = new Date(eventItem.endDate)

            const existOverlap =
                (newStart >= eventStart && newStart < eventEnd) ||
                (newEnd > eventStart && newEnd <= eventEnd) ||
                (newStart <= eventStart && newEnd >= eventEnd)

            if(existOverlap) {
                res.status(400).json({ err: 'Date already exists' })
                return
            }
        }

        const { name, description, startDate, endDate } = req.body
        const eventItem = await new eventModel({ name, description, startDate, endDate, user: req.params._id }).save()
        const userItem = await userModel.findById(req.params._id)

        userItem.eventCount += 1
        await userItem.save()
        res.status(201).json(eventItem)
    }  catch(err) {
        res.status(400).json({ err: err.message })
    }
}

async function listEvent(req, res) {
    try {
        const eventItems = await eventModel.find({ user: req.params._id })
        res.status(200).json(eventItems)
    }  catch(err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = { createEvent, listEvent }

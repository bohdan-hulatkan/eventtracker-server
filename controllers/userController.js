const userModel = require('../models/userModel')
const eventModel = require("../models/eventModel");

async function createUser(req, res) {
    try {
        const userItem = await new userModel(req.body).save()
        res.status(201).json(userItem)
    } catch(err) {
        res.status(400).json({ err: err.message })
    }
}

async function getUser(req, res) {
    try {
        const userItem = await userModel.findById(req.params._id)
        res.status(200).json(userItem)
    } catch(err) {
        res.status(400).json({ err: err.message })
    }
}

async function listUser(req, res) {
    try {
        const userList = await userModel.find()
        const now = new Date()
        const nextEventDateList = []

        for (const userItem of userList) {
            const eventList = await eventModel.find({ user: userItem._id })

            const futureEvents = eventList
                .map(e => new Date(e.startDate))
                .filter(date => date > now)

            const nextEventDate = futureEvents.length > 0
                ? new Date(Math.min(...futureEvents))
                : 'N/A'

            nextEventDateList.push(nextEventDate)
        }

        const modifiedUsers = userList.map((userItem, index) => ({
            ...userItem.toObject(),
            nextEventStartDate: nextEventDateList[index]
        }))

        res.status(200).json(modifiedUsers)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

module.exports = { createUser, listUser, getUser }

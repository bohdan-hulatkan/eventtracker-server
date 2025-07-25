const express = require('express')
const { createEvent, listEvent } = require('../controllers/eventController')

const eventRouter = express.Router()

eventRouter.post('/:_id/event/create', createEvent)
eventRouter.get('/:_id/event/list', listEvent)

module.exports =  eventRouter

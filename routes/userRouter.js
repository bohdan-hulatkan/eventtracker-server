const express = require('express')
const { createUser, listUser, getUser } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/create', createUser)
userRouter.get('/list', listUser)
userRouter.get('/:_id', getUser)

module.exports = userRouter

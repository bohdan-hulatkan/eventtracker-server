const express = require('express')
const cors = require('cors')
const connectToDatabase = require('./config/db')
const userRouter = require('./routes/userRouter')
const eventRouter = require("./routes/eventRouter");

const app = express()

connectToDatabase()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/user', userRouter)
app.use('/user', eventRouter)

module.exports = app

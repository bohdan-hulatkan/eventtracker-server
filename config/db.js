const mongoose = require('mongoose')

const DATABASE_URL = 'mongodb://127.0.0.1:27017/eventtracker-database'

async function connectToDatabase() {
    try {
        await mongoose.connect(DATABASE_URL)

        console.log('> Database connection successful')
    } catch (err) {
        console.log('> Database connection failed')
    }
}

module.exports = connectToDatabase

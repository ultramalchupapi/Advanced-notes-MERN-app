const dns = require('dns')
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const noteRoutes = require('./routes/notes.routes')
const authRoutes = require('./routes/user.routes');

const app = express()

app.use(express.json())
app.use('/api/user', authRoutes)
app.use('/api/notes', noteRoutes)

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 4000

if (!MONGO_URI) {
    throw new Error('MONGO_URI is missing from the server environment')
}
if (!process.env.SECRET) {
    throw new Error('SECRET is missing from the server environment')
}

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('App is running on port', PORT)
        })
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err)
    })

const dns = require('dns')
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const noteRoutes = require('./routes/notes.routes')
const authRoutes = require('./routes/user.routes');
const requireAuth = require('./middleware/requireAuth');

const app = express()

app.use(express.json())
app.use('/api/user', authRoutes)
app.use('/api/notes', noteRoutes)

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT 

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('App is running on port', PORT)
        })
    })
    .catch((err)=>{
        console.log(err)
    })

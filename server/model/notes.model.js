const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    user_id:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Note', notesSchema)
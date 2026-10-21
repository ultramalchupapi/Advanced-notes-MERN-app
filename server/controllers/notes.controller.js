const Note = require('../model/notes.model')
const mongoose = require('mongoose')

const createNote = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Authentication required' })
    }

    const user_id = req.user._id

    try {
        const note = await Note.create({
            title: req.body.title,
            details: req.body.details,
            user_id: user_id
        })
        res.status(201).json(note)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

const getAllNotes = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Authentication required' })
    }

    const user_id = req.user._id

    try {
        const notes = await Note.find({ user_id }).sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getSingleNote = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Authentication required' })
    }

    const { id } = req.params
    const user_id = req.user._id

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Invalid notes ID')
        }

        const note = await Note.findOne({ _id: id, user_id })

        if(!note){
            return res.status(404).json({error: 'Note not found'})
        }

        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const updateNote = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Authentication required' })
    }

    const {id} = req.params
    const user_id = req.user._id

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error('Invalid notes ID')
        }

        const { title, details } = req.body
        const note = await Note.findOneAndUpdate(
            { _id: id, user_id },
            { title, details },
            { new: true, runValidators: true }
        )

        if(!note){
            return res.status(404).json({error: 'Note not found'})
        }
        res.status(200).json(note)
    }catch(error){
        res.status(400).json({ 'error': error.message})
    }  
}

const deleteNote = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Authentication required' })
    }

    const {id} = req.params
    const user_id = req.user._id

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error('Invalid notes ID')
        }

        const note = await Note.findOneAndDelete({ _id: id, user_id })

        if(!note){
            return res.status(404).json({error: 'Note not found'})
        }

        res.status(200).json(note)
    }catch(error){
        res.status(400).json({ 'error': error.message })
    }
    
}

module.exports = {
    createNote,
    getAllNotes,
    getSingleNote,
    updateNote,
    deleteNote
}
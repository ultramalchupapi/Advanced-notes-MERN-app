const Note = require('../model/notes.model')
const mongoose = require('mongoose')

const createNote = async (req, res) => {
    try {
        const note = await Note.create({ ...req.body })
        res.status(200).json(note)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({}).sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getSingleNote = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Invalid notes ID')
        }

        const note = await Note.findOne({ _id: id })

        if(!note){
            res.status(404).json({error: 'Note not found'})
        }

        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const updateNote = async (req, res) => {
    const {id} = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error('Invalid notes ID')
        }

        const note = await Note.findOneAndUpdate({_id: id}, {...req.body})

        if(!note){
            res.status(404).json({error: 'Note not found'})
        }
        res.status(200).json(note)
    }catch(error){
        res.status(400).json({ 'error': error.message})
    }  
}

const deleteNote = async (req, res) => {
    const {id} = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error('Invalid notes ID')
        }

        const note = await Note.findOneAndDelete({_id: id})

        if(!note){
            res.status(404).json({error: 'Note not found'})
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
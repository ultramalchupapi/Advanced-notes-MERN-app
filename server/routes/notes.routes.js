const express = require('express')
const { createNote, getAllNotes, getSingleNote, updateNote, deleteNote } = require('../controllers/notes.controller')

const router = express.Router()

//CREATE
router.post('/', createNote)

//READ
router.get('/', getAllNotes)

router.get('/:id', getSingleNote)

//UPDATE
router.patch('/:id', updateNote)

//DELETE
router.delete('/:id', deleteNote)


module.exports = router
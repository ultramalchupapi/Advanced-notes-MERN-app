const express = require('express')
const { createNote, getAllNotes, getSingleNote, updateNote, deleteNote } = require('../controllers/notes.controller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

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
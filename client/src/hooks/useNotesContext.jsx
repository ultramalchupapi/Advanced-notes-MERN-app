import { useContext } from "react"
import { NotesContext } from "../context/notesContextProvider"

function useNotesContext() {
    const context = useContext(NotesContext)

    if (!context) {
        throw Error('NotesContext must be used within a NoteContextProvider')
    }

    return context
}

export default useNotesContext

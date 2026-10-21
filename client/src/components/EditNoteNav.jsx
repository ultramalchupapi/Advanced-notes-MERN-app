import api from "../utils/api"
import { ArrowLeft, Trash } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useNotesContext from "../hooks/useNotesContext"
import toast from "react-hot-toast"
import { useState } from "react"

const EditNoteNav = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { dispatch } = useNotesContext()
    const [isLoading, setIsLoading] = useState(false)

    const deleteNote = async () => {
        if (!window.confirm("Do you want to delete this note?")) return

        try {
            setIsLoading(true)
            const { data } = await api.delete(`/api/notes/${id}`)
            dispatch({ type: "DELETE_NOTE", payload: data })
            navigate("/")
            toast.success("Note deleted successfully")
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to delete note")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <nav className="flex justify-around p-5 bg-primary-content">
            <Link to="/" className="flex btn btn-outline text-neutral-content border-neutral-content"><ArrowLeft /> Back to notes</Link>
            <button className="btn btn-error" onClick={deleteNote} disabled={isLoading}>
                {isLoading
                    ? <><span className="loading loading-spinner text-white" /> Deleting...</>
                    : <><Trash /> Delete Note</>
                }
            </button>
        </nav>
    )
}

export default EditNoteNav

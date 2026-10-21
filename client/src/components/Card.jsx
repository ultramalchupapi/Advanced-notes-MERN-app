import api from "../utils/api"
import { Edit, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import useNotesContext from "../hooks/useNotesContext"

const Card = ({ note }) => {
    const { dispatch } = useNotesContext()

    const deleteNote = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (!window.confirm("Do you want to delete this note?")) return

        try {
            const { data } = await api.delete(`/api/notes/${note._id}`)
            dispatch({ type: "DELETE_NOTE", payload: data })
            toast.success("Note deleted successfully")
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to delete note")
        }
    }

    return (
        <Link to={`/${note._id}`} className="card card-md bg-base-100 w-96 shadow-sm bg-info-content p-6 hover:translate-y-[-2px] hover:shadow-gray-900 ease-in duration-300 hover:ease-in-out border-t-2 border-base-content">
            <h1 className="card-title text-secondary-content">{note.title}</h1>
            <p className="card-body text-neutral-content opacity-70">{note.details}</p>
            <div className="flex gap-2 justify-end">
                <Edit className="text-neutral-content hover:translate-y-[-2px] hover:ease-in-out duration-150" />
                <Trash
                    onClick={deleteNote}
                    className="text-error hover:translate-y-[-2px] hover:ease-in-out duration-150"
                />
            </div>
        </Link>
    )
}

export default Card

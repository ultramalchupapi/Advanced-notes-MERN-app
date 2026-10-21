import api from "../utils/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useNotesContext from "../hooks/useNotesContext"
import toast from "react-hot-toast"

const EditNoteCard = () => {
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { dispatch } = useNotesContext()

    useEffect(() => {
        let ignore = false

        const fetchNote = async () => {
            setIsLoading(true)
            try {
                const { data } = await api.get(`/api/notes/${id}`)
                if (!ignore) {
                    setTitle(data.title)
                    setDetails(data.details)
                }
            } catch (error) {
                if (!ignore) {
                    toast.error(error.response?.data?.error || "Failed to load note")
                    navigate("/", { replace: true })
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false)
                }
            }
        }

        fetchNote()
        return () => {
            ignore = true
        }
    }, [id, navigate])

    const submitNote = async () => {
        try {
            setIsSaving(true)
            const { data } = await api.patch(`/api/notes/${id}`, { title, details })
            dispatch({ type: "UPDATE_NOTE", payload: data })
            navigate("/")
            toast.success("Note updated")
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to update note")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return <div className="text-center mt-10">Loading note...</div>
    }

    return (
        <form
            className="flex m-auto mt-20 card bg-success-content p-5 max-w-sm sm:max-w-lg w-full"
            onSubmit={(event) => {
                event.preventDefault()
                submitNote()
            }}
        >
            <h1 className="text-3xl font-bold text-center tracking-tight text-neutral-content pb-4">Edit Note</h1>
            <div>
                <label htmlFor="title">title:</label>
                <input
                    id="title"
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    value={title}
                    className="input outline-none mt-1 focus:border-neutral-content mb-10 w-full"
                    placeholder="e.g My 1st Note"
                />

                <label htmlFor="details">details:</label>
                <textarea
                    id="details"
                    rows={10}
                    required
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                    className="input focus:border-neutral-content outline-none mt-1 mb-3 w-full max-h-60 h-max"
                    placeholder="e.g I want to run a few errands..."
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="btn mt-5 w-fit text-neutral-content bg-info-content border-neutral-content"
                    >
                        {isSaving ? "Updating note..." : "Update Note"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditNoteCard

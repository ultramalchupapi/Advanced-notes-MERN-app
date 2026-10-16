import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useNotesContext from "../hooks/useNotesContext"
import toast from "react-hot-toast"

const EditNoteCard = () => {
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { dispatch } = useNotesContext()

    useEffect(() => {
        try {
            const fetchNote = async () => {
                const response = await axios.get(`/api/notes/${id}`)
                setTitle(response.data.title)
                setDetails(response.data.details)
            }
            fetchNote()
        } catch (error) {
            console.log(error)
        }

    }, [])

    const submitNote = async () => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/notes/${id}`, { title, details })
            const newNotes = await axios.get('/api/notes')
            dispatch({ type: 'SET_NOTES', payload: newNotes.data })
            navigate('/')
            toast.success('Note updated')
        } catch (error) {
            console.log(error)
            toast.error('Failed to update note')
        } finally {
            setIsLoading(false),
            setTitle('')
            setDetails('')
        }

    }



    return (
        <form
            className="flex m-auto mt-20 card bg-success-content p-5 max-w-sm  sm:max-w-lg w-full"
            onSubmit={(e) => {
                e.preventDefault()
                submitNote()
            }}>

            <h1 className="text-3xl font-bold text-center tracking-tight text-neutral-content pb-4">Edit Note</h1>

                <div>
                    <label htmlFor="title">title:</label>
                    <input
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        value={title}
                        className="input outline-none mt-1 focus:border-neutral-content mb-10 w-full" placeholder="e.g My 1st Note"
                    />

                    <label htmlFor="details">details:</label>
                    <textarea
                        id="details"
                        rows={10}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="input focus:border-neutral-content outline-none mt-1 mb-3 w-full max-h-60 h-max" placeholder="e.g I want to run a few errands..."
                    />

                    <div className="flex justify-end">
                        <button
                            disabled={isLoading}
                            className="btn mt-5 w-fit text-neutral-content bg-info-content border-neutral-content">
                            {isLoading ? 'Updating note...' : 'Update Note'}
                        </button>
                    </div>
                </div>

        </form>
    )
}

export default EditNoteCard

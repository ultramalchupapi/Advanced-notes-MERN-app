import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import useNotesContext from "../hooks/useNotesContext"

const CreateNoteCard = () => {
  const { dispatch } = useNotesContext()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const createForm = async () => {
    try {
      setIsLoading(true)
      const note = await axios.post('/api/notes', { title, details })
      dispatch({ type: 'CREATE_NOTE', payload: note.data })
      toast.success('Note created successfully')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Failed to create note')
    } finally {
      setIsLoading(false)
      setTitle('')
      setDetails('')
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      createForm()
      }}
      className='flex m-auto mt-20 card bg-success-content p-5 max-w-sm  sm:max-w-lg w-full'
    >
      <h1 className="text-3xl font-bold text-center tracking-tight text-neutral-content pb-4">Create Note</h1>
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
        required
        rows={10}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="input focus:border-neutral-content outline-none mt-1 mb-3 w-full max-h-64 h-max" placeholder="e.g I want to run a few errands..."
      />

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          className="btn mt-5 w-fit text-neutral-content bg-info-content border-neutral-content">
          {isLoading ? 'Saving note...' : 'Save Note'}
        </button>
      </div>
    </form>
  )
}

export default CreateNoteCard
  
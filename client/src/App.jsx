import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import CreateNote from "./pages/CreateNote"
import EditNote from "./pages/EditNote"
import { useEffect, useState } from "react"
import axios from "axios"
import useNotesContext from "./hooks/useNotesContext.jsx"

function App() {
  const { notes, dispatch } = useNotesContext()
  const [isloading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      const fetchNotes = async () => {
        setIsLoading(true)
        const response = await axios.get('/api/notes')
        dispatch({ type: 'SET_NOTES', payload: response.data })
      }
      fetchNotes()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }
    , [dispatch])

  return (
    <div data-theme="coffee" className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home notes={notes} isloading={isloading} />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/:id" element={<EditNote />} />
      </Routes>
    </div>
  )
}

export default App

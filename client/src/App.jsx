import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import Home from "./pages/Home"
import CreateNote from "./pages/CreateNote"
import EditNote from "./pages/EditNote"
import { useEffect, useState } from "react"
import api from "./utils/api"
import useNotesContext from "./hooks/useNotesContext.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import { useAuthContext } from "./hooks/useAuthContext.jsx"

function App() {
  const { notes, dispatch } = useNotesContext()
  const [isLoading, setIsLoading] = useState(false)
  const { user, dispatch: authDispatch } = useAuthContext()

  useEffect(() => {
    let ignore = false

    if (!user?.token) {
      dispatch({ type: "SET_NOTES", payload: [] })
      return () => {
        ignore = true
      }
    }

    const fetchNotes = async () => {
      setIsLoading(true)
      try {
        const { data } = await api.get("/api/notes")
        if (!ignore) {
          dispatch({ type: "SET_NOTES", payload: data })
        }
      } catch (error) {
        if (ignore) return
        if (error.response?.status === 401) {
          localStorage.removeItem("token")
          localStorage.removeItem("email")
          authDispatch({ type: "LOGOUT" })
        } else {
          toast.error(error.response?.data?.error || "Failed to load notes")
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchNotes()
    return () => {
      ignore = true
    }
  }, [authDispatch, dispatch, user?.token])

  return (
    <div data-theme="coffee" className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={user ? <Home notes={notes} isLoading={isLoading} /> : <Navigate to="/signup" />} />
        <Route path="/create" element={user ? <CreateNote /> : <Navigate to="/signup" />} />
        <Route path="/:id" element={user ? <EditNote /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App

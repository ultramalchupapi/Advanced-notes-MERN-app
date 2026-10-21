import { ArrowLeft, LogOut, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const NoteNav = () => {
  const { user, dispatch } = useAuthContext()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    dispatch({ type: "LOGOUT" })
  }

  return (
    <nav className="flex bg-primary-content p-5 justify-around items-center sticky top-0">
      <Link to="/" className="flex btn btn-outline text-neutral-content border-neutral-content"><ArrowLeft /> Back to notes</Link>
      <div className="dropdown dropdown-end">
        <button type="button" className="btn text-secondary-content">
          <Mail /> {user?.email || "Account"}
        </button>
        <ul tabIndex={0} className="dropdown-content menu z-10 mt-2 w-52 rounded-box bg-base-100 p-2 shadow-sm">
          <li>
            <button type="button" onClick={logout} className="text-error">
              <LogOut size={18} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NoteNav

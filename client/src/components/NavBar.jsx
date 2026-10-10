import { LogOut, Mail, Paperclip, PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header className="sticky top-0 z-20 bg-primary-content flex justify-between md:justify-around p-6 text-center">
            <Link to="/" className="text-secondary-content text-4xl font-semibold flex md:my-auto tracking-tighter"><Paperclip /> PaperClip</Link>
            <div className="flex flex-col gap-1 md:flex-row ">
                <Link to="/create" className="flex btn btn-soft text-secondary-content"><PlusIcon />Create Note</Link>
                <div className="dropdown dropdown-end">
                    <button className="btn text-secondary-content">
                        <Mail /> lesego@gmail.com
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu z-10 mt-2 w-52 rounded-box bg-base-100 p-2 shadow-sm">
                        <li>
                            <button type="button" className="text-error">
                                <LogOut size={18} /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </header>
    )
}

export default NavBar

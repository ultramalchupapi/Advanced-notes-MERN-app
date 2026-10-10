import { ClipboardList, Plus } from "lucide-react"
import { Link } from "react-router-dom"

const NoNotes = () => {
  return (
    <div className="col-span-full flex min-h-[60vh] w-full flex-col items-center justify-center text-center">
      <ClipboardList className="scale-200 m-10"/>
      <h1 className="text-3xl mb-2">No notes found</h1>
      <p className="text-neutral-content  text-xs mb-5"> Notes will be displayed here</p>
      <Link to="/create" className="btn"><Plus/> Create first Note</Link>
    </div>
  )
}

export default NoNotes

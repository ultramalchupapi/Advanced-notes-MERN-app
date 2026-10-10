import CreateNoteCard from "../components/CreateNoteCard"
import NoteNav from "../components/CreateNoteNav"

const CreateNote = () => {
  return (
    <div>
      <NoteNav/>
      <main className="flex items-center justify-center">
        <CreateNoteCard/>
      </main>
      
    </div>
  )
}

export default CreateNote

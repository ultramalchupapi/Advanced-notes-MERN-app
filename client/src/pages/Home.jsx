import Card from "../components/Card"
import NavBar from "../components/NavBar"
import NoNotes from "../components/NoNotes"

const Home = ({notes, isLoading}) => {
  return (
    <div className="relative">
        <NavBar/>
        <main className="mx-auto mt-6 grid w-full xl:max-w-7xl grid-cols-1 justify-items-center gap-4 md:max-w-4xl px-4 md:grid-cols-2 xl:grid-cols-3">   
            {isLoading && <span className="loading loading-spinner loading-sm"></span>}

            {notes.length > 0 && !isLoading && notes.map((note) => <Card key={note._id} note={note} />)}
            {notes.length === 0 && !isLoading && <NoNotes />}
            
        </main>
    </div>
  )
}

export default Home

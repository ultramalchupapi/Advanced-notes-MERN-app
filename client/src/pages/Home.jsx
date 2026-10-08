import Card from "../components/Card"
import NavBar from "../components/NavBar"

const Home = () => {
  return (
    <div>
        <NavBar/>
        <main className="mx-auto mt-6 grid w-full xl:max-w-7xl grid-cols-1 justify-items-center gap-4 md:max-w-4xl px-4 md:grid-cols-2 xl:grid-cols-3">        
            <Card/>
            <Card/>
            <Card/>
        </main>
    </div>
  )
}

export default Home

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateNote from "./pages/CreateNote"
import EditNote from "./pages/EditNote"
import NavBar from "./components/NavBar"


function App() {
  return (
   
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreateNote/>}/>
        <Route path="/:id" element={<EditNote/>}/>
      </Routes>
    
    </BrowserRouter>
  
  )
}

export default App

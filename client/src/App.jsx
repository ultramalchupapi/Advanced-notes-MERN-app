import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateNote from "./pages/CreateNote"
import EditNote from "./pages/EditNote"

function App() {
  return (
   
    <BrowserRouter>
    <div data-theme="coffee" className="h-screen">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreateNote/>}/>
        <Route path="/:id" element={<EditNote/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  
  )
}

export default App

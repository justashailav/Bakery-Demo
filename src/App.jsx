import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Menu from "./Pages/Menu"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/menu" element={<Menu/>}/>
    </Routes>
  )
}

export default App

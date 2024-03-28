import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
function App() {


  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
     <Route path='/cart'>
    
     </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App

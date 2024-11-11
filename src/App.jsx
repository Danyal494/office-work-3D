import { useState } from 'react'
import './App.css'
import Topbar from './Topbar'
import { Route, Routes } from 'react-router-dom'
import TaskTwo from './Components/TaskTwo'
import TaskThree from './Components/TaskThree'
import TaskFour from './Components/TaskFour'



function App() {
 

  return (

 <div className="relative bg-black h-screen ">
<Topbar/>
<Routes>
  <Route path='/' element={<TaskTwo/>}/>
  <Route path='/box2' element={<TaskThree/>}/>
  <Route path='/box3' element={<TaskFour/>}/>
 
</Routes>
 </div>

  )
}

export default App

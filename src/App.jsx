import { useState } from 'react'
import './App.css'
import Topbar from './Topbar'
import { Route, Routes } from 'react-router-dom'
import TaskOne from './Components/TaskOne'
import TaskTwo from './Components/TaskTwo'
import TaskThree from './Components/TaskThree'
import TaskFour from './Components/TaskFour'
import TaskFive from './Components/TaskFive'
import TaskSix from './Components/TaskSix/taskSix'

function App() {
 

  return (

 <div className="relative">
<Topbar/>
<Routes>
  <Route path='/' element={<TaskOne/>}/>
  <Route path='/box2' element={<TaskTwo/>}/>
  <Route path='/box3' element={<TaskThree/>}/>
  <Route path='/box4' element={<TaskFour/>}/>
  <Route path='/box5' element={<TaskFive/>}/>
  <Route path='/box6' element={<TaskSix/>}/>
</Routes>
 </div>

  )
}

export default App

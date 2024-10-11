import React, { useState } from 'react'
import BSPhere from './BSPhere'
import Btn from './Btn'
import ITask from './ITask'
import NewSphere from './BSPhere'



const TaskSix = () => {
    
        const [open, setOpen] = useState(true)
      
        const handleBtn = () =>{
          setOpen(false)
        }
  return (
    <div className='bg-[#42A5F5]' style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {open ? <Btn endLoading={handleBtn}/> : <NewSphere style={{ position: "absolute", top: 20, left: 0, zIndex: 10 }}/> }
     
      <ITask style={{ position: "absolute", top: 0, left: 0, zIndex: 5 }}/>
    </div>
  )
}

export default TaskSix
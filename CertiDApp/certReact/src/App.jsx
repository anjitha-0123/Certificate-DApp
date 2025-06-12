import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import IssuePage from './pages/IssuePage'
import ViewCertificate from './pages/ViewCertificate'


const App = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/issue' element={<IssuePage />} />
        <Route path='/view-certificate/:id' element={<ViewCertificate />} />
     </Routes>

    </BrowserRouter>
  )
}

export default App
import React from 'react'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import { EventProvider } from './eventContext'
import Upload from './Upload'


export default function Header() {

  return (
    <div>
          <EventProvider>
            <NavBar/>
            <Home/>
          </EventProvider>
       
    </div>
  )
}
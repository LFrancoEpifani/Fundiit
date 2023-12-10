import React, {useState} from 'react'
import NavBar from './components/NavBar/NavBar'
import { EventProvider } from './eventContext'
import PublicationModal from './components/PublicationModal/PublicationModal'
import Card from './components/Card/Card'

export default function Flyers() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='h-screen'>
        <EventProvider>
          <Card/>
          {isModalOpen && (
            <PublicationModal setIsModalOpen={() => setIsModalOpen(true)}/>
          )}
        </EventProvider>
    </div>
  )
}


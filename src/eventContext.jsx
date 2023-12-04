import React, { createContext, useState, useEffect } from 'react';
import { fetchEvents, addEvent } from './eventHelpers';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {

  const [events, setEvents] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urlImage: '',
    price: '',
    ubication: '',
    date: '',
    time: ''
  });
  

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(error => {
        console.error("Error al obtener eventos:", error);
      });
  }, []);

  const handleAddEvent = (newEvent) => {
  addEvent(newEvent).then(addedEvent => {
    // Aquí, asumo que `addedEvent` es el evento devuelto por el backend
    setEvents(prevEvents => [...prevEvents, addedEvent]);
  });
};


const eventContextValue = {
  events,
  setEvents,
  formData,
  setFormData,
  handleAddEvent,
  imageUrls,
  setImageUrls,
};

  return (
    <EventContext.Provider value={eventContextValue}>
      {children}
    </EventContext.Provider>
  );
};

import { useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { EventContext } from '../../eventContext';
import { deleteEvent } from "../../eventHelpers";
import { useTranslation } from "react-i18next";
import PublicationModal from "../PublicationModal/PublicationModal";
import NavBar2 from "../NavBar/Navbar2";



export default function Card({token}) {

  const {t} = useTranslation();

  const [isFlipped, setIsFlipped] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const { events, setEvents } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openMenuEventId, setOpenMenuEventId] = useState(null);
  
  
const handleDelete = (event) => {
  deleteEvent(event)
    .then(() => {
      setEvents(currentEvents => currentEvents.filter(e => e.id !== event.id));
      window.location.reload();
    })
    .catch(error => {
      console.error('Error al borrar el evento:', error);
    });
};
 

  
  function formatDate(dateString) {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const dateParts = dateString.split('-'); 
    const month = months[parseInt(dateParts[1], 10) - 1]; 
    const day = parseInt(dateParts[2], 10);

    return `${day} de ${month}`;
  }

  const compareEvents = (event1, event2) => {
    const date1 = new Date(event1.date + ' ' + event1.time);
    const date2 = new Date(event2.date + ' ' + event2.time);

    return date1 - date2;
  };

 
  
  const toggleDropdown = (eventId) => {
    setOpenMenuEventId(prevEventId => prevEventId === eventId ? null : eventId);
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
  };

  const closeEditModal = () => {
    setSelectedEvent(null);
  };

  return (  
    <div className="text-center bg-flyers">
      <div className="fixed z-20 bottom-0 w-full text-white">
       < NavBar2/>
      </div>
      <div className="">
      <div className="flex items-center">
      <Icon icon="mi:search" className="text-xl text-gray-600 absolute top-28 right-28"/>
<select className="custom-select indent-1 my-4 mx-2 shadow-xl border border-black text-gray-600 h-11 w-95 m-auto rounded-full bg-opacity-90 px-3"

  value={categoriaSeleccionada}
  onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
  <option value="Todos">
    {t('options')}
    </option>
  <option value="musica">{t('music')}</option>
  <option value="baile">{t('dance')}</option>
  <option value="literatura">{t('literature')}</option>
  <option value="alternativo">{t('alternative')}</option>
  <option value="teatro">{t('teatro')}</option>
  <option value="arte">{t('art')}</option>
</select>

      </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold uppercase"></h2>
      </div>
      <div className="flex flex-wrap justify-center items-center">
     {events
          .sort(compareEvents).filter(event => categoriaSeleccionada === "Todos" || event.category === categoriaSeleccionada)
          .map((event) => (
            <div key={event.id} className="card z-10">
              <Icon onClick={() => setIsFlipped(!isFlipped)} className="flip-icon text-blue-900" icon="mi:switch" />
              <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
                <div
                  className="card-front text-white"
                  style={{ backgroundImage: `url(${event.urlImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="bg-black absolute bottom-0 w-full p-3 flex justify-center items-center rounded-b-md">
                    <h2 className="text-white font-bold uppercase text-center text-lg">{event.title}</h2>
                  </div>
                 
                
                     <Icon 
                     onClick={() => toggleDropdown(event.id)}
                    className="absolute top-8 left-8 text-orange-900 bg-white w-5 h-9 rounded-full bg-opacity-80"
                    icon="mdi:dots-vertical" 
                  />
                  
                  {openMenuEventId === event.id && (
                    <div className="absolute left-10 top-30 w-56 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <div className="flex justify-center items-center gap-2">
                                <button  className="flex justify-center items-center gap-2" onClick={() => handleDelete(event.id)}>
                                     {t('delete')}
                                     <Icon className="w-5 h-5" icon="ph:trash" color="red" />
                                </button>
                            </div>
                        </a>
                    </div>
                </div>
                 )}
    {selectedEvent && (
        <PublicationModal 
          setOpenPublicationModal={closeEditModal} 
          event={selectedEvent} 
          closeEditModal={() => setSelectedEvent(null)}
        />
      )}
                </div>
                <div
                onClick={() => setIsFlipped(!isFlipped)}
                  className="card-back text-white"
                  style={{ backgroundImage: `url(${event.urlImage})` }}
                >
                  <div className="text-center gap-2 flex justify-between items-center m-4">
                    <p className="text-md -tracking-tight text-white font-bold">{formatDate(event.date)}</p> 
                  </div>
                  <div className="mt-12 text-lg font-bold uppercase text-center">
                    <h3 className="">{event.title}</h3>
                  </div>
                  <div className=" m-4 text-md font-light">
                    <p className="descripction">{event.description}</p>
                  </div>
                  <div className="flex justify-between m-4 text-md">
                    <p>{event.time}hs</p>
                    <p className="capitalize" style={{ color: event.price === 0 ? '#16FF00' : '' }}>
                      {event.price === 0 ? 'Gratis' : `${event.price} €`}
                    </p>
                  </div>
                  <div className="text-center gap-2 flex justify-center items-center m-4">
                    <Icon className="text-xl" icon="gis:location-poi" color="red" />
                    <p className="ubication text-md -tracking-tight">{event.ubication}</p>
                  </div>
                  <div className="flex justify-between items-center m-8 text-lg">
                    <button>
                      <Icon icon="ic:baseline-facebook" color="white" />
                    </button>
                    <button>
                      <Icon icon="mdi:twitter" color="white" />
                    </button>
                    <button>
                      <Icon icon="mdi:instagram" color="white" />
                    </button>
                    <button>
                      <Icon icon="ic:baseline-whatsapp" color="white" />
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    
  );
}
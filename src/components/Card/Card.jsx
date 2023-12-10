import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { EventContext } from '../../eventContext';
import { deleteEvent } from "../../eventHelpers";
import { useTranslation } from "react-i18next";
import PublicationModal from "../PublicationModal/PublicationModal";
import NavBar2 from "../NavBar/Navbar2";
import { useAuth0 } from "@auth0/auth0-react";
import F from '../../assets/FFun.png'


export default function Card() {

  const {t} = useTranslation();

  const [isFlipped, setIsFlipped] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const { events, setEvents } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openMenuEventId, setOpenMenuEventId] = useState(null);

  

  const handleDelete = (id) => {
    deleteEvent(id)
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

  const {user, isAuthenticated} = useAuth0();
  
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
    <div className="text-center">
      {isAuthenticated && (
        <div className="flex items-center justify-between m-3 gap-1">
          <img className="w-9 h-9 rounded-full border border-gray" src={user.picture} alt="" />
        </div>
      )}
      <div className="bg-white fixed z-20 bottom-0 w-full">
       < NavBar2/>
      </div>
      <div className="">
      <Icon icon="mi:search" className={`text-xl text-gray-600${isAuthenticated ? " absolute top-89 right-22" : " absolute top-29 right-22"}`}/>
<select className="custom-select my-4 border-2 border-gray-400 text-gray-600 h-11 w-95 rounded-full bg-opacity-90 px-3"
  value={categoriaSeleccionada}
  onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
    
  <option value="Todos">
    {t('options')}
    </option>
  <option value="musica">{t('music')}</option>
  <option value="arte">{t('art')}</option>
  <option value="baile">{t('dance')}</option>
  <option value="literatura">{t('literature')}</option>
  <option value="alternativo">{t('alternative')}</option>
  <option value="teatro">{t('teatro')}</option>
</select>
      </div>
      <div>
        <h2 className="text-2xl font-bold uppercase">Barcelona</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center">
     {events
          .sort(compareEvents).filter(event => categoriaSeleccionada === "Todos" || event.category === categoriaSeleccionada)
          .map((event) => (
            <div key={event.id} className="card">
              <Icon onClick={() => setIsFlipped(!isFlipped)} className="flip-icon text-blue-900" icon="mi:switch" />
              <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
                <div
                  className="card-front text-white"
                  style={{ backgroundImage: `url(${event.urlImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="bg-black absolute bottom-0 w-full p-3 flex justify-center items-center rounded-b-md">
                    <h2 className="text-white font-bold uppercase text-center text-lg">{event.title}</h2>
                  </div>
                 {isAuthenticated && (
                   <Icon 
                   onClick={() => toggleDropdown(event.id)}
                  className="absolute top-8 left-8 text-orange-900 bg-white w-5 h-9 rounded-full bg-opacity-80"
                  icon="mdi:dots-vertical" 
                />
                 )}
                
                  {openMenuEventId === event.id && (
                    <div className="absolute left-3 top-10 w-56 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                       <span className="flex justify-center items-center gap-2">
                       <button onClick={() => handleEditClick(event)}>
                     {t('edit')}
                     </button>
                       </span>
                   </a>
                        <a href="#" className="block  px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <span className="flex justify-center items-center gap-2">
                                <button onClick={() => handleDelete(event)}>
                                     {t('delete')}
                                </button>
                            </span>
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
                    <p className="capitalize" style={{ color: event.price === 0 ? 'inherit' : '' }}>
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
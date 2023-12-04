
import React, { useContext, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { addEvent, fetchEvents,  } from "../../eventHelpers"; 
import { useTranslation } from "react-i18next";
import { EventContext } from "../../eventContext";
import { imageDb } from '../../Config'
import { getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'


export default function PublicationModal({ setOpenPublicationModal, event }) {

  const [eventCreated, setEventCreated] = useState(false); 
  const { t } = useTranslation();
  const { setEvents } = useContext(EventContext);
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
  const [isUpload, setIsUpload] = useState(null);

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const handleImageUpload = async () => {
    if (!isUpload) return Promise.resolve(''); // Retornar una URL vacía si no hay imagen.
    const imgRef = ref(imageDb, `files/uploads${v4()}`);
    const snapshot = await uploadBytes(imgRef, isUpload);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const handleAddEvent = (newFormData) => {
    addEvent(newFormData)
      .then(newEvent => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
     
        setEventCreated(true);
        
        setTimeout(() => {
          setEventCreated(false);
          setOpenPublicationModal(false);
        }, 300);
        // ... restablece tu formulario aquí
        
        setFormData({
          title: '',
          description: '',
          category: '',
          urlImage: '',
          price: '',
          ubication: '',
          date: '',
          time: ''
        });
      })
  };

  const today = new Date().toISOString().split('T')[0];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
    const newFormData = { ...formData, urlImage: imageUrl };
    handleAddEvent(newFormData);
  };


  return (
    <div className="fixed inset-0 bg-gray-500 flex justify-center items-center z-10">
    <div className="relative rounded-lg shadow-2xl w-full h-full bg-white flex">
    {eventCreated && (
        <div className="absolute top-40 bg-green-200 border-green-600 text-green-600 border-l-4 p-4" role="alert">
          <p className="font-bold">
            {t('exito')}
          </p>
          <p>
            {t('upload')}
          </p>
        </div>
      )}

      <div className="form-container border-l border-gray-300 p-5">
        <button
          onClick={() => setOpenPublicationModal(false)}
          className="absolute top-0 right-0 m-2"
        >
          <Icon className="text-3xl" icon="ic:baseline-close" />
        </button>
        <h2 className="font-bold text-center m-2 text-lg">{t('create')}</h2>
        <hr/>
        
        <form onSubmit={handleSubmit} className="uppercase formulario font-bold">
          <div className="my-4">
            <div className="flex flex-col justify-center items-center">
              <label className="m-2 sm:text-center">{t('title')}</label>
              <input
                className="sm:w-40 p-2 w-72 h-10 rounded m-1 border-2 border-gray-200"
                type="text"
                name="title"
                placeholder="Nombre del evento"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="m-2 sm:text-center">{t('adress')}</label>
              <input
                className="sm:w-40 p-2 w-72 h-10 rounded m-1 border-2 border-gray-200"
                type="text"
                name="ubication"
                placeholder="Calle 123"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center">
            <div className="grid grid-cols-1 gap m-2">
              <label className="m-2 sm:text-center">{t('date')}</label>
              <input
                className="sm:w-24 p-2 w-44 h-10 rounded m-1 border-2 border-gray-200"
                type="date"
                name="date"
                min={today}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="m-2  sm:text-center">{t('price')}</label>
              <input
                className="sm:w-24 p-2 w-44 h-10 rounded m-1 border-2 border-gray-200"
                type="number"
                name="price"
                placeholder="0€"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="m-2  sm:text-center">{t('schedule')}</label>
              <input
                className="sm:w-24 sm:m-2 p-2 w-44 h-10 rounded m-1 border-2 border-gray-200"
                type="time"
                name="time"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center">
              <label className="text-center m-2">{t('category')}</label>
              <select
                name="category"
                onChange={handleInputChange}
                className="w-32 h-10 rounded border-2 border-gray-200"
              >
                <option className="" value="musica">Música</option>
                <option className="" value="arte">Arte</option>
                <option className="" value="alternativo">Alternativo</option>
                <option className="" value="teatro">Teatro</option>
                <option className="" value="baile">Baile</option>
                <option className="" value="literatura">Literatura</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="m-2 text-center">{t('description')}</label>
              <input
                className="sm:w-40 w-72 h-10 rounded m-1 border-2 border-gray-200 description"
                type="text"
                name="description"
                minLength="100"
                maxLength="150"
                placeholder="Descripción del evento"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
                <input type="file" onChange={(e) => setIsUpload(e.target.files[0])}/>
            </div>
          <div>
          <button onClick={handleSubmit} type="submit" className="mt-5 py-2 px-4 flex justify-center items-center bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
              <svg width="20" height="20" className="mr-2" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
                  </path>
              </svg>
              {t('create')}
          </button>
        </div>
   
      

            
          </div>
    </form>
      </div>
      </div>
  </div>
);
};
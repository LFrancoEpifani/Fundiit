import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import F from '../../assets/FFun.png'
import PublicationModal from "../PublicationModal/PublicationModal";
import i18n from "../../i18n"; // Asegúrate de importar tu instancia de i18n
import { useTranslation } from "react-i18next";




export default function NavBar() {

  


  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsLenguage(language === "es");
  };


  const [isLenguage, setIsLenguage] = useState();
  const [menuBurger, setMenuBurger] = useState(false);
  const [openPublicationModal, setOpenPublicationModal] = useState(false);

  const hiddenBurger = () => {
    setMenuBurger(!menuBurger);
  };

  const {t} = useTranslation();

  return (
    <div className='bg-black bg-opacity-0'>
      <div className="flex justify-between items-center px-4 py-2">
        <Link to={"/"}>
          <img className="w-9 h-11 mt-2 p-1" src={F} alt="" />
        </Link>
        {!menuBurger && ( // Muestra el botón solo si menuBurger es falso
          <button onClick={hiddenBurger}>
            <Icon className="text-3xl" icon="ic:baseline-menu" color="black"/>
          </button>
        )}  
      </div>

  
      {menuBurger && (
        <div className="fixed top-0 left-0 h-full w-3/4 bg-white p-3 transition-all duration-300 z-20">
          <div className="flex flex-col items-start gap-3 font-bold my-6">
            <button onClick={hiddenBurger}>
            <Icon className="absolute top-10 right-10 text-2xl" icon="carbon:close-outline"/>
            </button>
           
                <div className="flex items-end justify-center gap-2">
                <Icon className="w-9 h-9 bg-gray-400 rounded-full p-1" icon="pepicons-pencil:photo-camera-off" color="white" />
                <p>Usuario</p>
              </div>
           

         
             <div className="flex items-end gap-2">
               
             </div>

            

            <Link to={"/"} className="my-4 flex items-center">
              <Icon className="w-6 h-6 xl:w-7 xl:h-7 mr-2" icon="lucide:home" />
              {t('home')}
            </Link>
            <Link to={"/flyers"} className="mb-4 flex items-center">
              <Icon className="w-6 h-6 xl:w-7 xl:h-7 mr-2" icon="ic:outline-event" />
              {t('events')}
            </Link>
            <button onClick={() => setOpenPublicationModal(true)} className="mb-4 flex items-center">
              <Icon className="w-6 h-6 xl:w-7 xl:h-7 mr-2" icon="ph:plus-fill" />
              {t('creating')}
            </button>
            <button onClick={() => changeLanguage(isLenguage ? "en" : "es")} className="mb-4 flex items-center">
              <Icon className="w-6 h-6 xl:w-6 xl:h-6 mr-2" icon="tabler:world" />
              {t('lenguage')}
            </button>
           
              
         
          
              <div className="flex items-center justify-center gap-2 absolute bottom-10">
                <Icon className="w-5 h-5" icon="mingcute:power-fill" color="red" />
                {t('close')}
              </div>
           
          </div>
        </div>
      )}
  
      {openPublicationModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30">
          {/* Aquí tu componente PublicationModal */}
          <PublicationModal setOpenPublicationModal={setOpenPublicationModal} />
        </div>
      )}
    </div>
  );
  
  
}

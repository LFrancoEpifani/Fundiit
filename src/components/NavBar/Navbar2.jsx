import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import F from '../../assets/FFun.png'
import PublicationModal from "../PublicationModal/PublicationModal";
import i18n from "../../i18n"; // Asegúrate de importar tu instancia de i18n
import { useTranslation } from "react-i18next";




export default function NavBar2() {


  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsLenguage(language === "es");
  };


  const [isLenguage, setIsLenguage] = useState();
  const [menuBurger, setMenuBurger] = useState(false);
  const [openPublicationModal, setOpenPublicationModal] = useState(false);


  const {t} = useTranslation();

  return (
    <div className='bg-opacity-70 bg-black'>
      <div className="flex justify-around items-center px-4 py-4">
            <Link to={"/home"} className="flex items-center">
              <Icon className="w-6 h-6 xl:w-7 xl:h-7 mr-2" icon="lucide:home" color="white" />
            </Link>
            <Link to={"/flyers"} className="flex items-center">
              <Icon className="w-6 h-6 xl:w-7 xl:h-7 mr-2" icon="ic:outline-event" color="white" />
            </Link>
            <button onClick={() => setOpenPublicationModal(true)} className="flex items-start">
              <Icon className="w-6 h-6 xl:w-7 xl:h-7" icon="ph:plus-fill" color="white" />
            </button>
            <button onClick={() => changeLanguage(isLenguage ? "en" : "es")} className="flex items-center">
              <Icon className="w-6 h-6 xl:w-7 xl:h-7" icon="tabler:world" color="white" />
            </button>
          
              <button className="flex items-end justify-end">
              <Icon className="w-6 h-6 xl:w-6 xl:h-6 mr-2" icon="mingcute:user-4-fill" />
            </button>
            
            
      </div>

  
      {menuBurger && (
        <div className="fixed top-0 left-0 h-full w-3/4 bg-white p-3 transition-all duration-300 z-20">
          <div className="flex flex-col items-start gap-3 font-bold my-6">
            
              
                <div className="flex items-end justify-center gap-2">
                <Icon className="w-9 h-9 bg-gray-400 rounded-full p-1" icon="pepicons-pencil:photo-camera-off" color="white" />
                <p>Usuario</p>
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

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import F from '../../assets/FFun.png'
import PublicationModal from "../PublicationModal/PublicationModal";
import i18n from "../../i18n"; // Asegúrate de importar tu instancia de i18n
import { useTranslation } from "react-i18next";
import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";
import { useAuth0 } from "@auth0/auth0-react";



export default function NavBar() {

  const {user, isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    <div>
      <button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
          </path>
        </svg>
        Loading
    </button>
    </div>
  }

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
            <Icon className="absolute top-3 right-3 text-2xl" icon="carbon:close-outline"/>
            </button>
              {!isAuthenticated && (
                <div className="flex items-end justify-center gap-2">
                <Icon className="w-9 h-9 bg-gray-400 rounded-full p-1" icon="pepicons-pencil:photo-camera-off" color="white" />
                <p>Usuario</p>
              </div>
              )}

            {isAuthenticated &&(
             <div className="flex items-end gap-2">
               <img className="w-9 h-9 rounded-full" src={user.picture} alt={user.name} />
                <p>{user.name}</p>
             </div>

            )}

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
            {!isAuthenticated &&(
              <div className="flex items-start justify-center gap-1">
              <Login/>
              {t('user')}
            </div>
            )}
            {isAuthenticated && (
              <div className="flex items-center justify-center absolute bottom-2">
                <Logout/>
                {t('close')}
              </div>
            )}
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

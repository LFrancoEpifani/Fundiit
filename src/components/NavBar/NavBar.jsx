import React, { useState } from 'react'
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';
import PublicationModal from '../PublicationModal/PublicationModal';
import i18n from '../../i18n'; // Asegúrate de importar tu instancia de i18n

export default function NavBar() {

  
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsLenguage(language === "es");
  };

  const [isLenguage, setIsLenguage] = useState();
  
  const [openPublicationModal, setOpenPublicationModal] = useState(false);

  return (
    <div>
        <div className='flex justify-around items-center p-3'>
           <Link to={"/"}>
           <h2 className='logo flex items-center justify-center text-xl'>F<span className='logo-secundario text-xl'>undit</span></h2>
           </Link>
            <div className='flex items-center justify-center gap-2'>
                <Link to={"/"}>
                  <Icon className='w-6 h-6' icon="mdi:home" />
                </Link>
                <Link to={"/flyers"}>
                    <Icon className='w-6 h-6' icon="ic:outline-event" />
                </Link>
                  <Icon onClick={() => setOpenPublicationModal(true)} className='w-6 h-6' icon="ph:plus-fill" color='black'/>

              {openPublicationModal && (
                <div>
                  <PublicationModal setOpenPublicationModal={setOpenPublicationModal}/>
                </div>
            )}

      {isLenguage ? (
        <button onClick={() => changeLanguage('en')}>
          <Icon className='w-5 h-5 lg:w-7 lg:h-7' icon="fluent-mdl2:world" color="black"/> 
        </button>
      )
      :
      (
        <button onClick={() => changeLanguage('es')}>
          <Icon className='w-5 h-5 lg:w-7 lg:h-7' icon="fluent-mdl2:world" color="black"/> 
        </button>
      )}

    
                                   
               
                
                  <Icon className='w-6 h-6' icon="mingcute:user-4-fill" />

            </div>
        </div>
    </div>

  )
};
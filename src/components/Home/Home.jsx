import React, {useState, useEffect} from 'react'
import Flyer from '../../assets/bgHd.png'
import { Link } from 'react-router-dom'
import PublicationModal from '../PublicationModal/PublicationModal'
import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar/NavBar';

export default function Home({token}) {

  const [openPublicationModal, setOpenPublicationModal] = useState(false);
  const { t } = useTranslation();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/fundit/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Si la respuesta es exitosa, tratamos el cuerpo como texto
        const responseData = await response.text();
        setData(responseData);
      } else {
        // Si hay un error, manejamos el error y mostramos el mensaje
        const errorData = await response.text();
        setError(errorData);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);


  return (
    <div className="bg-home">
      <div className=''>
        <NavBar/>
      </div>
      <div className='text-center xl:flex xl:items-center xl:justify-center xl:gap-20 '>
       <div className='bienvenida sm:my-1 sm:text-2xl xl:text-5xl xl:mb-8'>
       <h2>{t('explore')} <br/> {t('the')} <span className='text-blue-800 font-bold uppercase'>{t('experience')}</span> <br/>{t('found')} <br/>{t('click')}</h2>
       </div>
        <div className='absolute xl:bottom-20 xl:left-20 sm:bottom-0 sm:left-60 flex gap-4 xl:justify-center xl:items-center'>
          <Link to={"/flyers"}>
          <button className='btn-search-event sm:py-2 sm:px-2 rounded text-md xl:w-56 xl:h-12 xl:text-xl'>
           {t('search')}
          </button>
          </Link>
          <button onClick={() => setOpenPublicationModal(true)} className='btn-create-event sm:py-2 sm:px-4 rounded text-md xl:w-56 xl:h-12 xl:text-xl'>
           {t('create')}
          </button>
          {openPublicationModal && (
                <div>
                  <PublicationModal setOpenPublicationModal={setOpenPublicationModal}/>
                </div>
            )}
        </div>
          <img className='z-10 sm:w-[240px] sm:h-[400px] xl:w-[400px] xl:h-[500px] object-contain xl:m-0 sm:relative sm:m-auto ' src={Flyer} alt="Flyer de Fundit" />
      </div>
    </div>
  )
}


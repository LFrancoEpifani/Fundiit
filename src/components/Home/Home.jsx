import React, {useState} from 'react'
import Flyer from '../../assets/bgHd.png'
import { Link } from 'react-router-dom'
import PublicationModal from '../PublicationModal/PublicationModal'
import { useTranslation } from 'react-i18next';

export default function Home() {

  const [openPublicationModal, setOpenPublicationModal] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <div className='text-center'>
       <div className='bienvenida my-2 text-2xl'>
       <h2>{t('explore')} <br/> {t('the')} <span className='text-blue-800 font-bold uppercase'>{t('experience')}</span> <br/>{t('found')} <br/>{t('click')}</h2>
       </div>
        <div className='absolute bottom-4 left-12 flex gap-4'>
          <Link to={"/flyers"}>
          <button className='btn-search-event py-2 px-2 rounded text-md'>
           {t('search')}
          </button>
          </Link>
          <button onClick={() => setOpenPublicationModal(true)} className='btn-create-event py-2 px-4 rounded text-md'>
           {t('create')}
          </button>
          {openPublicationModal && (
                <div>
                  <PublicationModal setOpenPublicationModal={setOpenPublicationModal}/>
                </div>
            )}
        </div>
          <img className='w-[240px] h-[400px] object-contain relative m-auto' src={Flyer} alt="Flyer de Fundit" />
      </div>
    </div>
  )
}


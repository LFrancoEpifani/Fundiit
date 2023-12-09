import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next';

export default function Logout() {

    const { logout } = useAuth0();
    const {t} = useTranslation();

  return (
    <div className='flex justify-center items-center'>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <Icon className=" w-7 h-7 xl:w-7 xl:h-7 " icon="typcn:power" color='red'/>
        </button>
    </div>
  )
}

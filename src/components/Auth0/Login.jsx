import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from '@iconify/react'

export default function Login() {

    const { loginWithRedirect } = useAuth0();
    
  return (
    <>
   
            <Icon onClick={() => loginWithRedirect()} className="w-6 h-6 xl:w-7 xl:h-7" icon="mingcute:user-4-fill" />
   
    </>
  )
}

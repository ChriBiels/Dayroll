import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { Button } from 'react-bootstrap'

export const LogoutButton =() =>{
    const {logout} = useAuth0()
    function deslog(){
        logout({returnTo: window.location.origin})

    }

    return ( 
    <Button className='button w-25' 
    onClick={deslog}>Logout</Button>
    )
}
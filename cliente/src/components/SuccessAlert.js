import React from 'react';

function AlertSuccess(props){
    const correctorTexto = (palabra)=>{
        const lowerCase = palabra.toLowerCase()
        return lowerCase.charAt(0).toUpperCase()+lowerCase.slice(1)
    }
    return (
            props.alert && <div className='alert alert-success' role="alert">
                <strong>{correctorTexto(props.alert.type)}</strong>{props.alert.msg}
            </div>
        );
    
}


export default AlertSuccess
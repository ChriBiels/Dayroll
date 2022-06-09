import React from "react"
import "../Styles/Contact.css"


function Contact(){
    return (
        <>
        <div className="container d-flex flex-column align-items-center mt-5">
            <h2>Contacto</h2>
            <div className="box border-1 border-dark">
            <label className="mail me-2">Email</label>
            <input type="email"></input>
            </div>
            <div className="boxb mt-3">
            <textarea type="text" value="" className="msgBox"></textarea>
            </div>
        </div>
        </>
    )
}

export default Contact
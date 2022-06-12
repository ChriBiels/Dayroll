import React, { useEffect, useState } from "react";
import '../Styles/PaginacionStyle.css'


function Paginacion({ pages = 6, setCurrentPage }){

   const numPaginas = []
   for (let i = 1; i<= pages; i++){
      numPaginas.push(i)
   }

   //Paginacion Effect
 
   const [currentButton, setCurrentButton] = useState(1)
   const [arrButtons, setArrButton] = useState([])
   useEffect(() => {
         let tpaginasNum = [...arrButtons]
         let dIzq = '...'
         let dDer = '...'
         let dInicial = '...'
   //Manipulación de las paginas
         if(numPaginas.length < 6){
            tpaginasNum = numPaginas

         }else if (currentButton >= 1 && currentButton <=3){
            tpaginasNum = [1, 2, 3, 4, dInicial, numPaginas.length]

         }else if ( currentButton === 4){
            const deslizar = numPaginas.slice(0, 5)
            tpaginasNum = [...deslizar, dInicial, numPaginas.length ]

         }else if (currentButton > 4 && currentButton < numPaginas.length -2){
            const deslizarA = numPaginas.slice(currentButton -2, currentButton)
            const deslizarB = numPaginas.slice(currentButton,currentButton+1)
            tpaginasNum = ([1, dIzq, ...deslizarA, ...deslizarB, dDer, numPaginas.length])
         }else if (currentButton > numPaginas.length -3){
            const deslizarC = numPaginas.slice(numPaginas.length-4)
            tpaginasNum = ([1, dIzq, ...deslizarC])

         }else if (currentButton === dInicial){
            setCurrentButton(arrButtons[arrButtons.length-3]+1)

         }else if (currentButton === dDer){
            setCurrentButton(arrButtons[3]+2)
            
         }else if (currentButton === dIzq){
            setCurrentButton(arrButtons[3]-2)
            
         }


         setArrButton(tpaginasNum)
         setCurrentPage(currentButton)
      }, [currentButton])

    return(
 <div  className="pagination-container">
    <a href="#"
      className={`${currentButton === 1 ? 'disabled' : ''}`}
      onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev -1)}>
      «
    </a>
   {arrButtons.map(((item, i) => {
      return <a 
      href="#"
      key={i}
      className={`${currentButton === item ? 'active' : ''}`}
      onClick={() => setCurrentButton(item)}
      >
      {item}
      </a>
   }))}

   <a href="#"
      className={`${currentButton === numPaginas.length ? 'disabled' : ''}`}
      onClick={() => setCurrentButton(next => next >= numPaginas.length ? next : next +1)}
      >
      »
    </a>
 </div>
    )
}

export default Paginacion
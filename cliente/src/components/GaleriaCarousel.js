import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "../Styles/Carousel.css"

function Galeria(){
    return (
      <>
        <Carousel autoPlay='true' infiniteLoop='true' interval="4000" className='main-slide'>
            <div>
                <img className='carroimg' src="https://i.imgur.com/bhwgweJ.jpg"  />
                <p className="legend">Adelántate al destino</p>
            </div>
            <div>
                <img className='carroimg' src="https://i.imgur.com/ZJryU3f.jpg"  />
                <p className="legend">Varía tu dieta con recetas</p>
            </div>
            <div>
                <img className='carroimg' src="https://i.imgur.com/mE51BxS.jpg"  />
                <p className="legend">Comprueba tu estado de salud</p>
            </div>
        </Carousel>
      </>
    );
  }
export default Galeria
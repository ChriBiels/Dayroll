import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "../Styles/Carousel.css"

function Galeria(){

  
    return (
      <>
        <Carousel autoPlay='true' infiniteLoop='true' interval="4000" className='main-slide'>
            <div>
                <img className='carroimg' src="https://i.imgur.com/bhwgweJ.jpg"  />
                
            </div>
            <div>
                <img className='carroimg' src="https://i.imgur.com/ZJryU3f.jpg"  />
                
            </div>
            <div>
                <img className='carroimg' src="https://i.imgur.com/mE51BxS.jpg"  />
                
            </div>
        </Carousel>
      </>
    );
  }
export default Galeria
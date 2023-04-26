import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FirstImage from './firstImage.jpg'
import SecondImage from './secondImage.jpg'
import ThirdImage from './thirdImage.jpg'

const Slider = () => {
    return (
        <Carousel autoPlay infiniteLoop centerMode>
            <div>
                <img src={FirstImage} className=" w-10 h-10" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={SecondImage} className=" w-10 h-10" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={ThirdImage} className=" w-10 h-10" />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default Slider;
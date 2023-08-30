import { Carousel } from "@material-tailwind/react";
import "./loginCar.css";
import img1 from "./iitjammu_1.jpg";
import img2 from "./iitjammu_3.jpg";
import img3 from "./iitjammu_4.jpg";
import img4 from "./iitjammu_5.jpg";


export function CarouselCustomNavigation() {
  return (
    <div className="carouselDiv" >
      <Carousel autoplay="true" loop="true"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
        <img src={img1} alt="Logo" className="h-full w-full object-cover"/>
        <img src={img2} alt="Logo" className="h-full w-full object-cover"/>
        <img src={img3} alt="Logo" className="h-full w-full object-cover"/>
        <img src={img4} alt="Logo" className="h-full w-full object-cover"/>
      </Carousel>
    </div>
  );
}
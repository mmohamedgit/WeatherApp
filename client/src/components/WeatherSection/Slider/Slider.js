import { Fragment, useState } from "react";
import classes from "./Slider.module.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  /* If the current count is the same as the array index then we reset the count to 0 which is the first image
otherwise we go to the next image. Once it gets to the end of the length, the current count will reset back */

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  //if we have no data in our slides, then we return nothing.
  if (!Array.isArray(slides) || slides.length <= 0) {
    return null; //or add an image that no data is available...
  }
  return (
    <Fragment>
      {slides.map((slide, index) => {
        return (
          <div
            key={index}
            className={
              index === current ? classes["slide-active"] : classes.slide
            }
          >
            {index === current && slide.weatherSlide}
          </div>
        );
      })}
      <FaArrowAltCircleLeft
        className={classes["left-arrow"]}
        onClick={prevSlide}
      />
      <FaArrowAltCircleRight
        className={classes["right-arrow"]}
        onClick={nextSlide}
      />
    </Fragment>
  );
};

export default Slider;

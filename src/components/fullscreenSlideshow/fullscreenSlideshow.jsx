/** @format */

import { useState, useEffect } from "react";
import "./fullScreenSlideshow.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useNavigate } from "react-router-dom";

function Slideshow(props) {
  const handle = useFullScreenHandle();
  const navigateTo = useNavigate();

  useEffect(() => {
    handle.enter();

    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        navigateTo("/");
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const [slideIndex, setSlideIndex] = useState(0);
  const ratioWHArray = props.ratio.split(":");
  const ratioWH = ratioWHArray[0] / ratioWHArray[1];

  const getNewSlideIndex = (step) => {
    const numberSlide = props.input.length;
    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  };

  const updateDimensions = () => {
    const containerElm = document.querySelector(".container1");
    containerElm.style.height = `${containerElm.offsetWidth / ratioWH}px`;
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    if (props.mode === "automatic") {
      const timeout = props.timeout || 2000;
      const automaticInterval = setInterval(
        () => setSlideIndex(getNewSlideIndex(1)),
        Number.parseInt(timeout),
      );

      return () => clearInterval(automaticInterval);
    }

    return () => window.removeEventListener("resize", updateDimensions);
  }, [slideIndex, props.mode, props.timeout]);

  return (
    <FullScreen handle={handle}>
      <div className='lp-slideshow'>
        <div className='container1'>
          {props.input.map((image, index) => (
            <div
              key={index}
              className={`slide ${slideIndex === index ? "active" : ""}`}
            >
              <div className='number-text'>{`${index + 1} / ${
                props.input.length
              }`}</div>
              <img className='image' src={image.src} alt={image.caption} />
              <div className='caption-text'>{image.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </FullScreen>
  );
}

export default Slideshow;

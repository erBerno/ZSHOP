import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import Slider from "react-slick";

import Button from "../../Control/Button";
import { PrevArrow, NextArrow } from "../../Other/SliderArrow";

export default function SliderTwo({ className, data, showArrows, showDots }) {
  const [sliderIndex, setSliderIndex] = useState();
  const [sliderReady, setSliderReady] = useState();
  useEffect(() => {
    setSliderIndex(0);
  }, []);
  const settings = {
    dots: showDots,
    arrows: showArrows,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slider-dots container",
    customPaging: (i) => {
      return <div className="slider-dot"></div>;
    },
    onInit: () => {
      setSliderReady(true);
    },
    beforeChange: (oldIndex, newIndex) => {
      setTimeout(() => {
        setSliderReady(false);
      }, 10);
    },
    afterChange: (index) => {
      setSliderIndex(index);
      setSliderReady(true);
    },
  };
  return (
    <div className={`slider ${classNames(className)}`}>
      <div className="slider__carousel">
        <Slider {...settings}>
          {data.map((slide, index) => (
            <div
              className={"slider__carousel__item " + `slider-${index + 1}`}
              key={index}
            >
              <div className="container">
                <div className="slider-background">
                  <CSSTransition
                    in={sliderIndex === index && sliderReady}
                    timeout={2000}
                    classNames="slider-zoom-in"
                    unmountOnExit
                  >
                    <img
                      src={process.env.PUBLIC_URL + slide.image}
                      alt="Slider image"
                    />
                  </CSSTransition>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

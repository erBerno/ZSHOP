import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

import Button from "../../Control/Button";
import { PrevArrow, NextArrow } from "../../Other/SliderArrow";
import SectionTitleOne from "../SectionTitle/SectionTitleOne";

export default function IntroductionNine() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/brands/records');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const imageUrls = data.items[0].image_185x70.map(img => ({
            src: `http://localhost:8090/api/files/${data.items[0].collectionId}/${data.items[0].id}/${img}`,
            alt: 'Brand item'
          }));
          setImages(imageUrls);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="introduction-nine">
      <div className="introduction-nine__logos">
        <div className="container">
        </div>
      </div>
      <div className="container">
        <div className="introduction-nine__content">
          <h3>
            ¡Nuevos productos lanzados semanalmente!
          </h3>
          <Button action="/shop/fullwidth-4col" color="white" content="Ver Nuevos Productos" />
        </div>
      </div>
    </div>
  );
}

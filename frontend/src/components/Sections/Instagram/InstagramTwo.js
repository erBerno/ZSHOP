import Slider from "react-slick";
import SectionTitleOne from "../SectionTitle/SectionTitleOne";
import { useState, useEffect } from "react";

export default function InstagramTwo() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/news/records');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const imageUrls = data.items[0].image_320x320.map(img => ({
            src: `http://localhost:8090/api/files/${data.items[0].collectionId}/${data.items[0].id}/${img}`,
            alt: 'Instagram image'
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
    arrows: false,
    slidesToShow: images.length < 6 ? images.length : 6, // Ajusta dinámicamente
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: images.length > 6, // Infinito solo si hay más de 6 imágenes
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: images.length < 5 ? images.length : 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: images.length < 4 ? images.length : 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: images.length < 3 ? images.length : 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: images.length < 2 ? images.length : 2,
        },
      },
    ],
  };

  return (
    <div className="instagram-two">
      <SectionTitleOne showSubTitle align="center" subTitle="ÚLTIMAS NOVEDADES">
        DESCUBRE NUESTROS NUEVOS PRODUCTOS
      </SectionTitleOne>
      <Slider {...settings}>
        {images.map((img, i) => (
          <a key={i} href="https://www.instagram.com/" className="slider-item">
            <img src={img.src} alt={img.alt} />
          </a>
        ))}
      </Slider>
    </div>
  );
}
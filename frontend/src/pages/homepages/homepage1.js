import React, { useState, useEffect } from 'react';
import LayoutOne from '../../components/Layout/LayoutOne';
import SliderTwo from '../../components/Sections/Slider/SliderTwo';
import IntroductionOne from '../../components/Sections/Introduction/IntroductionOne';
import IntroductionTwo from '../../components/Sections/Introduction/IntroductionTwo';
import ProductSlideOne from '../../components/Sections/ProductThumb/ProductSlide/ProductSlideOne';
import TestimonialOne from '../../components/Sections/Testimonial/TestimonialOne';
import TeamOne from '../../components/Sections/Team/TeamOne';
import CTAOne from '../../components/Sections/CallToAction/CTAOne';

export default function Homepage1() {
  const [sliderData, setSliderData] = useState([]);
  const [introductionData, setIntroductionData] = useState({});
  const [introductionTwoData, setIntroductionTwoData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function fetchSliderData() {
      try {
        const response = await fetch('http://127.0.0.1:8090/api/collections/slider/records');
        const data = await response.json();
        const formattedData = data.items.map((item) => ({
          title: { main: item.title },
          subTitle: item.subTitle,
          image: `http://127.0.0.1:8090/api/files/${item.collectionId}/${item.id}/${item.image_1920x550}`,
          btn: {
            content: 'VISUALIZAR',
            color: 'red',
          },
          animationClass: {
            title: 'slider-one-title',
            subtitle: 'slider-one-subtitle',
            button: 'slider-one-button',
          },
        }));
        setSliderData(formattedData);
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    }

    async function fetchIntroductionData() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/introduction/records');
        const data = await response.json();
        if (data && data.items && data.items.length > 0) {
          const item = data.items[0];
          const formattedData = {
            subTitle: {
              main: item.subTitleMain,
              span: item.subTitleSpan,
            },
            title: {
              main: item.titleMain,
              span: item.titleSpan,
            },
            description: item.description,
            btn: {
              content: 'VISUALIZAR',
              color: 'white',
            },
            image1: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_390x455}`,
            image2: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_370x440}`,
          };
          setIntroductionData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching introduction data:', error);
      }
    }

    async function fetchIntroductionTwoData() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/services/records');
        const data = await response.json();
        const formattedData = data.items.map((item) => ({
          name: item.name,
          videoPoster: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_960x500}`,
          videoSrc: item.videoSrc,
        }));
        setIntroductionTwoData(formattedData);
      } catch (error) {
        console.error('Error fetching introduction two data:', error);
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/categories/records');
        const data = await response.json();
        const categoriesMap = {};
        data.items.forEach((category) => {
          categoriesMap[category.id] = category.categorieName;
        });
        setCategories(categoriesMap);
        fetchProductData(categoriesMap); // Llamamos a fetchProductData aquí
      } catch (error) {
        console.error('Error fetching categories data:', error);
      }
    }

    async function fetchProductData(categoriesMap) {
      try {
        const response = await fetch('http://localhost:8090/api/collections/products/records');
        const data = await response.json();
        const formattedData = data.items.map((item) => ({
          category: item.category,
          name: item.name,
          rate: item.rate,
          price: item.price,
          isNew: item.new,
          brand: item.brand,
          code: item.code,
          point: item.point,
          quantity: item.quantity,
          category: item.categorieName.map((categoryId) => categoriesMap[categoryId]).filter(Boolean),
          colorVariations: [
            {
              color: "red",
              colorCode: "#8B0000",
              image: "/assets/images/product/color1.png"
            },
            {
              color: "blue",
              colorCode: "#4169E1",
              image: "/assets/images/product/color2.png"
            }],
          thumbImage: item.thumbImage_270x345
            ? `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.thumbImage_270x345}`
            : null,
          images: item.image_270x345.map((img) =>
            `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${img}`
          ),
          description: item.description,
        }));
        setProductData(formattedData);
        } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    async function fetchTestimonialData() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/testimonials/records');
        const data = await response.json();
        const formattedData = data.items.map((item) => ({
          id: item.id,
          name: item.name,
          city: item.city,
          review: item.review,
          rate: item.rate,
          image: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_130x130}`,
        }));
        setTestimonialData(formattedData);
      } catch (error) {
        console.error('Error fetching testimonial data:', error);
      }
    }

    async function fetchTeamData() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/team/records');
        const data = await response.json();
        const formattedData = data.items.map((item) => ({
          id: item.id,
          name: item.name,
          position: item.position,
          quote: item.quote,
          image: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_196x209}`,
        }));
        setTeamData(formattedData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    }

    console.log("useEffect: Iniciando todas las solicitudes");
    fetchCategories(); // Asegúrate de llamar primero a esta función
    fetchSliderData();
    fetchIntroductionData();
    fetchIntroductionTwoData();
    fetchTestimonialData();
    fetchTeamData();
  }, []);

  return (
    <LayoutOne title="INICIO" className="-style-1">
      <SliderTwo data={sliderData} className="-style-1" showDots />
      {introductionData.subTitle && <IntroductionOne data={introductionData} />}
      <IntroductionTwo data={introductionTwoData} />
      <ProductSlideOne data={productData} />
      <TestimonialOne data={testimonialData} />
      <TeamOne data={teamData} />
      <CTAOne />
    </LayoutOne>
  );
}
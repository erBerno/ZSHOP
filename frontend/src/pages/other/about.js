import React, { useState, useEffect } from 'react';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import IntroductionOne from "../../components/Sections/Introduction/IntroductionOne";
import IntroductionTwo from "../../components/Sections/Introduction/IntroductionTwo";
import TestimonialOne from "../../components/Sections/Testimonial/TestimonialOne";
import Benefits from "../../components/Other/Benefits";
import IntroductionNine from "../../components/Sections/Introduction/IntroductionNine";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";

export default function AboutUs() {
  const [testimonialData, setTestimonialData] = useState([]);
  const [introductionData, setIntroductionData] = useState({});
  const [introductionTwoData, setIntroductionTwoData] = useState([]);

  useEffect(() => {
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
        const response = await fetch('http://localhost:8090/api/collections/about/records');
        const data = await response.json();
        const formattedData = data.items.map((item) => ({
          name: item.name,
          description: item.description,
          videoPoster: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_960x500}`,
          videoSrc: item.videoSrc
        }));
        setIntroductionTwoData(formattedData);
      } catch (error) {
        console.error('Error fetching introduction two data:', error);
      }
    }

    fetchIntroductionTwoData();
    fetchIntroductionData();
    fetchTestimonialData();
  }, []);

  return (
    <LayoutFour title="NOSOTROS">
      <Breadcrumb title="NOSOTROS">
        <BreadcrumbItem name="INICIO" />
        <BreadcrumbItem name="NOSOTROS" current />
      </Breadcrumb>
      {introductionData.subTitle && <IntroductionOne data={introductionData} />}
      <IntroductionTwo data={introductionTwoData} style={{ marginBottom: 0 }} />
      <TestimonialOne
        data={testimonialData}
        style={{ backgroundColor: "#fff", marginBottom: 0 }}
      />
      <IntroductionNine/>
      <Benefits />
    </LayoutFour>
  );
}

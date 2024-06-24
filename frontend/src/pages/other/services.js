import React, { useState, useEffect } from 'react';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import CTAOne from "../../components/Sections/CallToAction/CTAOne";
import ServiceItem from "../../components/Pages/Services/ServiceItem";
import { formatSingleNumber } from "../../common/utils";

export default function services() {
  const [servicesData, setServicesData] = useState([]); 
  useEffect(() => {
    async function fetchServicesData() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/services/records');
        const data = await response.json();
        const formattedData = data.items.map((item, index) => ({
          title: item.name,
          description: item.description, 
          features: item.features,
          bigImgSrc: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_370x490}`,
          smallImgSrc: `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_300x300}`
        }));
        setServicesData(formattedData); 
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    }

    fetchServicesData();
  }, []);

  return (
    <LayoutFour title="SERVICIOS">
      <Breadcrumb title="SERVICIOS">
        <BreadcrumbItem name="INICIO" />
        <BreadcrumbItem name="SERVICIOS" current />
      </Breadcrumb>
      {servicesData &&
        servicesData.map((item, index) => (
          <ServiceItem
            key={index}
            bigImgSrc={item.bigImgSrc}
            smallImgSrc={item.smallImgSrc}
            title={item.title}
            features={item.features} 
            order={formatSingleNumber(index + 1)}
            reverse={index % 2 === 1}
          />
        ))}

      <CTAOne />
    </LayoutFour>
  );
}

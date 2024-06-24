import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SectionTitleOne from "../SectionTitle/SectionTitleOne";

export default function CTAOne() {
  const [bannerImage, setBannerImage] = useState('');
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    async function fetchBannerImage() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/banner/records');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const imageUrl = `http://localhost:8090/api/files/${data.items[0].collectionId}/${data.items[0].id}/${data.items[0].image_1920x1080}`;
          setBannerImage(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    }

    async function fetchServices() {
      try {
        const response = await fetch('http://127.0.0.1:8090/api/collections/services/records');
        const data = await response.json();
        if (data.items) {
          setServices(data.items);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }

    fetchServices();
    fetchBannerImage();
  }, []);

  const { register, handleSubmit, errors } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8090/api/collections/meetings/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          service: data.service,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      window.location.reload();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div
      className="cta -style-1"
      style={{ backgroundImage: `url("${bannerImage}")` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            <div className="cta__form">
              <SectionTitleOne align="center" spaceBottom="1.875em">
                AGENDA UNA CITA
              </SectionTitleOne>
              <form onSubmit={handleSubmit(onSubmit)} className="cta__form__detail">
                {/* Campos del formulario */}
                <div className="input-validator">
                  <input
                    type="text"
                    placeholder="NOMBRE"
                    name="name"
                    ref={register({ required: true })}
                  />
                  {errors.name && (
                    <span className="input-error">
                      Por favor, proporcione un nombre válido.
                    </span>
                  )}
                </div>
                <div className="input-validator">
                  <input
                    type="text"
                    placeholder="TELÉFONO"
                    name="phone"
                    ref={register({ required: true })}
                  />
                  {errors.phone && (
                    <span className="input-error">
                      Por favor, proporcione un teléfono válido.
                    </span>
                  )}
                </div>
                <div className="input-validator">
                  <select name="service" ref={register({ required: true })} className="customed-select" defaultValue="">
                    <option value="" hidden>ELEGIR UN SERVICIO</option>
                    {services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="input-error">Por favor, elija un servicio.</span>
                  )}
                </div>
                <button className="btn -black">AGENDAR</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
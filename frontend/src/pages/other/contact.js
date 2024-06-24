import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import LayoutFour from "../../components/Layout/LayoutFour";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import ContactInfoItem from "../../components/Pages/Contact/ContactInfoItem";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/information/records');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setContactInfo(data.items[0]);
        }
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    }

    fetchContactInfo();
  }, []);

  return (
    <LayoutFour title="CONTACTO">
      <Breadcrumb title="CONTACTO">
        <BreadcrumbItem name="INICIO" />
        <BreadcrumbItem name="CONTACTO" current />
      </Breadcrumb>
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3 className="contact-title">INFORMACIÓN DE CONTACTO</h3>
              <ContactInfoItem
                iconClass="fas fa-map-marker-alt"
                title="DIRECCIÓN"
                detail={contactInfo.address}
              />
              <ContactInfoItem
                iconClass="fas fa-phone-alt"
                title="TELÉFONO"
                detail={contactInfo.phone}
              />
              <ContactInfoItem
                iconClass="far fa-envelope"
                title="CORREO ELECTRÓNICO"
                detail={contactInfo.email}
              />
              <ContactInfoItem
                iconClass="far fa-clock"
                title="HORARIOS"
                detail={contactInfo.open}
              />
            </div>
            <div className="col-12 col-md-6">
              <h3 className="contact-title">ENVÍANOS UN MENSAJE</h3>
              <div className="contact-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-validator">
                    <input
                      type="text"
                      name="name"
                      placeholder="NOMBRE"
                      ref={register({ required: true })}
                    />
                    {errors.name && (
                      <span className="input-error">Por favor, indica un nombre.</span>
                    )}
                  </div>
                  <div className="input-validator">
                    <input
                      type="text"
                      name="email"
                      placeholder="CORREO ELECTRÓNICO"
                      ref={register({ required: true })}
                    />
                    {errors.email && (
                      <span className="input-error">
                        Por favor, indica un correo electrónico.
                      </span>
                    )}
                  </div>
                  <div className="input-validator">
                    <textarea
                      name="message"
                      cols="30"
                      rows="3"
                      placeholder="MENSAJE"
                      ref={register({ required: true })}
                    />
                    {errors.message && (
                      <span className="input-error">Por favor, escribe un mensaje.</span>
                    )}
                  </div>
                  <button className="btn -dark">ENVIAR MENSAJE</button>
                </form>
              </div>
            </div>
            <div className="col-12">
              <iframe
                className="contact-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4038127433814!2d-66.16115352556332!3d-17.392398064329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3733c543453d3%3A0x4d7951a14616c1e9!2sMarket%20place%20el%20subterraneo!5e0!3m2!1ses-419!2sbo!4v1698977159445!5m2!1ses-419!2sbo"
                width="100%"
                height="450"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </LayoutFour>
  );
}
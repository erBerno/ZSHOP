import React, { useState, useEffect } from "react";
import Link from "next/link";
import SubcribeEmail from "../Other/SubcribeEmail";

import SocialIcons from "../Other/SocialIcons";
import footerLinks from "../../data/footer/links.json";
import footerInfomation from "../../data/footer/info.json";

export default function FooterOne() {
  const [footerInformation, setFooterInformation] = useState({
    address: "",
    phone: "",
    email: "",
    open: "",
  });
  const [footerLinks, setFooterLinks] = useState({
    accountLinks: [],
    informationLinks: [],
    creditLinks: [],
  });
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    async function fetchFooterInformation() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/information/records');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          // Asumiendo que la información de contacto está en el primer elemento
          setFooterInformation({
            address: data.items[0].address,
            phone: data.items[0].phone,
            email: data.items[0].email,
            open: data.items[0].open,
          });
        }
      } catch (error) {
        console.error('Error fetching footer information:', error);
      }
    }

    async function fetchFooterLinks() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/links/records');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          // Asumiendo que los enlaces están en el primer elemento
          setFooterLinks({
            accountLinks: data.items[0].accountLinks,
            informationLinks: data.items[0].informationLinks,
            creditLinks: data.items[0].creditLinks,
          });
        }
      } catch (error) {
        console.error('Error fetching footer links:', error);
      }
    }

    async function fetchLogo() {
      try {
        const response = await fetch('http://127.0.0.1:8090/api/files/fs7yoxirvx8dxtl/gl9bc9cf6d6x723/logo100x35_0bdao4vXPV.png?token=');
        setLogoUrl(response.url);
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    }

    fetchLogo();
    fetchFooterLinks();
    fetchFooterInformation();
  }, []);
  
  return (
    <div className="footer-one">
      <div className="container">
        <div className="footer-one__header">
        <div className="footer-one__header__logo">
        <Link href="/homepages/homepage1">
          <a>
            {logoUrl && <img src={logoUrl} alt="Logo" />}
          </a>
        </Link>
      </div>
          <div className="footer-one__header__newsletter">
            <span>SUSCRÍBETE:</span>
            <SubcribeEmail
              mailchimpUrl="https://jster.us7.list-manage.com/subscribe/post?u=ed40c0084a0c5ba31b3365d65&id=ec6f32bf5e"
              placeholder="CORREO ELECTRÓNICO"
              btnContent={<i className="fas fa-paper-plane" />}
              className="footer-one-newsletter"
            />
          </div>
          <div className="footer-one__header__social">
            <SocialIcons className="-border" />
          </div>
        </div>
        <div className="footer-one__body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="footer__section -info">
              <h5 className="footer-title">INFORMACIÓN DE CONTACTO</h5>
              <p>Dirección: <span>{footerInformation.address}</span></p>
              <p>Teléfono: <span>{footerInformation.phone}</span></p>
              <p>Correo: <span>{footerInformation.email}</span></p>
              <p>Horarios: <span>{footerInformation.open}</span></p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="footer__section -links">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <h5 className="footer-title">CUENTA</h5>
                    <ul>
                      {footerLinks.accountLinks.map((link, index) => (
                        <li key={index}>
                          <Link href={link.to}>
                            <a>{link.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h5 className="footer-title">INFORMACIÓN</h5>
                    <ul>
                      {footerLinks.informationLinks.map((link, index) => (
                        <li key={index}>
                          <Link href={link.to}>
                            <a>{link.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="footer__section -payment">
                <h5 className="footer-title">MÉTODOS DE PAGOS</h5>
                <div className="payment-methods">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/footer/payment.png"
                    }
                    alt="Payment methods"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-one__footer">
        <div className="container">
          <div className="footer-one__footer__wrapper">
            <p>© Copyright 2024 - ZSHOP</p>
            <ul>
              {footerLinks.creditLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.to}>
                    <a>{link.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

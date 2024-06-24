import React, { useState, useEffect } from "react";

// Imágenes estáticas como fallback
const staticImages = [
  "/assets/images/benefits/1.png",
  "/assets/images/benefits/2.png",
  "/assets/images/benefits/3.png",
  "/assets/images/benefits/4.png"
];

export default function Benefits({ spaceBottom }) {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    async function fetchBenefits() {
      try {
        const response = await fetch('http://localhost:8090/api/collections/benefits/records');
        const data = await response.json();
        const formattedData = data.items.map((item, index) => ({
          name: item.name,
          content: item.content,
          image: item.image_30x30 ? `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.image_30x30}` : staticImages[index]
        }));
        setBenefits(formattedData);
      } catch (error) {
        console.error('Error fetching benefits data:', error);
      }
    }

    fetchBenefits();
  }, []);

  return (
    <div
      className="benefits"
      style={{ marginBottom: spaceBottom || 100 / 16 + "rem" }}
    >
      <div className="container">
        <div className="row">
          {benefits.map((b, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="benefits__item">
                <div className="benefits__item__icon">
                  <img src={b.image} alt={b.name} />
                </div>
                <div className="benefits__item__content">
                  <h5>{b.name}</h5>
                  <p>{b.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
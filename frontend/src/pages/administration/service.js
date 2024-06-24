import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";

const RegisterService = () => {
    const [services, setServices] = useState([]);
    const imageBaseUrl = "http://127.0.0.1:8090/api/files/cy75yfg5qdymx97/";
    const [selectedService, setSelectedService] = useState({
        id: '',
        name: '',
        description: '',
        image_300x300: null,
        image_370x490: null,
        image_960x500: null,
        videoSrc: ''
    });
    const servicesApiUrl = "http://127.0.0.1:8090/api/collections/services/records";

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(servicesApiUrl);
                setServices(response.data.items);
            } catch (error) {
                console.error("Error al cargar servicios:", error);
            }
        };

        fetchServices();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSelectedService(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleFileChange = (e, type) => {
        setService({ ...selectedService, [type]: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', selectedService.name);
        formData.append('description', selectedService.description);
        formData.append('videoSrc', selectedService.videoSrc);

        ['image_300x300', 'image_370x490', 'image_960x500'].forEach(imageField => {
            if (selectedService[imageField]) {
                formData.append(imageField, selectedService[imageField]);
            }
        });

        try {
            const url = selectedService.id
                ? `${servicesApiUrl}/${selectedService.id}`
                : servicesApiUrl;
            const method = selectedService.id ? 'patch' : 'post';

            await axios({
                method: method,
                url: url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            fetchServices();
            setSelectedService({ id: '', name: '', description: '', image_300x300: null, image_370x490: null, image_960x500: null, videoSrc: '' });
        } catch (error) {
            console.error("Error al procesar el servicio:", error);
        }
    };

    const handleUpdateClick = (service) => {
        setSelectedService(service);
    };

    const handleDeleteClick = async (serviceId) => {
        try {
            await axios.delete(`${servicesApiUrl}/${serviceId}`);
            setServices(services.filter(service => service.id !== serviceId));
        } catch (error) {
            console.error("Error al eliminar el servicio:", error);
        }
    };

    return (
        <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
            <Breadcrumb title="ADMINISTRACIÓN">
                <BreadcrumbItem name="ADMINISTRACIÓN" />
                <BreadcrumbItem name="REGISTRO DE SERVICIOS" current />
            </Breadcrumb>

            <style>
                {`
        @import url('https://fonts.googleapis.com/css?family=Roboto:300');
        .containerAll {
            padding-bottom: 70px;
        }

        .form-container {
            width: 1000px;
            padding: 20px;
            margin: 40px auto;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .form-input, .form-select, .form-control-file {
            font-family: "Roboto", sans-serif;
            outline: 0;
            background: #f2f2f2;
            width: 100%;
            border: 0;
            margin: 0 0 15px;
            padding: 15px;
            box-sizing: border-box;
            font-size: 14px;
        }

        .form-button {
            font-family: "Roboto", sans-serif;
            text-transform: uppercase;
            outline: 0;
            background: #f26460;
            width: 100%;
            border: 0;
            padding: 15px;
            color: #FFFFFF;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }

        .form-button:hover {
            background: #ee3631;
        }

        .data-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        .data-table th, .data-table td {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        .data-table th {
            background-color: #f26460;
            color: white;
        }

        .data-table tbody tr:nth-child(odd) {
            background-color: #f9f9f9;
        }

        .table-button {
            background: #f26460;
            color: #FFFFFF;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 5px;
        }

        .table-button:hover {
            background: #ee3631;
        }

        .containerAll {
            padding-bottom: 70px;
        }

        .data-table th, .data-table td {
            text-align: center; /* Centra el contenido de las celdas */
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
    `}
            </style>


            <div className="containerAll">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Campos del formulario */}
                        <div className="form-group">
                            <label htmlFor="name">Nombre del Servicio</label>
                            <input type="text" className="form-input" id="name" placeholder="Ingrese el nombre del servicio" value={selectedService.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <textarea className="form-input" id="description" placeholder="Descripción del servicio" value={selectedService.description} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="videoSrc">Enlace de Video</label>
                            <input type="text" className="form-input" id="videoSrc" placeholder="URL del video" value={selectedService.videoSrc} onChange={handleInputChange} />
                        </div>
                        {/* Campos de archivo para imágenes */}
                        {/* ... */}
                        <button type="submit" className="form-button">Enviar</button>
                    </form>
                </div>

                <div className="services-table">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.id}>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>
                                        {service.image_960x500 && <img src={`${imageBaseUrl}${service.id}/${service.image_960x500}`} alt="Service" style={{ width: "100px" }} />}
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdateClick(service)} className="table-button">Actualizar</button>
                                        <button onClick={() => handleDeleteClick(service.id)} className="table-button">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutFour>
    );
};

export default RegisterService;
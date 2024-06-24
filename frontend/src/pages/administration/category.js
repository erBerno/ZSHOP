import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";

const RegisterCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({ id: '', categorieName: '' });
    const apiURL = "http://127.0.0.1:8090/api/collections/categories/records";

    const fetchCategories = async () => {
        try {
            const response = await axios.get(apiURL);
            setCategories(response.data.items);
        } catch (error) {
            console.error("Error al cargar las categorías:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { categorieName: selectedCategory.categorieName };
    
        try {
            const url = selectedCategory.id 
                ? `${apiURL}/${selectedCategory.id}` // URL para actualizar
                : apiURL; // URL para crear
    
            const method = selectedCategory.id ? 'patch' : 'post';
    
            await axios({
                method: method,
                url: url,
                data: data
            });
    
            fetchCategories();
            setSelectedCategory({ id: '', categorieName: '' });
        } catch (error) {
            console.error("Error al procesar la categoría:", error);
        }
    };

    const handleUpdateClick = (category) => {
        setSelectedCategory(category);
    };

    const handleDeleteClick = async (categoryId) => {
        try {
            await axios.delete(`${apiURL}/${categoryId}`);
            fetchCategories();
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
        }
    };

    return (
        <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
            <Breadcrumb title="ADMINISTRACIÓN">
                <BreadcrumbItem name="ADMINISTRACIÓN" />
                <BreadcrumbItem name="REGISTRO DE CATEGORIAS" current />
            </Breadcrumb>

            {/* Estilos actualizados al estilo del formulario de ejemplo */}
            <style>
                {`
                    @import url(https://fonts.googleapis.com/css?family=Roboto:300);
                    .form-container {
                        width: 1000px;
                        padding: 20px;
                        margin: 40px auto;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        transition: all 0.3s ease;
                    }

                    .form-input {
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

                    /* Estilos para la Tabla */
                    .data-table {
                        width: 100%;
                        margin-top: 20px;
                        border-collapse: collapse;
                    }

                    .data-table th, .data-table td {
                        text-align: left;
                        padding: 8px;
                    }

                    .data-table thead {
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
                    <input type="hidden" value={selectedCategory.id} />
                    <div>
                        <label htmlFor="categorieName">NOMBRE DE LA CATEGORÍA</label>
                        <input type="text" className="form-input" id="categorieName" value={selectedCategory.categorieName} onChange={(e) => setSelectedCategory({ ...selectedCategory, categorieName: e.target.value })} placeholder="IGRESE EL NOMBRE DE LA CATEGORÍA" />
                    </div>
                    <button type="submit" className="form-button">Enviar</button>
                </form>
            </div>
            <table className="data-table">
                    <thead>
                        <tr>
                            <th>CATEGORÍA</th>
                            <th>ACTUALIZAR</th>
                            <th>ELIMINAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.categorieName}</td>
                                <td>
                                    <button onClick={() => handleUpdateClick(category)} className="form-button">Actualizar</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClick(category.id)} className="form-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutFour>
    );
};

export default RegisterCategory;

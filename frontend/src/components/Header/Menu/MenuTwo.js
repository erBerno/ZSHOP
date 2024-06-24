import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";

const RegisterProduct = () => {
    const [categories, setCategories] = useState({});
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        id: '',
        name: '',
        price: '',
        brand: '',
        categorieId: '',
        thumbImage: null,
        images: [],
        rate: '',
        new: '',
        code: '',
        point: '',
        quantity: '',
        description: ''
    });

    const categoriesApiUrl = "http://127.0.0.1:8090/api/collections/categories/records";
    const productsApiUrl = "http://127.0.0.1:8090/api/collections/products/records";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get(categoriesApiUrl),
                    axios.get(productsApiUrl)
                ]);

                setCategories(categoriesResponse.data.items.reduce((acc, category) => {
                    acc[category.id] = category.categorieName;
                    return acc;
                }, {}));
                setProducts(productsResponse.data.items);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleFileChange = (e, type) => {
        if (type === 'thumbImage') {
            setProduct({ ...product, thumbImage: e.target.files[0] });
        } else if (type === 'images') {
            setProduct({ ...product, images: e.target.files });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('brand', product.brand);
        formData.append('categorieId', product.categorieId); // Asegúrate de que esto se está enviando
        formData.append('rate', product.rate);
        formData.append('new', product.new);
        formData.append('code', product.code);
        formData.append('point', product.point);
        formData.append('quantity', product.quantity);
        formData.append('description', product.description);

        if (product.thumbImage) {
            formData.append('thumbImage_270x345', product.thumbImage);
        }

        if (product.images && product.images.length) {
            for (let i = 0; i < product.images.length; i++) {
                formData.append(`image_270x345[${i}]`, product.images[i]);
            }
        }

        console.log("Datos del formulario antes del envío:", Array.from(formData.entries()));

        try {
            let updatedProduct;
            if (product.id) {
                const response = await axios.patch(`${productsApiUrl}/${product.id}`, formData);
                updatedProduct = response.data;
                setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
            } else {
                const response = await axios.post(productsApiUrl, formData);
                updatedProduct = response.data;
                setProducts([...products, updatedProduct]);
            }

            setProduct({ id: '', name: '', price: '', brand: '', categorieId: '', thumbImage: null, images: [], rate: '', new: '', code: '', point: '', quantity: '', description: '' });
        } catch (error) {
            console.error("Error al procesar el producto:", error);
        }
    };

    const handleUpdateClick = (productToUpdate) => {
        setProduct(productToUpdate);
    };

    const handleDeleteClick = async (productId) => {
        try {
            await axios.delete(`${productsApiUrl}/${productId}`);
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const imageBaseUrl = "http://127.0.0.1:8090/api/files/cybcxlfkic29tfa/";

    return (
        <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
            <Breadcrumb title="ADMINISTRACIÓN">
                <BreadcrumbItem name="ADMINISTRACION" />
                <BreadcrumbItem name="REGISTRO DE PRODUCTOS" current />
            </Breadcrumb>
    
            <style>
                {`
                @import url('https://fonts.googleapis.com/css?family=Roboto:300');
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

                /* Estilos para la Tabla */
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
                        <div className="form-group">
                            <label htmlFor="name">Nombre del Producto</label>
                            <input type="text" className="form-input" id="name" placeholder="Ingrese el nombre del producto" value={product.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Precio</label>
                            <input type="number" className="form-input" id="price" placeholder="Ingrese el precio" value={product.price} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brand">Marca</label>
                            <input type="text" className="form-input" id="brand" placeholder="Ingrese la marca" value={product.brand} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categorieId">Categoría</label>
                            <select className="form-input" id="categorieId" value={product.categorieId} onChange={handleInputChange}>
                                <option value="">Seleccione una categoría</option>
                                {Object.entries(categories).map(([id, name]) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="thumbImage">Imagen Miniatura</label>
                            <input type="file" className="form-input" id="thumbImage" onChange={(e) => handleFileChange(e, 'thumbImage')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="images">Imágenes</label>
                            <input type="file" className="form-input" id="images" multiple onChange={(e) => handleFileChange(e, 'images')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rate">Calificación</label>
                            <input type="number" className="form-input" id="rate" placeholder="Calificación" value={product.rate} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new">Nuevo</label>
                            <select className="form-input" id="new" value={product.new} onChange={handleInputChange}>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="code">Código</label>
                            <input type="text" className="form-input" id="code" placeholder="Código" value={product.code} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="point">Puntos</label>
                            <input type="number" className="form-input" id="point" placeholder="Puntos" value={product.point} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Cantidad</label>
                            <input type="number" className="form-input" id="quantity" placeholder="Cantidad" value={product.quantity} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <textarea className="form-input" id="description" placeholder="Descripción" value={product.description} onChange={handleInputChange}></textarea>
                        </div>
                        <button type="submit" className="form-button">Enviar</button>
                    </form>
                </div>
    
                {/* Tabla de Productos */}
                <table className="data-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Marca</th>
                    <th>Categoría</th>
                    <th>Imagen Miniatura</th>
                    <th>Otras Imágenes</th>
                    <th>Calificación</th>
                    <th>Nuevo</th>
                    <th>Código</th>
                    <th>Puntos</th>
                    <th>Cantidad</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.brand}</td>
                        <td>{product.categorieId ? categories[product.categorieId] : ''}</td>
                        <td>
                            <img src={`${imageBaseUrl}${product.id}/${product.thumbImage_270x345}`} alt="Miniatura" style={{ width: "50px" }} />
                        </td>
                        <td>
                            {product.image_270x345 && product.image_270x345.map((image, index) => (
                                <img key={index} src={`${imageBaseUrl}${product.id}/${image}`} alt={`Imagen ${index}`} style={{ width: "50px", marginRight: "5px" }} />
                            ))}
                        </td>
                        <td>{product.rate}</td>
                        <td>{product.new ? 'Sí' : 'No'}</td>
                        <td>{product.code}</td>
                        <td>{product.point}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        <td>
                            <button onClick={() => handleUpdateClick(product)} className="table-button">Actualizar</button>
                            <button onClick={() => handleDeleteClick(product.id)} className="table-button">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>
        </LayoutFour>
    );
};

export default RegisterProduct;

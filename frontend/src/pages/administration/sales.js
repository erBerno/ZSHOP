import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";

const Administration = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8090/api/collections/sales/records');
                setSales(response.data.items);
            } catch (error) {
                console.error("Error al cargar ventas:", error);
            }
        };

        fetchSales();
    }, []);

    const handleDelete = async (saleId) => {
        try {
            await axios.delete(`http://127.0.0.1:8090/api/collections/sales/records/${saleId}`);
            setSales(sales.filter(sale => sale.id !== saleId));
        } catch (error) {
            console.error("Error al eliminar venta:", error);
        }
    };

    const formatProducts = (products) => {
        return products.map(product => `${product.name} (Cantidad: ${product.quantity}, Precio: ${product.price})`).join(', ');
    };

    return (
        <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
            <Breadcrumb title="ADMINISTRACIÓN">
                <BreadcrumbItem name="ADMINISTRACIÓN" />
                <BreadcrumbItem name="REPORTE DE VENTAS" current />
            </Breadcrumb>

            <style>
                    {`
                        .sales-report {
                            width: 90%;
                            margin: auto;
                            padding: 20px;
                        }

                        .data-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }

                        .data-table th, .data-table td {
                            padding: 10px;
                            border: 1px solid #ddd;
                            text-align: left;
                        }

                        .data-table th {
                            background-color: #f26460;
                            color: white;
                        }

                        .data-table tr:nth-child(even) {
                            background-color: #f2f2f2;
                        }

                        .data-table button {
                            background-color: #f26460;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 5px;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }

                        .data-table button:hover {
                            background-color: #ee3631;
                        }

                        .containerAll {
                            padding-bottom: 70px;
                        }

                        .containerAll {
                            padding-bottom: 70px;
                        }
                    `}
                </style>

            <div className='containerAll'>
            <div className="sales-report">
                

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dirección</th>
                            <th>Ciudad</th>
                            <th>Estado</th>
                            <th>País</th>
                            <th>Código Postal</th>
                            <th>Teléfono</th>
                            <th>Total</th>
                            <th>Productos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.id}>
                                <td>{sale.email}</td>
                                <td>{sale.name}</td>
                                <td>{sale.lastName}</td>
                                <td>{sale.address}, Apt: {sale.apartment}, {sale.dptoNumber}</td>
                                <td>{sale.city}</td>
                                <td>{sale.state}</td>
                                <td>{sale.country}</td>
                                <td>{sale.zipCode}</td>
                                <td>{sale.phone}</td>
                                <td>{sale.total}</td>
                                <td>{formatProducts(sale.products)}</td>
                                <td>
                                    <button onClick={() => handleDelete(sale.id)}>Eliminar</button>
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

export default Administration;
import React from 'react';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Administration = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Elimina el token de autenticación (esto puede variar según cómo manejes la autenticación)
        localStorage.removeItem('authToken'); // o cualquier clave que uses para el token

        // Redirige al usuario a la página de inicio de sesión
        router.push('/administration/login');
    };

    return (
        <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
            <Breadcrumb title="ADMINISTRACIÓN">
                <BreadcrumbItem name="ADMINISTRACIÓN" />
                <BreadcrumbItem name="ACTUALIZACIONES Y REGISTROS" current />
            </Breadcrumb>

            <div className="admin-list">
                <style>
                    {`
                        .admin-list {
                            width: 360px;
                            margin: auto;
                            padding: 20px;
                        }

                        .admin-list-item {
                            font-family: "Roboto", sans-serif;
                            background: #111;
                            margin: 10px 0;
                            padding: 15px;
                            text-align: center;
                            border: none;
                            font-size: 16px;
                            cursor: pointer;
                            color: white;
                            transition: background 0.3s ease;
                        }

                        .admin-list-item:hover {
                            background: #000;
                            color: #FFFFFF;
                        }

                        .logout-button {
                            font-family: "Roboto", sans-serif;
                            background: #535353;
                            margin: 10px 0;
                            padding: 15px;
                            text-align: center;
                            border: none;
                            font-size: 16px;
                            color: #FFFFFF;
                            cursor: pointer;
                            transition: background 0.3s ease;
                        }

                        .logout-button:hover {
                            background: #3c3c3c;
                        }

                        .containerAll {
                            padding-bottom: 70px;
                        }
                    `}
                </style>

                <div className='containerAll'>
                    <Link href="/administration/product" passHref>
                        <div className="admin-list-item">ADMINISTRACIÓN DE PRODUCTOS</div>
                    </Link>
                    <Link href="/administration/sales" passHref>
                        <div className="admin-list-item">REPORTE DE VENTAS</div>
                    </Link>
                    <div className="logout-button" onClick={handleLogout}>
                        CERRAR SESIÓN
                    </div>
                </div>
            </div>
        </LayoutFour>
    );
};

export default Administration;

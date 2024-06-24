import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";

const Administration = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ id: '', firstName: '', lastName: '', email: '', password: '' });
    const apiURL = "http://0.0.0.0:8090/api/collections/users/records";

    const fetchUsers = async () => {
        try {
            const response = await axios.get(apiURL);
            setUsers(response.data.items);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { 
            firstName: selectedUser.firstName, 
            lastName: selectedUser.lastName, 
            email: selectedUser.email,
            password: selectedUser.password
        };
    
        try {
            const url = selectedUser.id 
                ? `${apiURL}/${selectedUser.id}` // URL para actualizar
                : apiURL; // URL para crear
    
            const method = selectedUser.id ? 'patch' : 'post';
    
            await axios({
                method: method,
                url: url,
                data: data
            });
    
            fetchUsers();
            setSelectedUser({ id: '', firstName: '', lastName: '', email: '', password: '' });
        } catch (error) {
            console.error("Error al procesar el usuario:", error);
        }
    };

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
    };

    const handleDeleteClick = async (userId) => {
        try {
            await axios.delete(`${apiURL}/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    return (
        <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
            <Breadcrumb title="ADMINISTRACIÓN">
                <BreadcrumbItem name="ADMINISTRACIÓN" />
                <BreadcrumbItem name="GESTIÓN DE USUARIOS" current />
            </Breadcrumb>

            <style>
    {`
        @import url(https://fonts.googleapis.com/css?family=Roboto:300);

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

        .data-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        .data-table th, .data-table td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
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

        .containerAll {
            padding-bottom: 70px;
        }
    `}
</style>

            <div className="containerAll">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Campos del formulario */}
                        <input type="hidden" value={selectedUser.id} />
                        <div>
                            <label htmlFor="firstName">Nombre</label>
                            <input type="text" className="form-input" id="firstName" value={selectedUser.firstName} onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })} placeholder="Ingrese el nombre" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Apellido</label>
                            <input type="text" className="form-input" id="lastName" value={selectedUser.lastName} onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })} placeholder="Ingrese el apellido" />
                        </div>
                        <div>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" className="form-input" id="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} placeholder="Ingrese el email" />
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" className="form-input" id="password" value={selectedUser.password} onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })} placeholder="Ingrese la contraseña" />
                        </div>
                        <button type="submit" className="form-button">Enviar</button>
                    </form>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleUpdateClick(user)} className="form-button">Actualizar</button>
                                    <button onClick={() => handleDeleteClick(user.id)} className="form-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutFour>
    );
};

export default Administration;

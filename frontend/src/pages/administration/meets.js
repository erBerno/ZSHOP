import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";

const Administration = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8090/api/collections/meetings/records');
                setMeetings(response.data.items);
            } catch (error) {
                console.error("Error al cargar reuniones:", error);
            }
        };

        fetchMeetings();
    }, []);

    const handleDelete = async (meetingId) => {
        try {
            await axios.delete(`http://127.0.0.1:8090/api/collections/meetings/records/${meetingId}`);
            setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
        } catch (error) {
            console.error("Error al eliminar reunión:", error);
        }
    };

    return (
        <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
            <Breadcrumb title="ADMINISTRACIÓN">
                <BreadcrumbItem name="ADMINISTRACIÓN" />
                <BreadcrumbItem name="GESTIÓN DE CITAS" current />
            </Breadcrumb>

            <style>
                {`
                        .meetings-report {
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
                <div className="meetings-report">


                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Servicio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetings.map((meeting) => (
                                <tr key={meeting.id}>
                                    <td>{meeting.name}</td>
                                    <td>{meeting.phone}</td>
                                    <td>{meeting.service}</td>
                                    <td>
                                        <button onClick={() => handleDelete(meeting.id)}>Eliminar</button>
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

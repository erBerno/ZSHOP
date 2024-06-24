import React, { useState } from 'react';
import axios from 'axios';
import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLogin = async () => {
    try {
      // Llama a tu API para obtener los usuarios
      const usersApiUrl = "http://127.0.0.1:8090/api/collections/users/records";
      const response = await axios.get(usersApiUrl);
      const users = response.data.items;

      // Busca el usuario por nombre de usuario
      const user = users.find(user => user.email === username);

      if (!user) {
        setErrorMessage('El nombre de usuario no existe.');
        return;
      }

      // Verifica si la contraseña es correcta
      if (user.password !== password) {
        setErrorMessage('La contraseña es incorrecta.');
        return;
      }

      // Redirige al usuario a la página de administración si las credenciales son correctas
      router.push('/administration/admin');
    } catch (error) {
      setErrorMessage('Hubo un problema al iniciar sesión. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <LayoutFour title="ADMINISTRACIÓN" className="-style-1">
      <Breadcrumb title="ADMINISTRACIÓN">
        <BreadcrumbItem name="INICIO" />
        <BreadcrumbItem name="ADMINISTRACIÓN" current />
      </Breadcrumb>
      <style>
        {`
          @import url(https://fonts.googleapis.com/css?family=Roboto:300);

          .login-page {
            width: 360px;
            margin: auto;
            padding-bottom: 70px;
          }
          
          .form input {
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
          
          .form button {
            font-family: "Roboto", sans-serif;
            text-transform: uppercase;
            outline: 0;
            background: #111;
            width: 100%;
            border: 0;
            padding: 15px;
            color: #FFFFFF;
            font-size: 14px;
            -webkit-transition: all 0.3 ease;
            transition: all 0.3 ease;
            cursor: pointer;
          }
          
          .form .message {
            margin: 15px 0 0;
            color: #b3b3b3;
            font-size: 12px;
          }

          span {
            color: #111;
          }

          .message {
            text-align: center;
            color: #111;
          }
          
          .form .register-form {
            display: none;
          }
          
          .bold-text {
            font-weight: bold;
          }

          .error {
            color: black;
            font-size: 12px;
            margin-top: 10px;
            text-align: center;
          }

          .noRegister {
            color: #686868;
          }
        `}
      </style>

      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input
              type="text"
              placeholder="CORREO ELECTRÓNICO"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="btn -black" onClick={handleLogin}>INICIAR SESIÓN</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <p className="message">
              <span className="noRegister">¿NO REGISTRADO?</span>
              <span></span> 
              <span onClick={toggleForm}> CREAR UNA CUENTA</span></p>
          </form>
        </div>
      </div>
    </LayoutFour>
  );
};

export default LoginPage;

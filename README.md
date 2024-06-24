
---

# ZSHOP

## 📘 MANUAL TÉCNICO DE IMPLEMENTACIÓN Y DESPLIEGUE - ZSHOP

### 1. INTRODUCCIÓN:

CCosmetic es una aplicación web moderna diseñada para proporcionar una experiencia de usuario interactiva y eficiente en la gestión de cosméticos. Este proyecto utiliza tecnologías de punta como React para el frontend y Pocketbase para el backend, optimizadas para un rendimiento superior.

### 2. DESCRIPCIÓN DEL PROYECTO:

El proyecto CCosmetic permite a los usuarios explorar, administrar y comprar productos cosméticos en línea. Combina una interfaz de usuario intuitiva con una robusta gestión de datos en el backend.

## 3. ROLES / INTEGRANTES:

- **DESARROLLADOR** - **DANIEL ZEBALLOS OBANDO**
- **DESARROLLADOR** - **BERNARDO GARCIA MOREIRA**
- **LIDER** - **JAIDER ALEJANDRO PINTO RIBERA****
### 4. ARQUITECTURA DEL SOFTWARE:

El software está dividido en dos partes principales: el frontend en React y el backend con Pocketbase. React maneja la interfaz de usuario, mientras que Pocketbase gestiona la base de datos y la lógica del servidor. Se utilizan patrones MVC para estructurar el código y las APIs REST para la comunicación entre frontend y backend.

### 5. REQUISITOS DEL SISTEMA:

#### CLIENTE:

- **REQUERIMIENTOS DE HARDWARE (MÍNIMO):** CPU de 2 GHz, 4 GB de RAM.
- **REQUERIMIENTOS DE SOFTWARE:** Navegador web actualizado (Chrome, Firefox, Safari).

#### SERVIDOR/HOSTING/BD:

- **REQUERIMIENTOS DE HARDWARE:** CPU de 4 núcleos, 8 GB de RAM, 40 GB de espacio en disco.
- **REQUERIMIENTOS DE SOFTWARE:** Docker, Docker Compose.

### 6. 📚 GUÍA DE INSTALACIÓN Y CONFIGURACIÓN

#### 🚀 CLONAR EL REPOSITORIO DE GITHUB

Para comenzar, clona el repositorio utilizando el siguiente comando:

```shell
git clone https://github.com/erBerno/ZSHOP.git
```

#### 🐳 INICIAR DOCKER-COMPOSE

Una vez clonado el repositorio, navega a la carpeta del proyecto e inicia Docker-Compose:

```shell
cd CCosmetic-master && docker-compose up --build
```

#### ⏹️ DETENER DOCKER-COMPOSE

Para detener los servicios en ejecución sin eliminar los contenedores:

```shell
docker-compose stop
```

#### 🧹 ELIMINAR Y DETENER DOCKER-COMPOSE

Si necesitas detener y eliminar los contenedores, junto con las redes y volúmenes asociados:

```shell
docker-compose down
```

#### 🖥️ USO DEL APLICATIVO

Sigue estos pasos para utilizar la aplicación después de haber iniciado los contenedores:

1. **ACCESO A LOS SERVICIOS:**
    
    Los contenedores estarán disponibles en los puertos 8090 y 3000.
    
2. **RUTAS DEL BACKEND:**
    
    ├─ REST API: [http://0.0.0.0:8090/api/](http://0.0.0.0:8090/api/)
    
    └─ Admin UI: [http://0.0.0.0:8090/_/](http://0.0.0.0:8090/_/)
    
3. **RUTAS DEL FRONTEND:**
    
    ├─ FRONTEND: [http://0.0.0.0:3000/](http://0.0.0.0:3000/)
    
4. **CONFIGURACIÓN INICIAL:**
    
    Se requerirá crear una cuenta de administración con un correo electrónico y una contraseña.
    
5. **RESTAURAR LA BASE DE DATOS:**
    
    Tienes dos opciones para restaurar la base de datos:
    
    - Restaurar las Migraciones.
    - Restaurar el Backup.

### 🛠️ PROCEDIMIENTO DE HOSTEADO / HOSTING (CONFIGURACIÓN)

Instrucciones detalladas para la puesta en marcha en hosting, incluyendo:

- **SITIO WEB.**
- **B.D.**
- **API / SERVICIOS WEB.**

1. Conexión por SSH al VPS.
2. Realizar los pasos de configuración previamente mencionados.
### 7. GIT:

- **VERSIÓN FINAL ENTREGADA DEL PROYECTO:** `v1.0.0`
- **ENTREGA DE COMPILADOS EJECUTABLES:** Disponibles en la sección de releases de GitHub.

### 8. PERSONALIZACIÓN Y CONFIGURACIÓN:

Configuración de temas, ajustes de interfaz y configuraciones de usuario a través de un panel de administración en el frontend.

### 9. 🛡️ SEGURIDAD:

- Implementación de autenticación JWT.
- Cifrado de datos sensibles.
- Políticas de CORS para proteger contra ataques comunes.
- Gestión de permisos para la API.
- Realizar ocasionalmente una actualización a los paquetes.

### 10. DEPURACIÓN Y SOLUCIÓN DE PROBLEMAS:

Los problemas más comunes que suelen ocurrir son ocasionados por temas de permisos en la gestión de colecciones, bastaría con ajustar los permisos y los tokens, 

### 11. GLOSARIO DE TÉRMINOS:

- **REACT:** Biblioteca de JavaScript para construir interfaces de usuario.
- **POCKETBASE:** Backend ligero y flexible.
- **DOCKER:** Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
- **JWT:** Token de acceso para autenticación y autorización.

### 12. REFERENCIAS Y RECURSOS ADICIONALES:

- **DOCUMENTACIÓN OFICIAL DE REACT** ([https://reactjs.org/](https://reactjs.org/))
- **GUÍA DE POCKETBASE** ([https://pocketbase.io/docs/](https://pocketbase.io/docs/))
- **TUTORIALES DE DOCKER** ([https://docs.docker.com/get-started/](https://docs.docker.com/get-started/))

### 13. HERRAMIENTAS DE IMPLEMENTACIÓN:

- **LENGUAJES DE PROGRAMACIÓN:** JavaScript (React), Go (Pocketbase).
- **FRAMEWORKS:** React para frontend, Pocketbase para backend.
- **APIs DE TERCEROS:** APIs para procesamiento de pagos, análisis de datos, etc.

---

Recuerda que puedes modificar y ajustar los datos según tus necesidades una vez completada la instalación. ¡Esperamos que disfrutes utilizando CCosmetic! 🌟

### Descripción general

Este proyecto consiste en una aplicación web para la venta de pasajes, desarrollada con tecnologías JavaScript, React y Node.js, e integrada con Docker para facilitar su despliegue.

La aplicación está estructurada en dos partes principales:

- Frontend (interfaz de usuario): desarrollado con React.

- Backend (API y base de datos): desarrollado con Node.js y Express, conectado a una base de datos extension Database utilizando PosgreSQL.

- Además, incluye archivos de configuración que permiten ejecutar todo el sistema con un solo comando mediante Docker Compose.

- API ficticio: Apidog 


<img width="461" height="593" alt="Captura de pantalla 2025-10-31 092958" src="https://github.com/user-attachments/assets/97a1b789-a399-43c3-9a84-4c056c657e1a" />


### Herramientas que se utilizo en el backend 


Name: Tourest

Host: localhost

Username: postgres

Database: tourest

Port: 5433

Password: (secreto)


### Herramienta que gestiona y guarda

Git: Sistema de control de versiones
- Inicializar nuevo repositorio : 
> git init
- Clonar un repositorio remoto :
> git clone <dir_repositorio>
- Comprueba el estado actual de los archivos:
> git status
- Añadir cambios a INDEX
> git add <nombre_archivo>
- Agregar todos los cambios a INDEX
> git add . 
- hacer el commit :
> git commit -m "Avance del proyecto"
- Conectar el repositorio local con remoto
> git remote add origin master
- Ver el historial de commits
> git log
- Ver diferencias entre versiones
>  git diff
- Actualizar el repositorio local
> git pull
- quieres subir los cambios a GitHub:
> git push origin main (git push origin master)
- Verifica el repositorio remoto actual
> git remote -v 
- Quitar o eliminar un archivo
> git rm <nombre_archivo>
- Ver las ramas existentes
> git branch
- Crear nueva rama
> git branch <nombre-rama>
- Cambia a otra rama
> git checkout <nombre-rama>
- Subir rama al repositorio remoto
> git push origin <branch>
- Fusionar cambios de otra rama
> git merge <branch>
- Ver cambios entre dos ramas
> git diff <source_branch> <target-branch>
+ master(Còdigo listo para producciòn)
+ develop( Desarrollo en curso)
+ feature(Nuevas caracteristicas)
+ release (Preparacion de versiones)
+ hotfix(Correcciones urgentes)
Sirve para instalar la librería gh-pages del proyecto Node.js o React, la cual permite publicar tu aplicación web directamente en GitHub Pages
npm install gh-pages

En la terminal, asegúrate de estar en la carpeta del proyecto:

cd C:\Users\Usuario\Desktop\Grupo08_Aplicacion_web_venta_pasajes


Ejecuta:

npm run deploy

https://kristel2002.github.io/Grupo08_Aplicacion_web_venta_pasajes/

Para enviar y recibir, actualizar : formato json que es de postman pero en este caso se va utilizar una extension
GET, POST, PUT y DELETE

GET: Obtener data

POST: Enviar un nuevo recurso

PUT: Actualizar toda la información de ese recurso en su totalidad

DELETE: Eliminar un recurso existente

PATCH: Actualización parcial de recurso

La respuesta que va emitir es lo siguiente:

 1xx: Respuestas informativas

 2xx: Peticiones correctas

 3xx: Redirecciones de ubicación

 4xx: Errores del cliente

 5xx: Errores del servicio


### Crear Web Service en Render

Ve a Render haces click en nuevo luego Web Service.
Conecta tu repositorio de GitHub y selecciona la rama main.

Configura:
Environment: Node

Build Command: npm install (ya hiciste npm run build localmente)

Start Command: node server.js

Environment Variables: agrega las de tu BD:

DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
DATABASE_URL (si usarás PostgreSQL de Render)


Pulsa Create Web Service.

Render hará:

Clonación del repo

Instalación de dependencias

Inicio del servidor

Instala react-scripts si falta

- Si quieres evitar problemas de rutas y de react-scripts en Windows, puedes hacer:

> npx react-scripts build

- Esto asegura que el comando funcione

> npm run build 

- Si react-scripts no está instalado, hazlo explícitamente:

> npm install react-scripts --save

Para corregirlas automáticamente vulnerabilidades:

> npm audit fix

Para forzar la actualización de dependencias aunque pueda romper algo:

> npm audit fix --force

Si aún falla, reinstala react-scripts directamente
> npm install react-scripts@latest --save


# Challenge Polyfen

Este es un proyecto para manejar usuarios desde una base de datos MongoDB, con validación de parámetros, paginación y ordenamiento de resultados. Permite importar datos desde un archivo CSV y configurar la base de datos de forma sencilla.

## Requisitos previos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas:

- **Node.js**: [Instalar Node.js](https://nodejs.org/)

## Instalación y ejecución

1. Clona el repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Ejecuta el servidor:

    ```bash
    npm start
    ```

## Endpoints

/test --> Verificación del funcionamiento del servidor

/prospects --> Información de los usuarios

## Importación de datos desde archivo CSV

```bash
node importData.js
```

## Variables de entorno

El archivo `.env` debe contener las siguientes variables de entorno:

```env
MONGO_URI="mongodb+srv://<usuario>:<contraseña>@cluster0.5nzhn.mongodb.net/polyfendb?retryWrites=true&w=majority"
BEARER_TOKEN="DKgg045969304wwxx!tri562dwxpppplrcs246"
SESSION_KEY="DRAKLAVER2356XX!**Z*"
```

## Puntos para mejora futura:

- Mayor validaciones
- Seguridad y control con apiKey en peticiones
- Unidades de testeo



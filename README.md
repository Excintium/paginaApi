# Frontend de API de Productos (React + Vite)

Esta es una interfaz de usuario (UI) construida con React (Vite) y React Router. Sirve como frontend para el proyecto `api-productos` (el backend de NestJS).

La aplicación permite a los usuarios ver, crear, editar y eliminar productos de la base de datos.

## Características

* **CRUD Completo:** Implementa todas las operaciones (Crear, Leer, Actualizar, Eliminar) para los productos.
* **Conexión a la API:** Utiliza `axios` para comunicarse con la API de NestJS en `http://localhost:3000/api/v1`.
* **Paginación:** La lista de productos está paginada (carga los productos en lotes) para un mejor rendimiento.
* **Gestión de Estado:** Usa `React.Context` (`useProductosContext`) para manejar el estado de los productos de forma global en la app.
* **Estilos con TailwindCSS:** Configurado con TailwindCSS para un diseño rápido.

## Requisitos Previos

1.  **Node.js:** Asegúrate de tener Node.js (v18 o superior) instalado.
2.  **Backend Corriendo:** Esta aplicación **no funcionará** si el backend (`api-productos`) no está ejecutándose.

## 1. Instalación

Instala las dependencias del proyecto:

```bash
npm install
2. Ejecución (Modo Desarrollo)
¡Importante! Antes de iniciar el frontend, asegúrate de que tu API de NestJS (api-productos) ya esté corriendo en http://localhost:3000.

Una vez que el backend esté listo, inicia el servidor de desarrollo de Vite:

Bash

npm run dev
La aplicación estará disponible en: http://localhost:5173
// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Ruta principal (Home) que ya tenías
    index("routes/home.tsx"),

    // --- Rutas del CRUD de Productos ---

    // 1. Página de Lista (/productos)
    // Muestra el componente productos-lista.tsx cuando la URL es /productos
    route("productos", "routes/productos-lista.tsx"),

    // 2. Página de Creación (/productos/nueva)
    // Muestra el componente productos-crear.tsx cuando la URL es /productos/nueva
    route("productos/nueva", "routes/productos-crear.tsx"),

    // 3. Página de Edición (/productos/:id/editar)
    // Muestra el componente productos-editar.tsx
    // Nota el :id, que es un parámetro dinámico que se pasará al componente
    route("productos/:id/editar", "routes/productos-editar.tsx"),

] satisfies RouteConfig;